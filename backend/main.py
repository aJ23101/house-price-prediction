import io
import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("house_model.joblib")
features = joblib.load("house_features.joblib")

#input schema
from pydantic import BaseModel, Field


class input_data:
    """Convenience wrapper to build a pandas-friendly prediction input from the request payload."""

    def __init__(self, house: "HouseFeatures"):
        self.house = house

    def to_dataframe(self) -> pd.DataFrame:
        return pd.DataFrame([{
            "MedInc": self.house.MedInc,
            "HouseAge": self.house.HouseAge,
            "AveRooms": self.house.AveRooms,
            "AveBedrms": self.house.AveBedrms,
            "Population": self.house.Population,
            "AveOccup": self.house.AveOccup,
            "Latitude": self.house.Latitude,
            "Longitude": self.house.Longitude,
        }])


# Input Schema
class HouseFeatures(BaseModel):
    MedInc: float = Field(
        gt=0,
        description="Median income of households"
    )

    HouseAge: float = Field(
        ge=0,
        description="Average age of houses"
    )

    AveRooms: float = Field(
        gt=0,
        description="Average number of rooms per household"
    )

    AveBedrms: float = Field(
        gt=0,
        description="Average number of bedrooms per household"
    )

    Population: float = Field(
        gt=0,
        description="Total population in the block"
    )

    AveOccup: float = Field(
        gt=0,
        description="Average number of occupants per household"
    )

    Latitude: float = Field(
        ge=32,
        le=42,
        description="Latitude"
    )

    Longitude: float = Field(
        ge=-125,
        le=-114,
        description="Longitude"
    )
    
#home
@app.get("/")
def home():
    return {
        "message": "California house prediction api",
        "status": "running",
        "endpoint": "send POST request to /predict"
    }

@app.get("/health")
def health():
    return {
        "status": "running",
        "model": "RandomForestRegressor",
        "features": features,
        "avg_error": "$39,000"
    }
    
#prediction
@app.post("/predict")
def predict(house: HouseFeatures):
    try:
        request_input = input_data(house)
        input_frame = request_input.to_dataframe()

        predicted = model.predict(input_frame)[0]
        price_usd = predicted * 100000

        return {
            "predicted_price": f"${price_usd:,.0f}",
            "predicted_price_short": f"${predicted:.2f} hundred thousands",
            "confidence_range": f"${price_usd - 39000:,.0f} to ${price_usd + 39000:,.0f}"
        }
    except Exception as e:
          raise HTTPException(
              status_code=500,
              detail=f"Prediction failed: {str(e)}"
         )
        
@app.post("/predict-file")
async def predict_file(file: UploadFile = File(...)):

    if not file.filename.endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Invalid file format. Please upload a CSV file only."
        )
        
    contents = await file.read()
    
    df = pd.read_csv(io.BytesIO(contents))

    required_columns = [
        "MedInc", "HouseAge", "AveRooms", "AveBedrms",
        "Population", "AveOccup", "Latitude", "Longitude"
    ]

    missing_columns = [
        col for col in required_columns
        if col not in df.columns
    ]

    if missing_columns:
        raise HTTPException(
            status_code=400,
            detail=f"These columns are missing from your file: {missing_columns}"
        )
    
    if len(df) == 0:
        raise HTTPException(
            status_code=400,
            detail="The uploaded file has no data rows."
        )

    try:
        predictions = model.predict(df[required_columns])
        df["predicted_price_usd"] = predictions * 100000
        df["predicted_price_usd"] = df["predicted_price_usd"].map(
            lambda x: f"${x:,.0f}"
        )

        output = df.to_csv(index=False)
        return StreamingResponse(
            io.StringIO(output),
            media_type="text/csv",
            headers={
                "Content-Disposition": "attachment; filename=predictions.csv"
            }
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )
            
        