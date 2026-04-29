import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const user = {
      firstName,
      lastName,
      email,
      username,
      password,
    };

    localStorage.setItem("triplyUser", JSON.stringify(user));

    navigate("/"); // ✅ go to home after signup
  }

  return (
    <div style={styles.page}>
      <div style={styles.box}>
        <h1 style={styles.title}>Create your account</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

          <button type="submit" style={styles.pinkButton}>
            Sign Up
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