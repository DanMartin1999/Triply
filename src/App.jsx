import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Voting from "./pages/Voting";
import Support from "./pages/Support";
import Japan from "./pages/Japan";
import MapPage from "./pages/Map";

// DESTINATION PAGES
import Barbados from "./pages/Barbados";
import Panama from "./pages/Panama";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Main */}
        <Route path="/home" element={<Home />} />
        <Route path="/voting" element={<Voting />} />
        <Route path="/support" element={<Support />} />
        <Route path="/map" element={<MapPage />} />

        {/* DESTINATIONS */}
        <Route path="/barbados" element={<Barbados />} />
        <Route path="/panama" element={<Panama />} />
        <Route path="/japan" element={<Japan />} />

      </Routes>
    </BrowserRouter>
  );
}