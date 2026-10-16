import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Dashboard() {
  const navigate = useNavigate();
  const { users, currentUser, deleteUser, logout } = useUser();

  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const handleDelete = (id) => {
     const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      const isMyAccount = currentUser && currentUser.id === id;
deleteUser(id);
    if (isMyAccount) {
        alert("Your account has been deleted");
        navigate("/login");
      }
    }
  };

  return (
    <div className="dashboard">
      <div className="top-bar">
        <div>
          <h1>Dashboard</h1>
          {currentUser && <p>Welcome, {currentUser.name}!</p>}
        </div>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <hr />

      <div className="content">
        <h2>Users</h2>

        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <div className="users-grid">
            {users.map((item) => (
              <div className="user-card" key={item.id}>
                <h3>{item.name}</h3>
                <p>Email: {item.email}</p>
                <p>Password: {item.password}</p>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;