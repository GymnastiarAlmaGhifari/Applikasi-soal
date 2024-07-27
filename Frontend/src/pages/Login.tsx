import React, { useState } from "react";
import { login as apiLogin } from "@/api/api";
import { useAuth } from "@/context/auth";
import { AuthPayload } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const { login: contextLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async () => {
    try {
      const authData: AuthPayload = await apiLogin(username, password);
      contextLogin(authData);
      navigate("/home"); // Redirect to the home page
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <h1>Please log in</h1>
      <input
        type="text"
        placeholder="Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Login</Button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
