import React from "react";
import Footer from "../../partials/Footer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import ProductsManager from "../../manages/ProductsManager";

function Admin() {
  return (
    
    <div style={{ fontFamily: "Arial", margin: "20px"}}>
      <h1 style={{ color: "#1e90ff", marginBottom: "1em" }}>Admin Dashboard</h1>
      <nav>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li style={{ display: "inline-block", marginRight: "1em" }}>
            <Link to="/admin/document" style={{ color: "#333", textDecoration: "none", padding: "0.5em 1em" }}>
              Document Management
            </Link>
          </li>
          <li style={{ display: "inline-block", marginRight: "1em" }}>
            <Link to="/admin/products" style={{ color: "#333", textDecoration: "none", padding: "0.5em 1em" }}>
              Product Management
            </Link>
          </li>
          <li style={{ display: "inline-block", marginRight: "1em" }}>
            <Link to="/admin/statistics" style={{ color: "#333", textDecoration: "none", padding: "0.5em 1em" }}>
              Statistics
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
      <Footer/>
    </div>
  );
}

function AdminRoutes() {
  return (
    <>
      {/* <Route path="users" element={<UsersManager />} /> */}
      <Route path="products" element={<ProductsManager />} />
    </>
  );
}

export default Admin;
