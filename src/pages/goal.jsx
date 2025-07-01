import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
import { TopHeader } from "../components/topheader";
import { SidebarComponent } from "../components/sidebar";

function SetGoals() {
  const [calorieGoal, setCalorieGoal] = useState(0);
  const [exerciseGoal, setExerciseGoal] = useState('');
  const [currentGoal, setCurrentGoal] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    axios.get('https://health-tracker-backend-with-f7xnxlpui.vercel.app/api/users/get-goal', {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    })
      .then(data => {
        if (data) {
          setCalorieGoal(data.data.goal.calorieGoal);
          setExerciseGoal(data.data.goal.exerciseGoal);
          setCurrentGoal(data.data.goal);
        }
      })
      .catch(error => console.error('Error fetching goals:', error));
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    if (!token) {
      toast.error("Not logged in. Please login again.");
      return;
    }

    const goalData = { calorieGoal, exerciseGoal };

    axios.post('https://health-tracker-backend-with-f7xnxlpui.vercel.app/api/users/create-goal', goalData, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    })
      .then(data => {
        setCurrentGoal(data.data.goal);
        toast.success('Goals saved successfully!');
      })
      .catch(error => {
        console.error('Error saving goals:', error);
        toast.error("Failed to save goals.");
      });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white">
      <Toaster position="top-right" />
      <SidebarComponent isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <TopHeader toggleSidebar={toggleSidebar} />

        <div className="p-6 m-8 w-full max-w-4xl mx-auto mt-12 bg-white shadow-lg rounded-lg text-black">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Set Your Goals</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="calorieGoal" className="block text-gray-700 font-medium mb-2">Calorie Goal:</label>
              <input
                type="number"
                id="calorieGoal"
                value={calorieGoal}
                onChange={(e) => setCalorieGoal(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-800"
              />
            </div>

            <div>
              <label htmlFor="exerciseGoal" className="block text-gray-700 font-medium mb-2">Exercise Goal:</label>
              <input
                type="text"
                id="exerciseGoal"
                value={exerciseGoal}
                onChange={(e) => setExerciseGoal(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-800"
              />
            </div>

            <button type="submit" className="col-span-2 w-full bg-gray-800 text-white p-2 rounded shadow-md hover:bg-gray-500">

              Save Goals
            </button>
          </form>

          {currentGoal && (
            <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Current Goals:</h3>
              <p className="text-gray-700">Calorie Goal: <span className="font-medium">{currentGoal.calorieGoal}</span></p>
              <p className="text-gray-700">Exercise Goal: <span className="font-medium">{currentGoal.exerciseGoal}</span></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SetGoals;
