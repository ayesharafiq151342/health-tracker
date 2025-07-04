import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Correct import for React Router
import Button from "../ui/button";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isEmailValid = email.includes("@");
  const isPasswordValid = password.length >= 5;

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isEmailValid) {
      toast.error("Please enter a valid email");
      setLoading(false);
      return;
    }

    if (!isPasswordValid) {
      toast.error("Password must be at least 5 characters");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://health-tracker-backend-with-f7xnxlpui.vercel.app/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Ensure cookies are sent for authentication
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user)); // ✅ Store user data
        toast.success("Login successful! Redirecting...");
        navigate("/dashboard"); // ✅ Redirect after login
      } else {
        toast.error(data.message || "Invalid email or password");
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
        style={{ backgroundImage: 'url(/login.jpg)' }}
      ></div>

      {/* Right Side */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2">
        {/* Right Side (Login Form) */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-gray-800 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-gray-800 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
              />
            </div>
            {/* this is checking  */}
            <div className="flex justify-between items-center text-sm text-gray-600">
              <a href="/Forgetpassword" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Processing..." : "Login"}
            </Button>
          </form>

          <p className="mt-4 text-center text-gray-800">
            Don’t have an account?
            <a href="/signup" className="text-blue-600 hover:underline"> Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
