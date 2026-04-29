import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Voting from "./pages/Voting";
import Support from "./pages/Support";
import Japan from "./pages/Japan";
import MapPage from "./pages/Map";

import Barbados from "./pages/Barbados";
import Panama from "./pages/Panama";
import Madrid from "./pages/Madrid";
import Profile from "./pages/Profile"; // (make sure this exists)

function Layout({ children }) {
  const location = useLocation();

  // 🚨 HIDE NAV ON AUTH PAGES
  const hideNav =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      {!hideNav && (
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px",
            background: "#111",
          }}
        >
          <Link to="/home" style={{ color: "white", textDecoration: "none" }}>
            ⬅ Home
          </Link>

          <div style={{ display: "flex", gap: "20px" }}>
            <Link to="/support" style={{ color: "white", textDecoration: "none" }}>
              Support
            </Link>

            <Link to="/map" style={{ color: "white", textDecoration: "none" }}>
              Map
            </Link>

            <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>
              👤 Profile
            </Link>
          </div>
        </nav>
      )}

      {children}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>

          {/* 🔥 ENTRY FLOW */}
          <Route path="/" element={<Navigate to="/home" />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* MAIN APP */}
          <Route path="/home" element={<Home />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/support" element={<Support />} />
          <Route path="/map" element={<MapPage />} />

          {/* DESTINATIONS */}
          <Route path="/barbados" element={<Barbados />} />
          <Route path="/panama" element={<Panama />} />
          <Route path="/japan" element={<Japan />} />
          <Route path="/madrid" element={<Madrid />} />

          {/* PROFILE (NEW SETTINGS PAGE) */}
          <Route path="/profile" element={<Profile />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}