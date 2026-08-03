import { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    MedInc: "",
    HouseAge: "",
    AveRooms: "",
    AveBedrms: "",
    Population: "",
    AveOccup: "",
    Latitude: "",
    Longitude: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value),
    });
  };

  const predictPrice = async () => {
    try {
     const API_URL = import.meta.env.VITE_API_URL;

     const response = await axios.post(
     `${API_URL}/predict`,
     formData
    );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Prediction failed!");
    }
  };

  return (
  <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-gray-900 flex items-center justify-center p-8">

    <div className="w-full max-w-2xl bg-slate-800 border border-slate-700 rounded-3xl shadow-2xl p-10">

      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-white">
          🏠 House Price Prediction
        </h1>

        <p className="text-slate-400 mt-3 text-lg">
          Predict California House Prices using Machine Learning
        </p>
      </div>

      {/* Median Income */}
      <div className="mb-5">
        <label className="block text-slate-200 font-semibold mb-2">
          Median Income
        </label>

        <input
          type="number"
          name="MedInc"
          placeholder="Enter Median Income"
          onChange={handleChange}
          className="w-full bg-slate-900 text-white placeholder:text-slate-500 border border-slate-700 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* House Age */}
      <div className="mb-5">
        <label className="block text-slate-200 font-semibold mb-2">
          House Age
        </label>

        <input
          type="number"
          name="HouseAge"
          placeholder="Enter House Age"
          onChange={handleChange}
          className="w-full bg-slate-900 text-white placeholder:text-slate-500 border border-slate-700 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Average Rooms */}
      <div className="mb-5">
        <label className="block text-slate-200 font-semibold mb-2">
          Average Rooms
        </label>

        <input
          type="number"
          name="AveRooms"
          placeholder="Enter Average Rooms"
          onChange={handleChange}
          className="w-full bg-slate-900 text-white placeholder:text-slate-500 border border-slate-700 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Average Bedrooms */}
      <div className="mb-5">
        <label className="block text-slate-200 font-semibold mb-2">
          Average Bedrooms
        </label>

        <input
          type="number"
          name="AveBedrms"
          placeholder="Enter Average Bedrooms"
          onChange={handleChange}
          className="w-full bg-slate-900 text-white placeholder:text-slate-500 border border-slate-700 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Population */}
      <div className="mb-5">
        <label className="block text-slate-200 font-semibold mb-2">
          Population
        </label>

        <input
          type="number"
          name="Population"
          placeholder="Enter Population"
          onChange={handleChange}
          className="w-full bg-slate-900 text-white placeholder:text-slate-500 border border-slate-700 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Average Occupancy */}
      <div className="mb-5">
        <label className="block text-slate-200 font-semibold mb-2">
          Average Occupancy
        </label>

        <input
          type="number"
          name="AveOccup"
          placeholder="Enter Average Occupancy"
          onChange={handleChange}
          className="w-full bg-slate-900 text-white placeholder:text-slate-500 border border-slate-700 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Latitude */}
      <div className="mb-5">
        <label className="block text-slate-200 font-semibold mb-2">
          Latitude
        </label>

        <input
          type="number"
          name="Latitude"
          placeholder="32 - 42"
          min="32"
          max="42"
          step="0.01"
          onChange={handleChange}
          className="w-full bg-slate-900 text-white placeholder:text-slate-500 border border-slate-700 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Longitude */}
      <div className="mb-8">
        <label className="block text-slate-200 font-semibold mb-2">
          Longitude
        </label>

        <input
          type="number"
          name="Longitude"
          placeholder="-125 to -114"
          min="-125"
          max="-114"
          step="0.01"
          onChange={handleChange}
          className="w-full bg-slate-900 text-white placeholder:text-slate-500 border border-slate-700 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Button */}
      <button
        onClick={predictPrice}
        className="w-full py-4 rounded-xl bg-cyan-600 hover:bg-cyan-400 hover:scale-[1.02] active:scale-95 cursor-pointer text-white font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
      >
        🚀 Predict House Price
      </button>

      {/* Result */}
      {result && (
        <div className="mt-10 rounded-2xl bg-slate-900 border border-cyan-700 p-8 shadow-xl">

          <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">
            📊 Prediction Result
          </h2>

          <div className="space-y-5">

            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
              <p className="text-slate-400 text-sm">
                Predicted Price
              </p>

              <p className="text-4xl font-bold text-cyan-400 mt-1">
                {result.predicted_price}
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
              <p className="text-slate-400 text-sm">
                Price Format
              </p>

              <p className="text-xl font-semibold text-white mt-1">
                {result.predicted_price_short}
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
              <p className="text-slate-400 text-sm">
                Confidence Range
              </p>

              <p className="text-xl font-semibold text-green-400 mt-1">
                {result.confidence_range}
              </p>
            </div>

          </div>
        </div>
      )}

    </div>

  </div>
);
}

export default App;