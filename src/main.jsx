import React from "react";
import { createRoot } from "react-dom/client";
import TheStandardWebsite from "./App.jsx";
import "./index.css";

const root = document.getElementById("root");

createRoot(root).render(
  <React.StrictMode>
    <TheStandardWebsite />
  </React.StrictMode>
);
