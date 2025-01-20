import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp || !email) {
      toast.error("OTP and email are required");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://todo-backend-alpha-ten.vercel.app/api/user/verifyOtpForgot",
        { otp, email }
      );
      if (response.status === 200) {
        toast.success("OTP verified successfully");
        navigate("/reset-password"); // Navigate to Reset Password screen
      }
    } catch (error) {
      toast.error(error.response.data.error || "Invalid OTP or expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-4 px-2 sm:px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md sm:p-8">
        <h2 className="text-2xl font-bold mb-4 text-center sm:text-3xl">
          Verify OTP
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="otp"
            >
              OTP
            </label>
            <input
              type="text"
              id="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default VerifyOtp;
