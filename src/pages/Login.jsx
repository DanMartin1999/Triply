import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [userInput, setUserInput] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("triplyUser"));

    if (!savedUser) {
      alert("No account found. Please create an account.");
      return;
    }

    // normalize input (fixes most login bugs)
    const input = userInput.trim().toLowerCase();
    const savedUsername = savedUser.username.trim().toLowerCase();
    const savedEmail = savedUser.email.trim().toLowerCase();

    const passwordMatch = password === savedUser.password;

    const userMatch =
      input === savedUsername || input === savedEmail;

    if (userMatch && passwordMatch) {
      navigate("/home"); // ✅ FIXED ROUTE
    } else {
      alert("Wrong username/email or password.");
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.box}>
        <h1 style={styles.title}>Log in to your account</h1>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Email / Username"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <div style={styles.linkRow}>
            <button
              type="button"
              style={styles.smallLinkBtn}
              onClick={() => alert("Forgot password feature can be added later")}
            >
              Forgot Password
            </button>

            <Link to="/signup" style={styles.smallLinkText}>
              Create Account
            </Link>
          </div>

          <button type="submit" style={styles.pinkButton}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#ffffff",
  },
  box: {
    width: "420px",
    background: "white",
    padding: "35px",
    borderRadius: "10px",
    border: "1px solid #f3d7dc",
  },
  title: {
    color: "black",
    marginBottom: "25px",
    fontSize: "32px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  input: {
    padding: "16px",
    border: "2px solid lightpink",
    borderRadius: "8px",
    fontSize: "18px",
    outline: "none",
  },
  linkRow: {
    display: "flex",
    gap: "18px",
    alignItems: "center",
  },
  smallLinkBtn: {
    background: "none",
    border: "none",
    color: "#4a90e2",
    cursor: "pointer",
    fontSize: "16px",
  },
  smallLinkText: {
    color: "#4a90e2",
    textDecoration: "none",
    fontSize: "16px",
  },
  pinkButton: {
    padding: "14px",
    border: "2px solid lightpink",
    borderRadius: "8px",
    background: "lightpink",
    fontWeight: "bold",
    fontSize: "18px",
    cursor: "pointer",
  },
};