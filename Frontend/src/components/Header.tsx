import React, { useState } from "react";
import { logout as apiLogout } from "@/api/api";
import { useAuth } from "@/context/auth";

const Header = () => {
  const [error, setError] = useState<string | null>(null);
  const { user, logout: contextLogout } = useAuth();

  const handleLogout = async () => {
    try {
      await apiLogout();
      contextLogout(); // Update context to reflect logout
      // Optionally, redirect to login page after logout
      // navigate("/login");
    } catch (error) {
      setError("Logout failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Welcome, {user?.data.name}</h1>
      {error && <p>{error}</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;
