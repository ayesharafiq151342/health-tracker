import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Home, BarChart, Settings } from "lucide-react";
import { useState } from "react";

export function SidebarComponent({ isOpen, toggleSidebar }) {
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform md:relative md:translate-x-0 md:w-74 w-80 bg-black-100 p-4 shadow-lg`}
    >
      <Sidebar className="h-full bg-black border-r border-gray-300">
        <Menu>
          <MenuItem
            icon={<Home />}
            className={`hover:bg-gray-800 text-white ${
              activeItem === "Dashboard" ? "bg-gray-900 text-white" : "text-gray-400"
            }`}
            
            onClick={() => setActiveItem("Dashboard")}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            icon={<BarChart />}
            className={`hover:bg-gray-900 text-gray-800 ${
              activeItem === "Analytics" ? "bg-gray-900 text-white" : "text-gray-400: "
            }`}
            onClick={() => setActiveItem("Analytics")}
          >
            Analytics
          </MenuItem>
          <MenuItem
            icon={<Settings />}
            className={`hover:bg-gray-900 text-gray-800 ${
              activeItem === "Settings" ? "bg-gray-900 text-white" : "text-gray-400:"
            }`}
            onClick={() => setActiveItem("Settings")}
          >
            Settings
          </MenuItem>
        </Menu>
      </Sidebar>
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 md:hidden text-gray-800"
      >
        X
      </button>
    </div>
  );
}
