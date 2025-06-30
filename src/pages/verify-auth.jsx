import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../ui/button";
import toast from "react-hot-toast";

function ResetPassword() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  if (!email) {
    toast.error("Invalid access. Please request OTP again.");
    navigate("/forgot-password");
    return null;
  }

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://health-tracker-backend-with-ash.vercel.app/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Password reset successfully! Please login.");
        navigate("/login");
      } else {
        toast.error(data.message || "Password reset failed.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again."+err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-gray-100 min-h-screen">
      {/* Left Side - Image */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center h-screen"
        style={{ backgroundImage: 'url(/reste.jpg)' }}
      ></div>

      {/* Right Side */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
 
  );
}

export default ResetPassword;
