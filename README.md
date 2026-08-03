# 🏠 House Price Prediction Web Application

A full-stack Machine Learning web application that predicts California house prices using a trained regression model. Built using **React**, **FastAPI**, and **Scikit-learn**.

---

# 🚀 Features

- Modern dark-themed user interface
- Real-time house price prediction
- FastAPI REST API backend
- React + Vite frontend
- Machine Learning regression model
- Responsive design
- Clean and intuitive UI

---

# 🛠 Tech Stack

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

# 📂 Project Structure

```
house-price-prediction/
│
├── backend/
│   ├── main.py
│   ├── train.py
│   ├── explore.py
│   └── test_houses.csv
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

# ⚙ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/aJ23101/house-price-prediction.git
cd house-price-prediction
```

---

## 2. Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend will run at:

```
http://127.0.0.1:8000
```

---

## 3. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

# 🔌 API Endpoint

### Predict House Price

```
POST /predict
```

Example Request

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

# 📈 Future Improvements

- Deploy model on cloud
- Docker support
- Authentication
- Prediction history
- Interactive analytics dashboard
- Model retraining pipeline

---

# 👩‍💻 Author

**Aditi Joshi**

GitHub: https://github.com/aJ23101

