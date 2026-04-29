import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Voting from "./pages/Voting";
import Support from "./pages/Support";
import MapPage from "./pages/Map";

import Barbados from "./pages/Barbados";
import Panama from "./pages/Panama";
import Madrid from "./pages/Madrid";
import Japan from "./pages/Japan";
import Profile from "./pages/Profile";
import SplitBills from "./pages/SplitBills"; // ✅ ADD THIS

function Layout({ children }) {
  const location = useLocation();

  const hideNav =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      {!hideNav && (
        <nav style={styles.navbar}>
          {/* LOGO */}
          <div style={styles.logo}>✈️ Triply</div>

          {/* NAV LINKS */}
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Link to="/home" style={styles.homeBtn}>Home</Link>
          </div>

          {/* PROFILE */}
          <Link to="/profile" style={styles.profileBtn}>
            👤
          </Link>
        </nav>
      )}

      {children}
    </>
  );
}

export default function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <BrowserRouter>
      <Layout>
        <Routes>

          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route
            path="/home"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />

          <Route path="/voting" element={<Voting />} />
          <Route path="/splitbills" element={<SplitBills />} /> {/* ✅ FIXED */}
          <Route path="/support" element={<Support />} />
          <Route path="/map" element={<MapPage />} />

          <Route path="/barbados" element={<Barbados />} />
          <Route path="/panama" element={<Panama />} />
          <Route path="/japan" element={<Japan />} />
          <Route path="/madrid" element={<Madrid />} />

          <Route path="/profile" element={<Profile />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

/* 💅 NAV STYLES */
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 22px",
    background: "linear-gradient(90deg, #0f172a, #1e293b)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  logo: {
    color: "white",
    fontWeight: "700",
    fontSize: "20px",
  },

  homeBtn: {
    background: "white",
    color: "#0f172a",
    padding: "8px 14px",
    borderRadius: "999px",
    textDecoration: "none",
    fontWeight: "600",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "14px",
  },

  profileBtn: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
};