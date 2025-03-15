import { Search, Bell, Globe, Menu as MenuIcon } from "lucide-react";

export function TopHeader({ toggleSidebar }) {
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
      </div>
    </div>
  );
}
