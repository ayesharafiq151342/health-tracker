import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

import { TopHeader } from "../components/topheader";
import { SidebarComponent } from "../components/sidebar";
export default function MedicalRecords() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    heartBeat: "",
    systolic: "",
    diaSystolic: "",
    sugar: "",
    date: "",
  });
  const [editId, setEditId] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        toast.error("Not logged in. Please login again.");
        return;
      }

      const res = await axios.get("https://health-tracker-backend-with-f7xnxlpui.vercel.app/api/users/get-records", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (res.data.success && Array.isArray(res.data.records)) {
        setRecords(res.data.records);
      } else {
        setRecords([]);
      }
    } catch (error) {
      console.error("Fetch Records Error:", error.message);
      toast.error("Failed to load records.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    if (!token) {
      toast.error("Authentication token missing. Please log in again.");
      return;
    }

    try {
      if (editId) {
        await toast.promise(
          axios.put(`https://health-tracker-backend-with-f7xnxlpui.vercel.app/api/users/edit-record/${editId}`, formData, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }),
          {
            loading: "Updating record...",
            success: "Record updated successfully!",
            error: "Failed to update record.",
          }
        );
        setEditId(null);
      } else {
        await toast.promise(
          axios.post("https://health-tracker-backend-with-f7xnxlpui.vercel.app/api/users/create-record", formData, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }),
          {
            loading: "Adding record...",
            success: "Record added successfully!",
            error: "Failed to add record.",
          }
        );
      }

      fetchRecords();
      setFormData({ heartBeat: "", systolic: "", diaSystolic: "", sugar: "", date: "" });
    } catch (error) {
      console.error("Submit Error:", error.message);
    }
  };

  const handleDelete = async (id) => {
  
    
    const token = Cookies.get("token");
    if (!token) {
      toast.error("Authentication token missing. Please log in again.");
      return;
    }
    try {
      
      const res = await axios.delete(`https://health-tracker-backend-with-f7xnxlpui.vercel.app/api/users/delete-record/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      if (res.data.success) {
        // setExercises((prev) => [...prev, res.data.exercise]);
        toast.success("Daily Medical Record Deleted successfully!");
        setFormData({heartBeat: "", systolic: "", diaSystolic: "", sugar: "", date: "" });
      }
    } catch (error) {
      toast.error("Failed to delete exercise. Try again." + error);
    }
    
  };
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white">
     
      <SidebarComponent isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        <TopHeader toggleSidebar={() => {}} />
        <div className="p-6 m-8 lg:w-[1400px] border mt-10 mx-auto bg-white shadow-md rounded-lg text-black w-full">
          <h1 className="text-2xl font-bold mb-4 text-center">Medical Records</h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
            <input
              name="heartBeat"
              value={formData.heartBeat}
              onChange={handleChange}
              placeholder="Heart Beat"
              className="border p-2 rounded"
              required
            />
            <select
              name="systolic"
              value={formData.systolic}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            >
              <option value="">Select Systolic (Upper BP)</option>
              {[...Array(81)].map((_, i) => (
                <option key={i} value={90 + i}>{90 + i}</option>
              ))}
            </select>
            <select
              name="diaSystolic"
              value={formData.diaSystolic}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            >
              <option value="">Select Diastolic (Lower BP)</option>
              {[...Array(61)].map((_, i) => (
                <option key={i} value={60 + i}>{60 + i}</option>
              ))}
            </select>
            <input
              name="sugar"
              value={formData.sugar}
              onChange={handleChange}
              placeholder="Sugar Level"
              className="border p-2 rounded"
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <button type="submit" className="col-span-2 bg-gray-800 text-white p-2 rounded shadow-md hover:bg-gray-500">
              {editId ? "Update Record" : "Add Record"}
            </button>
          </form>

          {/* Records Table */}
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-300">
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Heart Beat</th>
                <th className="p-2 border">BP (Sys/Dia)</th>
                <th className="p-2 border">Sugar</th>
                <th className="p-2 border">Edit</th>
                <th className="p-2 border">Delete</th>


                
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record._id} className="border">
                  <td className="p-2 border">{new Date(record.date).toLocaleDateString()}</td>
                  <td className="p-2 border">{record.heartBeat}</td>
                  <td className="p-2 border">
                    {record.bloodPressure?.systolic && record.bloodPressure?.diaSystolic
                      ? `${record.bloodPressure.systolic} / ${record.bloodPressure.diaSystolic}`
                      : "Not Recorded"}
                  </td>
                  <td className="p-2 border">{record.sugar}</td>
                  <td className="p-2 border">
  <a
    href={`editMedicalRecord/${record._id}`}
    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm inline-block text-center"
  >
    ✏️ Edit
  </a>
</td>
<td className="p-2 border">
  <button
    onClick={() => handleDelete(record._id)}
    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
  >
    🗑️ Delete
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
