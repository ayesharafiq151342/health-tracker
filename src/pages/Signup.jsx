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
      const response = await fetch("http://localhost:4000/api/auth/register", {
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 px-4">
      <div className="flex flex-col md:flex-row  bg-gray-200/30 rounded-lg shadow-lg  rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
        <div className="hidden md:flex w-1/2  bg-gray-200/30 rounded-lg shadow-lg   justify-center items-center p-8">
          <div className="text-center">
            <img src="/signupbg-removebg-preview.png" alt="Illustration" className="mx-auto mb-4" />
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-white text-center">Sign Up</h2>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-white mb-1">Name</label>
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
              <label className="block text-white mb-1">Email</label>
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
              <label className="block text-white mb-1">Password</label>
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

          <p className="mt-4 text-center text-white">
            Already have an account?
            <a href="/login" className="text-blue-600 hover:underline"> Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
