import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/button";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://health-tracker-backend-with-ash.vercel.app/api/auth/send-reset-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("OTP sent to your email!");
        navigate("/verify-auth", { state: { email } });
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again." +err);
    } finally {
      setLoading(false);
    }
  };

  return (









    <div className="flex flex-col md:flex-row items-center justify-center bg-gray-100 min-h-screen">
    {/* Left Side - Image */}
    <div
      className="hidden md:block md:w-1/2 bg-cover bg-center h-screen"
      style={{ backgroundImage: 'url(/forget.webp)' }}
    ></div>

    {/* Right Side */}
    <div className="flex flex-col justify-center items-center w-full md:w-1/2">  <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Sending..." : "Send OTP"}
          </Button>
        </form>
      </div>
      </div>
 
  );
}
export default  ForgotPassword