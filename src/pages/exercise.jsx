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
  const [editId, setEditId] = useState(null);

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
      const res = await axios.get("http://localhost:4000/api/users/exercises", {
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
      let res;
      if (editId) {
        res = await axios.put(`http://localhost:4000/api/users/edit-exercise/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExercises((prev) => prev.map((ex) => (ex._id === editId ? { ...ex, ...formData } : ex)));
        setEditId(null);
      } else {
        res = await axios.post("http://localhost:4000/api/users/create-exercise", formData, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        if (res.data.success) {
          setExercises((prev) => [...prev, res.data.exercise]);
        }
      }
      toast.success(editId ? "Exercise updated successfully!" : "Exercise added successfully!");
      setFormData({ name: "", duration: "", category: "", date: "" });
    } catch (error) {
      toast.error("Failed to add/update exercise. Try again." + error);
    }
  };

  const handleEdit = (exercise) => {
    setFormData({
      name: exercise.name,
      duration: exercise.duration.toString(),
      category: exercise.category.toString(),
      date: exercise.date ? exercise.date.split("T")[0] : "",
    });
    setEditId(exercise._id);
    toast.success("Edit Data");
  };

  const handleDelete = async (exerciseId) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        toast.error("Authentication token missing. Please log in again.");
        return;
      }
      await axios.delete(`http://localhost:4000/api/users/delete-exercise/${exerciseId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setExercises((prev) => prev.filter((ex) => ex._id !== exerciseId));
      toast.success("Exercise deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete exercise. Try again." + error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white">
      <Toaster position="top-right" reverseOrder={false} />
      <SidebarComponent isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <TopHeader toggleSidebar={toggleSidebar} />
        <div className="p-6 m-8 lg:w-[1400px] border mx-auto bg-white shadow-md rounded-lg text-black w-full">
          <h1 className="text-2xl font-bold mb-4 text-center">Exercise Tracker</h1>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-2 gap-4">
            {Object.keys(formData).map((key) => (
              <input
                key={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                className="border p-2 rounded shadow-sm w-full"
                required
              />
            ))}
            <button type="submit" className="col-span-2 bg-blue-500 text-white p-2 rounded shadow-md hover:bg-blue-600">
              {editId ? "Update Exercise" : "Add Exercise"}
            </button>
          </form>

          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Exercise</th>
                <th className="p-2 border">Duration (mins)</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {exercises.map((exercise) => (
                <tr key={exercise._id} className="border">
                  <td className="p-2 border">{exercise.name}</td>
                  <td className="p-2 border">{exercise.duration}</td>
                  <td className="p-2 border">{exercise.category}</td>
                  <td className="p-2 border">{new Date(exercise.date).toLocaleDateString()}</td>
                  <td className="p-2 border flex justify-center gap-2">
                    <button onClick={() => handleEdit(exercise)} className="bg-yellow-500 px-2 py-1 rounded">Edit</button>
                    <button onClick={() => handleDelete(exercise._id)} className="bg-red-500 px-2 py-1 rounded">Delete</button>
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
