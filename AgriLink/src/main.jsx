import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./ContextFiles/AuthProvider.jsx";
import EntityProvider from "./ContextFiles/EntityProvider.jsx";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
       <AuthProvider>  
        <EntityProvider>
        <App />

        </EntityProvider>
       </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
