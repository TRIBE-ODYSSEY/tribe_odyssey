import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// Utworzenie korzenia i renderowanie aplikacji
const container = document.getElementById("root");
if (container) {
    const root = createRoot(container);
    root.render(_jsxs(React.StrictMode, { children: [_jsx(App, {}), " "] }));
}
