import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Voting from "./pages/Voting";
import Support from "./pages/Support";   
import Japan from "./pages/Japan";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/home" element={<Home />} />

        <Route path="/voting" element={<Voting />} />
        <Route path="/support" element={<Support />} />   

        <Route path="/destination/japan" element={<Japan />} />

      </Routes>
    </BrowserRouter>
  );
}
