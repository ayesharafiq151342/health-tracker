import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { TopHeader } from "../components/topheader";
import { SidebarComponent } from "../components/sidebar";
import toast, { Toaster } from "react-hot-toast";

export default function ExerciseTracker() {
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    fetchExercises();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const fetchExercises = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        setError("Not logged in. Please login again.");
        toast.error("Not logged in. Please login again.");
        return;
      }
      const res = await axios.get("https://health-tracker-backend-with-f7xnxlpui.vercel.app/api/users/exercises", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setExercises(res.data.success ? res.data.exercises : []);
    } catch (error) {
      setError("Failed to load exercises. Please try again." + error);
      toast.error("Failed to load exercises.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const token = Cookies.get("token");
    if (!token) {
      toast.error("Authentication token missing. Please log in again.");
      return;
    }
    try {
      const res = await axios.post("https://health-tracker-backend-with-f7xnxlpui.vercel.app/api/users/create-exercise", formData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      if (res.data.success) {
        setExercises((prev) => [...prev, res.data.exercise]);
        toast.success("Exercise added successfully!");
        setFormData({ name: "", duration: "", category: "", date: "" });
      }
    } catch (error) {
      toast.error("Failed to add exercise. Try again." + error);
    }
  };
  const handleDelete = async (id) => {
  
    
    const token = Cookies.get("token");
    if (!token) {
      toast.error("Authentication token missing. Please log in again.");
      return;
    }
    try {
      
      const res = await axios.delete(`https://health-tracker-backend-with-f7xnxlpui.vercel.app/api/users/delete-exercise/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      if (res.data.success) {
        // setExercises((prev) => [...prev, res.data.exercise]);
        toast.success("Exercise Deleted successfully!");
        setFormData({ name: "", duration: "", category: "", date: "" });
      }
    } catch (error) {
      toast.error("Failed to delete exercise. Try again." + error);
    }
    
  };
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white">
     
      <SidebarComponent isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <TopHeader toggleSidebar={toggleSidebar} />
        <div className="p-6 m-8 lg:w-[1400px] border mt-10 mx-auto bg-white shadow-md rounded-lg text-black w-full">
          <h1 className="text-2xl font-bold mb-4 text-center">Exercise Tracker</h1>
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Exercise Form */}
          <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-2 gap-4">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Exercise Name"
              className="border p-2 rounded shadow-sm w-full"
              required
            />
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Duration (mins)"
              className="border p-2 rounded shadow-sm w-full"
              required
            />
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="border p-2 rounded shadow-sm w-full"
              required
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
              Add Exercise
            </button>
          </form>

          {/* Exercise Records Table */}
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-400">
                <th className="p-2 border">Exercise</th>
                <th className="p-2 border">Duration (mins)</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Edit</th>
                <th className="p-2 border">Delete</th>

              </tr>
            </thead>
            <tbody>
              {exercises.map((exercise) => (
                <tr key={exercise._id} className="border">
                  <td className="p-2 border">{exercise.name}</td>
                  <td className="p-2 border">{exercise.duration}</td>
                  <td className="p-2 border">{exercise.category}</td>
                  <td className="p-2 border">{new Date(exercise.date).toLocaleDateString()}</td>
                  <td className="p-2 border">
  <a
    href={`editExercise/${exercise._id}`}
    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
  >
   ✏️ Edit
  </a>
</td>
<td className="p-2 border">
  <button
    onClick={() => handleDelete(exercise._id)}
    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
  >
   🗑️  Delete
  </button>
</td>
 </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
