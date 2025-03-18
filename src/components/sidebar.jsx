
import { NavLink, useLocation } from "react-router-dom";
import { Home, BarChart, Dumbbell, Clipboard, Utensils, Lightbulb, Bell, Settings } from "lucide-react";

export function SidebarComponent({ isOpen, toggleSidebar }) {
  const location = useLocation(); // ✅ Get current URL path

  const menuItems = [
    { name: "Dashboard", icon: <Home />, link: "/dashboard" },
    { name: "Exercise", icon: <Dumbbell />, link: "/Exercise" },
    { name: "Medical Records", icon: <Clipboard />, link: "/MedicalRecords" },
    { name: "Meals", icon: <Utensils />, link: "/meals" },
    { name: "Suggestions", icon: <Lightbulb />, link: "/suggestions" },
    { name: "Reminder", icon: <Bell />, link: "/reminder" },
  
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform md:relative md:translate-x-0 md:w-64 w-72 bg-gray-900 p-4 shadow-lg`}
    >
      <div className="h-full bg-gray-900 border-r border-gray-700 p-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.link}
                className={`flex items-center gap-3 hover:bg-gray-800 transition-colors duration-300 rounded-md px-3 py-2 cursor-pointer text-white ${
                  location.pathname === item.link ? "bg-gray-700 text-white" : "text-gray-400"
                }`}
              >
                {item.icon} {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 md:hidden text-gray-400 hover:text-white"
      >
        X
      </button>
    </div>
  );
}
