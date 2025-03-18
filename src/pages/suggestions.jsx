import React, { useState } from 'react'
    // import toast, { Toaster } from "react-hot-toast";
    
    import { TopHeader } from "../components/topheader";
    import { SidebarComponent } from "../components/sidebar";
    
    function Suggestions() {
   
 
      const [isSidebarOpen, setSidebarOpen] = useState(false);
    
      const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    
      return (
        <div className="flex flex-col md:flex-row h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white">
         
          <SidebarComponent isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    
          <div className="flex-1 flex flex-col">
            <TopHeader toggleSidebar={() => {}} />
            <div className="p-6 m-8 lg:w-[1400px] border mt-10 mx-auto bg-white shadow-md rounded-lg text-black w-full">
            <>ider hai suugestions</>
            </div>
          </div>
        </div>
      );
    }
    
export default Suggestions
