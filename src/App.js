import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "../src/Components/Tasklist"; 
import Register from "./Components/signUp.jsx"; 
import SignIn from "./Components/signIn.jsx";
import PrivateRoute from "./Components/privateRoute.js";
import ForgotPassword from "./Components/ForgotPassword";
import VerifyOtp from "./Components/VerifyOtp";
import ResetPassword from "./Components/ResetPassword";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute element={<TaskList />} />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
