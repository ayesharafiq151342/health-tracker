import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { SidebarComponentbyadmin } from './sidebar_admin';
import { TopHeaderbyadmin } from './topHeaderby-admin';
// Adjust if needed

export default function Dashboard() {
    const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  }; 
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/users/Data-Admin", {
        withCredentials: true,
      });
      
      if (response.data.success) {
        setUsers(response.data.users || []);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (userId, currentStatus) => {
    try {
      const response = await axios.put(
        "http://localhost:4000/api/users/update-status",
        { userId, status: !currentStatus },
        { withCredentials: true }
      );

      if (response.data.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, status: !currentStatus } : user
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const toggleAdmin = async (userId, isAdmin) => {
    try {
      const response = await axios.put(
        "https://health-tracker-backend-with-ash.vercel.app/api/users/update_admin_by_admin",
        { userId, isAdmin: !isAdmin },
        { withCredentials: true }
      );

      if (response.data.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isAdmin: !isAdmin } : user
          )
        );
      }
    } catch (error) {
      console.error("Error updating admin status:", error);
    }
  };

  if (loading) return <p className="text-center text-lg">Loading users...</p>;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-r from-gray-900 to-gray-700  text-white">
      <SidebarComponentbyadmin isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
<div className="flex-1 flex flex-col">
        <TopHeaderbyadmin toggleSidebar={toggleSidebar} />
   
   

      <div className="flex-1 p-6  bg-darkGreen overflow-x-auto">
         <div className="shadow-md rounded-lg p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-3">User</th>
                <th className="p-3">Email</th>
                <th className="p-3">Status</th>
                <th className="p-3">Admin</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-700">
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.status
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {user.status ? "Active" : "Deactivated"}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.isAdmin
                            ? "bg-blue-200 text-blue-800"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {user.isAdmin ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="p-3 space-x-2">
                      <button
                        className={`px-3 py-1 text-white rounded ${
                          user.status
                            ? "bg-red-500 hover:bg-red-700"
                            : "bg-green-500 hover:bg-green-700"
                        }`}
                        onClick={() => toggleStatus(user._id, user.status)}
                      >
                        {user.status ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        className={`px-3 py-1 text-white rounded ${
                          user.isAdmin
                            ? "bg-gray-500 hover:bg-gray-700"
                            : "bg-blue-500 hover:bg-blue-700"
                        }`}
                        onClick={() => toggleAdmin(user._id, user.isAdmin)}
                      >
                        {user.isAdmin ? "Remove Admin" : "Make Admin"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-3 text-center text-gray-500">
                    No users available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </div> </div>
  );
};




