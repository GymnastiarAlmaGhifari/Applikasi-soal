import React, { useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Soal from "./pages/Soal";
import Hasil from "./pages/Hasil";

function App() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("lastVisitedPage", location.pathname);
    }
  }, [location, isLoggedIn]);

  // Determine the redirect path
  const getRedirectPath = () => {
    const lastVisitedPage = localStorage.getItem("lastVisitedPage");
    return lastVisitedPage ? lastVisitedPage : "/home";
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <Login />
            ) : (
              <Navigate to={getRedirectPath()} replace />
            )
          }
        />
        <Route
          path="/register"
          element={
            !isLoggedIn ? (
              <Register />
            ) : (
              <Navigate to={getRedirectPath()} replace />
            )
          }
        />
        <Route
          path="/home"
          element={
            isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/soal"
          element={isLoggedIn ? <Soal /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/hasil"
          element={isLoggedIn ? <Hasil /> : <Navigate to="/login" replace />}
        />
        <Route
          path="*"
          element={
            <Navigate to={isLoggedIn ? getRedirectPath() : "/login"} replace />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
