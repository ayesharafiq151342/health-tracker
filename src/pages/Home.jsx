import Navbar from "../components/navbar";
import { FaBatteryFull, FaWallet, FaHeart, FaMobileAlt, FaSwimmer } from "react-icons/fa";
import Footer from "../components/footer";

const Home = () => {
  return (
    <>
      <div className="bg-gray-100 text-gray-900 overflow-hidden">
        {/* Navbar */}
        <Navbar />
   

      {/* Hero Section */}
      <section  
        className="relative h-[400px] md:h-[700px] flex flex-col lg:items-end items-center  justify-center text-center bg-cover bg-center px-4"
        style={{ backgroundImage: "url('/slider-bg.webp')" }}
      >
        <h2 className="text-xl md:text-2xl font-bold text-white lg:mr-90">The New Mefit</h2>
        <h3 className="text-3xl md:text-5xl font-bold text-white mt-2 lg:mr-50">Motivation on Wrist</h3>
      </section>

      {/* Features Section */}
      <section 
        className="bg-gray-100 lg:h-[550px] relative py-16 flex flex-col items-center text-center bg-cover bg-center px-4"
        style={{ backgroundImage: "url('/homeimage2.webp')" }}
      >
        <h2 className="text-2xl lg:mt-20 md:text-3xl font-semibold text-white">Access The Smart Experiences That Matter</h2>
        <div className="mt-8 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-5 gap-6">
          {[  
            { icon: <FaBatteryFull className="text-4xl text-blue-500" />, text: "4+ Day Battery Life" },
            { icon: <FaWallet className="text-4xl text-green-500" />, text: "Contactless Payments" },
            { icon: <FaHeart className="text-4xl text-red-500" />, text: "Heart Rate Tracking" },
            { icon: <FaMobileAlt className="text-4xl text-purple-500" />, text: "Apps & Notifications" },
            { icon: <FaSwimmer className="text-4xl text-blue-400" />, text: "Swimproof Watch" },
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center">
              {item.icon}
              <h3 className="font-semibold mt-2">{item.text}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Calorie Tracker Section */}
      <section
        className="relative bg-cover h-[400px] bg-bottom py-16 flex flex-col items-center text-center px-4"
        style={{
          backgroundImage: 'url("/home-image-3.jpg")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center 20%", // Adjusts position for better view
        }}
      >
        <div className="max-w-4xl grid grid-cols-1 md:grid-cols-4 gap-10 items-center">
          {/* Left Image */}
 
          <div className="flex lg:ml-20 justify-center ">
            <img src="/homepage 3a.webp" alt="Calorie Tracker" className="w-60 md:w-96 object-contain" />
          </div>
          <div className="md:flex justify-center hidden">
           
          </div>
     
          {/* Right Text Content */}
          <div className="text-left">
            <h2 className="text-3xl md:text-xl font-bold text-blue-950">Calorie Tracker</h2>
            <p className="mt-4 text-gray-700 font-medium">WHAT YOU CAN'T STOP EXPECTING.</p>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li> 5-day battery life</li>
              <li> Digital tracking algorithm</li>
              <li> High splash resistant</li>
              <li> DRX Limited Edition</li>
            </ul>
           
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section 
        className="relative h-[400px] md:h-[500px] flex flex-col items-center justify-center text-center bg-cover bg-center px-4"
        style={{ backgroundImage: "url('/iamge4.webp')" }}
      >
        <h2 className="text-xl md:text-2xl font-bold text-white">Keep Health Fit for Every Moment</h2>
        <p className="text-sm md:text-base font-medium text-white mt-2">
          Designed to be your personal wellness and fitness companion. <br />
          Versa does more than tell the time. It tells you how to make the most of it.
        </p>
      </section>

      {/* Health Tracking Section */}
      <section className="relative bg-gray-100 py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          
          {/* Left - Mobile Mockup */}
          <div className="flex justify-center">
            <img src="/homeimage5.webp" alt="Mobile App" className="w-60 md:w-72 lg:w-80 drop-shadow-lg" />
          </div>

          {/* Right - Text Content */}
          <div className="text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Know Yourself, Know Your Health
            </h2>
            <div className="mt-6 space-y-6">
              {[
                { icon: "🚴", title: "Personal Fitbit Dashboard", desc: "See all your stats, set goals & track progress." },
                { icon: "🍏", title: "Sleep Tracking & Stages", desc: "Track time in light, deep, and REM sleep stages & gain insights." },
                { icon: "💜", title: "Female Health Tracking", desc: "Log periods, track your cycle & gauge ovulation with ease." },
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <span className="text-purple-600 text-2xl">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Footer Section */}
      <Footer />   </div>
    </>
  );
};

export default Home;
