import React, { useState } from "react";
import { logout as apiLogout } from "@/api/api";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [error, setError] = useState<string | null>(null);
  const { user, logout: contextLogout } = useAuth();

  const handleLogout = async () => {
    try {
      await apiLogout();
      contextLogout();
    } catch (error) {
      setError("Logout failed. Please try again.");
    }
  };

  return (
    <header className="py-4 text-white shadow-md bg-dark-300">
      <div className="flex items-center justify-around px-4 mx-2 ">
        <div className="flex items-center space-x-4">
          <img src="/react.svg" alt="logo" className="w-8 h-8" />
          <h1 className="text-2xl font-semibold">Quiz App</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="hidden text-lg sm:inline">
            Welcome, {user?.data.name}
          </span>
          <Button
            className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
      {error && (
        <div className="py-2 text-center text-white bg-red-500">{error}</div>
      )}
    </header>
  );
};

export default Header;
