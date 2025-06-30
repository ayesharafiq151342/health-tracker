import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/button";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 5;
  const isFormValid = isEmailValid && isPasswordValid && name.length > 0;

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!isFormValid) {
      if (!isEmailValid) {
        toast.error("Invalid email format.");
      }
      if (!isPasswordValid) {
        toast.error("Password must be at least 5 characters long.");
      }
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://health-tracker-backend-with-ash.vercel.app/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Signup successful! Redirecting...");
        navigate("/Login");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again." + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-gray-100 min-h-screen">
      {/* Left Side - Image */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center h-screen"
        style={{ backgroundImage: 'url(/signup.jpg)' }}
      ></div>

      {/* Right Side */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2">
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-black text-center">Sign Up</h2>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-black mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-black mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 border  border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-black mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Sign Up"}
            </Button>
          </form>

          <p className="mt-4 text-center text-black">
            Already have an account?
            <a href="/login" className="text-blue-600 hover:underline"> Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
