# 🏠 House Price Prediction Web Application

A full-stack Machine Learning web application that predicts California house prices using a trained regression model.

---

## 📸 Preview

<img width="100%" src="frontend/src/assets/hero.png">

---

## 🚀 Features

- Modern React frontend
- FastAPI backend
- Machine Learning price prediction
- Responsive dark UI
- REST API integration
- Real-time prediction results
- Clean and professional interface

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios

### Backend
- FastAPI
- Python
- Scikit-learn
- Pandas
- NumPy
- Uvicorn

---

## 📁 Project Structure

```
house-price-prediction/
│
├── backend/
│   ├── main.py
│   ├── train.py
│   └── explore.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## ⚙ Installation

### Clone Repository

```bash
git clone https://github.com/aJ23101/house-price-prediction.git
```

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on

```
http://127.0.0.1:8000
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

## API Endpoint

### Predict Price

```
POST /predict
```

Example JSON

```json
{
  "MedInc": 8.3,
  "HouseAge": 24,
  "AveRooms": 10,
  "AveBedrms": 1,
  "Population": 900,
  "AveOccup": 3,
  "Latitude": 37.5,
  "Longitude": -122.3
}
```

---

## Future Improvements

- Docker Deployment
- Authentication
- Prediction History
- Interactive Charts
- Model Retraining
- Cloud Deployment

---

## 👩‍💻 Author

**Aditi Joshi**

GitHub:
https://github.com/aJ23101