 function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="container mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-10">
  
          {/* Column 1 - Logo & About */}
          <div>
            <h2 className="text-xl font-bold text-white">Prayer Tracker</h2>
            <p className="mt-3 text-sm">
              Track your prayers, set goals, and maintain consistency with our intuitive tracker.
            </p>
          </div>
  
          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
  
          {/* Column 3 - Social Media & Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="mt-3 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white text-xl">🔵</a> {/* Facebook */}
              <a href="#" className="text-gray-400 hover:text-white text-xl">🔷</a> {/* Twitter */}
              <a href="#" className="text-gray-400 hover:text-white text-xl">📸</a> {/* Instagram */}
            </div>
            <h3 className="text-lg font-semibold text-white mt-6">Contact</h3>
            <p className="mt-2 text-sm">📩 support@prayertracker.com</p>
          </div>
  
        </div>
  
        {/* Bottom Line */}
        <div className="mt-10 border-t border-gray-700 text-center pt-5 text-sm">
          © {new Date().getFullYear()} Prayer Tracker. All rights reserved.
        </div>
      </footer>
    );
  }
  export default  Footer