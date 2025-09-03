import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";


// Bootstrap CSS & JS (bundle contains Popper for dropdowns)
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";


// Theme overrides
import "./styles/theme.css";


import App from "./App.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
<BrowserRouter>
<App />
</BrowserRouter>
</React.StrictMode>
);