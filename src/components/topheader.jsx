import { useEffect, useState } from "react";
import { Menu as MenuIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export function TopHeader({ toggleSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // 🛑 Define titles dynamically based on routes
  const pageTitles = {
    "/dashboard": "Dashboard",
    "/Exercise": "Exercise Tracker",
    "/MedicalRecords": "Medical Records",
    "/meals": "Meal Tracker",
    "/suggestions": "Health Suggestions",
    "/reminder": "Reminders",
  };

  // Get the current page title based on URL
  const pageTitle = pageTitles[location.pathname] || "Dashboard";

  // Logout function
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      console.log("Logout Response:", data);
      if (data.success) {
        localStorage.removeItem("token");
        navigate("/signup");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="flex items-center justify-between bg-gray-900 p-3 shadow-md w-full border-b border-gray-700">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="text-white md:hidden">
          <MenuIcon />
        </button>
        <h1 className="text-lg font-semibold text-white">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-lg">
            <span className="text-white">{user.name}</span>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="bg-gray-600 px-3 py-1 rounded-md text-white hover:bg-gray-500 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
