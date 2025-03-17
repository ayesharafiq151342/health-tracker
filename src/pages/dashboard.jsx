import React, { useState } from "react";
import { TopHeader } from '../components/topheader';
import { SidebarComponent } from "../components/sidebar";
import { FaFire, FaRunning, FaChartBar, FaHeartbeat, FaTint } from "react-icons/fa";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

function DashboardLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  }; 
   const activityData = [
    { day: "Mon", value: 3 },
    { day: "Tue", value: 4 },
    { day: "Wed", value: 2 },
    { day: "Thu", value: 5 },
    { day: "Fri", value: 6 },
    { day: "Sat", value: 4 },
    { day: "Sun", value: 3 },
  ];

  const timeData = [
    { day: "Mon", value: 60 },
    { day: "Tue", value: 75 },
    { day: "Wed", value: 50 },
    { day: "Thu", value: 90 },
    { day: "Fri", value: 120 },
    { day: "Sat", value: 110 },
    { day: "Sun", value: 80 },
  ];

  const speedData = [
    { day: "Mon", value: 5 },
    { day: "Tue", value: 6 },
    { day: "Wed", value: 7 },
    { day: "Thu", value: 8 },
    { day: "Fri", value: 9 },
    { day: "Sat", value: 10 },
    { day: "Sun", value: 11 },
  ];

  const distance = 5.6;
  const totalDistance = 10;
  const COLORS = ["#00b4d8", "#ffff"];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-r from-gray-900 to-gray-700  text-white">
      <SidebarComponent isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <TopHeader toggleSidebar={toggleSidebar} />
        <div className="p-4 flex-1 overflow-auto">
          <div className="bg-gray-900 min-h-screen text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-4 rounded-lg shadow-md md:col-span-1">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <FaFire className="text-orange-400" /> Track Your Daily Activity
                </h2>
                <p className="text-gray-400 text-sm">Check Your Daily Fitness Activities And Maintain Your Health.</p>
                <div className="mt-4 bg-blue-300 p-4 mt-10 h-40 rounded-md flex flex-col justify-start items-start text-center">
                  <h3 className="text-md text-white font-medium">Morning Walk</h3>
                  <p className="text-white text-sm">Running: 130 Cal | Walk: 130 Cal | Duration: 3h 12m</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5 ">
              <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center">
                <FaChartBar className="text-blue-400 text-3xl" />
                <h3 className="mt-2 font-medium">Calories</h3>
                <p className="text-gray-400">130 Cal</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center">
                <FaHeartbeat className="text-red-400 text-3xl" />
                <h3 className="mt-2 font-medium">Heart Rate</h3>
                <p className="text-gray-400">110 Bp</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center">
                <FaTint className="text-teal-400 text-3xl" />
                <h3 className="mt-2 font-medium">Water Intake</h3>
                <p className="text-gray-400">6.0L</p>
              </div>
            </div>   </div>
              <div className="bg-gray-800 p-4 rounded-lg h-[440px] shadow-md row-span-2 flex flex-col items-center">
                <h2 className="text-lg font-semibold">Body Tracking</h2>
                <img src="/stacho-.png" alt="Muscle Diagram" className="w-96 h-96 mt-4" />
              </div> 
              <div className=" bg-gray-800 p-4 rounded-lg grid grid-cols-1 md:grid-cols-1 gap-6 mt-6 lg:mt-0">
              <div className="bg-blue-300 p-4  rounded-lg shadow-md">
                <h3 className="font-medium">Calories</h3>
                <p className="text-gray-700">Consumed: 130 Cal</p>
                <p className="text-gray-700">Remaining: 60 Cal</p>
                <div className="w-full h-2 bg-gray-400 rounded mt-2">
                  <div className="h-2 bg-blue-600 rounded" style={{ width: "70%" }}></div>
                </div>
              </div>

              <div className="bg-pink-300 p-4 rounded-lg shadow-md">
                <h3 className="font-medium">Heart</h3>
                <p className="text-gray-700">Today: 110 Bp</p>
                <p className="text-gray-700">Yesterday: 130 Bp</p>
                <div className="w-full h-2 bg-gray-400 rounded mt-2">
                  <div className="h-2 bg-pink-600 rounded" style={{ width: "50%" }}></div>
                </div>
              </div>

              <div className="bg-yellow-300 p-4 rounded-lg shadow-md">
                <h3 className="font-medium">Water</h3>
                <p className="text-gray-700">Consumed: 6.0L</p>
                <p className="text-gray-700">Remaining: 5L</p>
                <div className="w-full h-2 bg-gray-400 rounded mt-2">
                  <div className="h-2 bg-yellow-600 rounded" style={{ width: "80%" }}></div>
                </div>
              </div>
            </div>
           
            </div>

       
          
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Activity Tracking */}
        <div className="bg-gray-800 p-4 h-96 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold">Activity Tracking</h3>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={activityData}>
              <XAxis dataKey="day" stroke="#aaa" />
              <YAxis hide />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#fff" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Total Time */}
        <div className="bg-gray-800 p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold">Total Time</h3>
          <p className="text-xl">2h 25m</p>
          <ResponsiveContainer width="100%" height="82%">
            <BarChart data={timeData}>
              <XAxis dataKey="day" stroke="#aaa" />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="value" fill="#42A5F5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Total Distance */}
        <div className="bg-gray-800 p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold">Total Distance</h3>
          <p className="text-xl">10 Km</p>
          <ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={[{ value: distance }, { value: totalDistance - distance }]}
      dataKey="value"
      innerRadius={50}  // Inner Radius Increase
      outerRadius={70}  // Outer Radius Increase
      paddingAngle={5}  // Smooth Look
    >
      {COLORS.map((color, index) => (
        <Cell key={index} fill={color} />
      ))}
    </Pie>
  </PieChart>
</ResponsiveContainer>

        </div>

        {/* Average Speed */}
        <div className="bg-gray-800 p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold">Average Speed</h3>
          <p className="text-xl">10 Km/h</p>
          <ResponsiveContainer width="100%" height={290}>
            <BarChart data={speedData}>
              <XAxis dataKey="day" stroke="#aaa" />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="value" fill="url(#grad1)" />
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
        </div>
      </div>
      </div>
 
  );
}

export default DashboardLayout;
