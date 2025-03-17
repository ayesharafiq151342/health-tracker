import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { TopHeader } from "../components/topheader";
import { SidebarComponent } from "../components/sidebar";
import toast, { Toaster } from "react-hot-toast";

export default function MealTracker() {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
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
    // Reset date after submission
    });
    // ✅ Date added


  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        setError("Not logged in. Please login again.");
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
      setError("Failed to load meals. Please try again." +error);
      toast.error("Failed to load meals.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const token = Cookies.get("token");
      if (!token) {
        setError("Authentication token missing. Please log in again.");
        toast.error("Authentication token missing. Please log in again.");
        return;
      }

      if (editId) {
        await axios.put(`http://localhost:4000/api/users/edit-meal/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMeals((prevMeals) =>
          prevMeals.map((meal) => (meal._id === editId ? { ...meal, ...formData } : meal))
        );

        setEditId(null);
        toast.success("Meal updated successfully!");
      } else {
        const res = await axios.post("http://localhost:4000/api/users/create-meal", formData, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        if (res.data.success && res.data.meal) {
          setMeals((prevMeals) => [...prevMeals, res.data.meal]);
          toast.success("Meal added successfully!");
        }
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
   // Reset date after submission

      });
    } catch (error) {
      toast.error("Failed to add/update meal. Try again."+error);
    }
    fetchMeals(toast.success("added successfully"));

  };

  const handleEdit = (meal) => {
    setFormData({
      category: meal.category,
      calories: meal.calories.toString(),
      carbs: meal.carbs.toString(),
      fats: meal.fats.toString(),
      protiens: meal.protiens.toString(),
      sodium: meal.sodium.toString(),
      sugar: meal.sugar.toString(),
      fiber: meal.fiber.toString(),
     // ✅ Extract YYYY-MM-DD format
    });
    setEditId(meal._id);
    toast.success("Edit Data");
  };
  

  const handleDelete = async (mealId) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        toast.error("Authentication token missing. Please log in again.");
        return;
      }

      await axios.delete(`http://localhost:4000/api/users/delete-meal/${mealId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setMeals((prevMeals) => prevMeals.filter((meal) => meal._id !== mealId));
      toast.success("Meal deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete meal. Try again."+error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white">
      <Toaster position="top-right" reverseOrder={false} />
      <SidebarComponent isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        <TopHeader toggleSidebar={() => {}} />
        <div className="p-6 m-8 lg:w-[1400px] border mt-30 mx-auto bg-white shadow-md rounded-lg text-black w-full">
          <h1 className="text-2xl font-bold mb-4 text-center">Meal Tracker</h1>
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* ✅ Meal Form */}
          <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-2 gap-4">
            {Object.keys(formData).map((key) => (
              <input
                key={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                className="border p-2 rounded shadow-sm focus:ring-2 focus:ring-gray-500 w-full"
                required
              />
            
           
            )
          ) 
            } <input
            type="date"  // ✅ Date picker enabled
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 rounded shadow-sm focus:ring-2 focus:ring-gray-500 w-full"
            required
        />
            
   

            <button type="submit" className="col-span-2 bg-gray-800 text-white p-2 rounded shadow-md hover:bg-gray-500">
              {editId ? "Update Meal" : "Add Meal"}
            </button>
          </form>

          {/* ✅ Meal Table */}
          {meals.length > 0 ? (
            <div className="overflow-x-auto w-full">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">Category</th>
                    <th className="p-2 border">Calories</th>
                    <th className="p-2 border">Carbs</th>
                    <th className="p-2 border">Fats</th>
                    <th className="p-2 border">Protiens</th>
                    <th className="p-2 border">Sodium</th>
                    <th className="p-2 border">Sugar</th>
                    <th className="p-2 border">Fiber</th>
                    <th className="p-2 border">Actions</th>
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

                      <td className="p-2 border flex justify-center gap-2">
                        <button onClick={() => handleEdit(meal)} className="bg-yellow-500 px-2 py-1 rounded">Edit</button>
                        <button onClick={() => handleDelete(meal._id)} className="bg-red-500 px-2 py-1 rounded">Delete</button>
                      </td>
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
