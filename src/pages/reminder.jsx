import React, { useState, useEffect } from "react";
import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";

import { TopHeader } from "../components/topheader";
import { SidebarComponent } from "../components/sidebar";
import toast from "react-hot-toast";

function Reminder() {
  const [description, setdescription] = useState("");
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    axios.get("https://health-tracker-backend-with-f7xnxlpui.vercel.app/reminders").then((res) => {
      setReminders(res.data);
    });
  }, []);

  const addReminder = () => {
    axios
      .post("https://health-tracker-backend-with-f7xnxlpui.vercel.app/add-reminder", { description, time, email })
      .then(() => {
        toast.success("Reminder Added!");
        setReminders([...reminders, { description, time, email }]);
      });
  };

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white">
      <SidebarComponent isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        <TopHeader toggleSidebar={() => {}} />
        <div className="p-6 lgm-8 lg:w-[1400px] border mt-10 mx-auto  bg-white shadow-md rounded-lg text-black w-full m-20">
          <>
          <h1 className="text-2xl font-bold mb-4 text-center">Reminder</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
        <input
             className="border p-2 w-full mb-2 rounded"

              placeholder="Write your own words"
              onChange={(e) => setdescription(e.target.value)}
            />
            </div>
            <input 
             className="border p-2 w-full mb-2 rounded"
            
             type="time" onChange={(e) => setTime(e.target.value)} />
            <input
              type="email"
              placeholder="Email"
                  className="border p-2 w-full mb-2 rounded"
              onChange={(e) => setEmail(e.target.value)}
            />
     
      </div>
            
      <button type="submit" className="col-span-2 bg-gray-800 text-white p-2 rounded shadow-md hover:bg-gray-500"
            onClick={addReminder}>Set Reminder</button>
        
      
        <h3 className="text-xl font-semibold mt-6">Reminders</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        {reminders.map((reminder, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <p className="font-semibold">{reminder.description}</p>
            <p className="text-sm text-gray-600">Time: <strong>{reminder.time}</strong></p>
            <p className="text-sm text-gray-600">Email: {reminder.email}</p>
          </div>
        ))}
      </div>
          </>
        </div>
      </div>
    </div>
  );
}

export default Reminder;
