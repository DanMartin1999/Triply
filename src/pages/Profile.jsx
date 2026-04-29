export default function Profile() {
  const user = JSON.parse(localStorage.getItem("triplyUser"));

  return (
    <div style={{ padding: "40px" }}>
      <h1>Profile 👤</h1>

      <h2>Welcome {user?.firstName || "User"} 📌</h2>

      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Username:</strong> {user?.username}</p>
      <p><strong>Last Name:</strong> {user?.lastName}</p>
    </div>
  );
}