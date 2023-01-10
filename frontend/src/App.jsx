import { useState, useEffect } from "react";
import Login from "./components/login";
import Register from "./components/register";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/dashboard";

function App() {
  const [userVerified, setUserverified] = useState(false);
  const checkUser = async () => {
    const response = await fetch("http://localhost:3000/user/is-verify", {
      method: "GET",
      headers: { token: localStorage.token },
    });
    const data = await response.json();
    console.log(data);
    if (data === true) {
      setUserverified(true);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            !userVerified ? (
              <Login setAuth={setUserverified} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/register"
          element={
            !userVerified ? (
              <Register setAuth={setUserverified} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={userVerified ? <Dashboard /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
