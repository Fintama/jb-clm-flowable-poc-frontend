import React, { useState } from "react";
import "./App.css";
import ProductPage from "./pages/ProductPage";
import DynamicForm from "./pages/DynamicForm";
import { theme } from "./app/theme";
import { Link, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <Link className="link" to="/">
        Home
      </Link>
      <Link className="link" to="/product">
        Products
      </Link>
      <Routes>
        <Route path="/product" element={<ProductPage />}></Route>
        <Route path="/product/:serviceAgreementId" element={<DynamicForm />}></Route>
      </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
