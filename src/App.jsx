import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

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
import Madrid from "./pages/Madrid";

export default function App() {
  return (
    <BrowserRouter>

  {/* 🔥 NAVBAR */}
  <nav style={{ display: "flex", gap: "20px", padding: "15px", background: "#111" }}>
    <Link to="/home" style={{ color: "white" }}>Home</Link>
    <Link to="/panama" style={{ color: "white" }}>Panama</Link>
    <Link to="/barbados" style={{ color: "white" }}>Barbados</Link>
    <Link to="/madrid" style={{ color: "white" }}>Madrid</Link>
    <Link to="/map" style={{ color: "white" }}>Map</Link>
  </nav>

  <Routes>

    <Route path="/" element={<Navigate to="/home" />} />

    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />

    <Route path="/home" element={<Home />} />
    <Route path="/voting" element={<Voting />} />
    <Route path="/support" element={<Support />} />
    <Route path="/map" element={<MapPage />} />

    <Route path="/barbados" element={<Barbados />} />
    <Route path="/panama" element={<Panama />} />
    <Route path="/japan" element={<Japan />} />
    <Route path="/madrid" element={<Madrid />} />

  </Routes>

</BrowserRouter>
  );
}