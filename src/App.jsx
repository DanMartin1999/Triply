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
import Japan from "./pages/Japan";
import MapPage from "./pages/Map";

import Barbados from "./pages/Barbados";
import Panama from "./pages/Panama";
import Madrid from "./pages/Madrid";
import Profile from "./pages/Profile";

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
          <div style={styles.logo}>
            ✈️ Triply
          </div>

          {/* HOME BUTTON */}
          <Link to="/home" style={styles.homeBtn}>
            Home
          </Link>

          {/* PROFILE */}
          <Link to="/profile" style={styles.profileBtn}>
            👤 Profile
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

          {/* ENTRY */}
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* PROTECTED HOME */}
          <Route
            path="/home"
            element={
              isLoggedIn ? <Home /> : <Navigate to="/login" />
            }
          />

          {/* APP PAGES */}
          <Route path="/voting" element={<Voting />} />
          <Route path="/support" element={<Support />} />
          <Route path="/map" element={<MapPage />} />

          {/* DESTINATIONS */}
          <Route path="/barbados" element={<Barbados />} />
          <Route path="/panama" element={<Panama />} />
          <Route path="/japan" element={<Japan />} />
          <Route path="/madrid" element={<Madrid />} />

          {/* PROFILE */}
          <Route path="/profile" element={<Profile />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

/* 💅 NAVBAR STYLES */
const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 22px",
    background: "linear-gradient(90deg, #0f172a, #1e293b)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  logo: {
    color: "white",
    fontWeight: "700",
    fontSize: "20px",
    letterSpacing: "0.5px",
  },

  homeBtn: {
    background: "white",
    color: "#0f172a",
    padding: "10px 18px",
    borderRadius: "999px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "14px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
    transition: "0.2s ease",
  },

  profileBtn: {
    color: "white",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    padding: "8px 12px",
    borderRadius: "10px",
  },
};