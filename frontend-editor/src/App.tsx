import "./App.css";
import React, { useEffect, useState } from "react";
import { OndcTitle } from "./components/title";
import GitLogin from "./pages/login-page";
import { HomePage } from "./pages/home-page";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { BiPlayCircle } from "react-icons/bi";
import LoadingButton from "./components/ui/loadingButton";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, []);
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const buildGuide = () => {
    console.log("Building guide");
  };
  const waitOneSecond = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    throw new Error("Failed to build");
  };

  return (
    <>
      <div className={darkMode ? "dark" : ""}>
        <OndcTitle>
          <LoadingButton onClick={waitOneSecond} buttonText="BUILD" />
          {/* <LoadingButton onClick={waitOneSecond} buttonText="RAISE PR" /> */}
        </OndcTitle>

        <Routes>
          <Route path="/login" element={<GitLogin />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="colored"
        />
      </div>
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
