import { useEffect, useState } from "react";
import { Search, Bell, Globe, Menu as MenuIcon } from "lucide-react";
import  {useNavigate} from "react-router-dom";
export function TopHeader({ toggleSidebar }) {

  const [user, setUser] = useState(null);
  const navigator = useNavigate() 
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
       
        navigator("/signup");
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
    <div className="flex items-center justify-between bg-gray-900 p-3 shadow-md w-full border-b border-gray-200">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="text-white md:hidden">
          <MenuIcon />
        </button>
        <h1 className="text-lg font-semibold text-white">Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 text-white pl-10 pr-4 py-1.5 rounded-lg focus:outline-none w-full"
          />
        </div>
        <Bell className="text-gray-400 cursor-pointer" />
        <div className="flex items-center gap-2 text-white">
          <Globe className="text-gray-400" />
          <span className="hidden sm:block">Eng (US)</span>
        </div>
        {user && (
          <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-lg">
            <span className="text-white">{user.name}</span>
          </div>
        )}
         <button onClick={handleLogout}>Logout</button>
      </div>
     
    </div>
  );
}
