import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { TopHeader } from "../components/topheader";
import { SidebarComponent } from "../components/sidebar";
import toast, { Toaster } from "react-hot-toast";

export default function MealTracker() {
  const [meals, setMeals] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const [formData, setFormData] = useState({
    category: "",
    calories: "",
    carbs: "",
    fats: "",
    protiens: "",
    sodium: "",
    sugar: "",
    fiber: "",
    date: "",
  });

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        toast.error("Not logged in. Please login again.");
        return;
      }

      const res = await axios.get("http://localhost:4000/api/users/meals", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (res.data.success && Array.isArray(res.data.meals)) {
        setMeals(res.data.meals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.error("Fetch Meals Error:", error);
      toast.error(`Failed to load meals: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("token");
      if (!token) {
        toast.error("Authentication token missing. Please log in again.");
        return;
      }

      const res = await axios.post("http://localhost:4000/api/users/create-meal", formData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (res.data.success && res.data.meal) {
        setMeals((prevMeals) => [...prevMeals, res.data.meal]);
        toast.success("Meal added successfully!");
      }

      setFormData({
        category: "",
        calories: "",
        carbs: "",
        fats: "",
        protiens: "",
        sodium: "",
        sugar: "",
        fiber: "",
        date: "",
      });
    } catch (error) {
      console.error("Meal Submission Error:", error);
      toast.error(`Failed to add meal: ${error.response?.data?.message || error.message}`);
    }

    fetchMeals();
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white">
      <Toaster position="top-right" reverseOrder={false} />
      <SidebarComponent isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        <TopHeader toggleSidebar={toggleSidebar} />
        <div className="p-6 m-8 lg:w-[1400px] border mt-10 mx-auto bg-white shadow-md rounded-lg text-black w-full">
          <h1 className="text-2xl font-bold mb-4 text-center">Meal Tracker</h1>

          <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-2 gap-4">
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="border p-2 rounded shadow-sm w-full"
              required
            />
            <input
              type="number"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              placeholder="Calories"
              className="border p-2 rounded shadow-sm w-full"
              required
            />
            <input
              type="number"
              name="carbs"
              value={formData.carbs}
              onChange={handleChange}
              placeholder="Carbs"
              className="border p-2 rounded shadow-sm w-full"
            />
            <input
              type="number"
              name="fats"
              value={formData.fats}
              onChange={handleChange}
              placeholder="Fats"
              className="border p-2 rounded shadow-sm w-full"
            />
            <input
              type="number"
              name="protiens"
              value={formData.protiens}
              onChange={handleChange}
              placeholder="Proteins"
              className="border p-2 rounded shadow-sm w-full"
            />
            <input
              type="number"
              name="sodium"
              value={formData.sodium}
              onChange={handleChange}
              placeholder="Sodium"
              className="border p-2 rounded shadow-sm w-full"
            />
            <input
              type="number"
              name="sugar"
              value={formData.sugar}
              onChange={handleChange}
              placeholder="Sugar"
              className="border p-2 rounded shadow-sm w-full"
            />
            <input
              type="number"
              name="fiber"
              value={formData.fiber}
              onChange={handleChange}
              placeholder="Fiber"
              className="border p-2 rounded shadow-sm w-full"
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border p-2 rounded shadow-sm w-full"
              required
            />

            <button type="submit" className="col-span-2 bg-gray-800 text-white p-2 rounded shadow-md hover:bg-gray-500">
              Add Meal
            </button>
          </form>

          {meals.length > 0 ? (
            <div className="overflow-x-auto w-full">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-300">
                    <th className="p-2 border">Category</th>
                    <th className="p-2 border">Calories</th>
                    <th className="p-2 border">Carbs</th>
                    <th className="p-2 border">Fats</th>
                    <th className="p-2 border">Proteins</th>
                    <th className="p-2 border">Sodium</th>
                    <th className="p-2 border">Sugar</th>
                    <th className="p-2 border">Fiber</th>
                    <th className="p-2 border">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {meals.map((meal) => (
                    <tr key={meal._id} className="border">
                      <td className="p-2 border">{meal.category}</td>
                      <td className="p-2 border">{meal.calories}</td>
                      <td className="p-2 border">{meal.carbs}</td>
                      <td className="p-2 border">{meal.fats}</td>
                      <td className="p-2 border">{meal.protiens}</td>
                      <td className="p-2 border">{meal.sodium}</td>
                      <td className="p-2 border">{meal.sugar}</td>
                      <td className="p-2 border">{meal.fiber}</td>
                      <td className="p-2 border">{meal.date ? new Date(meal.date).toLocaleDateString() : "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center">No meals found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
