import React, { useEffect } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";

import "aos/dist/aos.css";
import "./css/style.css";

import AOS from "aos";

import Home from "./pages/Home";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import Wallet from "./pages/Wallet";
import History from "./pages/History";
import Markets from "./pages/Markets";
import ProductsManager from "./manages/ProductsManager";
import Admin from "./pages/admin/Admin";
import Documnet from "./pages/Document";
import AdminDoc from "./pages/admin/AminDoc";
import DangNhap from "./pages/DangNhap";
import AboutUs from "./pages/AboutUs";
function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 600,
      easing: "ease-out-sine",
    });
  });

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  const token = localStorage.getItem("token");
  if (location.pathname.startsWith("/wallet") && !token) {
    window.location.href = "/signin";
  }

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signin" element={<DangNhap />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/history" element={<History />} />
        <Route path="/features" element={<Markets />} />
        <Route path="admin/products" element={<ProductsManager />}></Route>
        <Route path="admin/document" element={<AdminDoc/>}></Route>
        <Route path="/admin" element={<Admin />} />
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/document" element={<Documnet />}></Route>
      </Routes>
    </>
  );
}

export default App;
