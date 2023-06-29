import React from "react"
import ReactDOM, { createRoot } from "react-dom/client";
import App from "./Components/App/App";
import "./index.css";

const element = document.getElementById('root');
const root = ReactDOM.createRoot(element);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)