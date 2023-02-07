import React, { useState } from "react";
import "./App.css";
import ProductPage from "./pages/ProductPage";
import DynamicForm from "./pages/DynamicForm";
import { theme } from "./app/theme";
import { Link, Route, Routes } from "react-router-dom";
import { CssBaseline, Grid, Paper, ThemeProvider } from "@mui/material";

function App() {
  return (
    <div>
      <CssBaseline />
      <ThemeProvider theme={theme}>
            <Routes>
              <Route path="/" element={<ProductPage />}></Route>
              <Route
                path="/product/:serviceAgreementId"
                element={<DynamicForm />}
              ></Route>
            </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
