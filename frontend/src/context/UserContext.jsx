import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const localUsers = JSON.parse(localStorage.getItem("users")) || [];
  const localCurrentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  const [users, setUsers] = useState(localUsers);
  const [currentUser, setCurrentUser] = useState(localCurrentUser);

  const signup = (name, email, password) => {
    const userExists = users.find((u) => u.email === email);

    if (userExists) {
      alert("User already exists!");
      return false;
    }

    const newUser = {
      id:Date.now(),
      name: name,
      email: email,
      password: password,
    };

    const updatedUsers = [...users, newUser];

    setUsers(updatedUsers);
    setCurrentUser(newUser);
    
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    console.log("Signed up user:", newUser);
    return true;
  };


  const login = (email, password) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      alert("Invalid email or password");
      return false;
    }

    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
    
    console.log("Logged in user:", user);
    return true;
  };


  const deleteUser = (id) => {
    const filteredUsers = users.filter((user) => user.id !== id);

    setUsers(filteredUsers);
    localStorage.setItem("users", JSON.stringify(filteredUsers));
    if (currentUser && currentUser.id === id) {
      setCurrentUser(null);
      localStorage.removeItem("currentUser");
    }
  };

  
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    console.log("Logged out successfully");
  };

  return (
    <UserContext.Provider
      value={{
        users,
        currentUser,
        signup,
        login,
        deleteUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
};