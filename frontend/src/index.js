import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import store from "./app/store";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

// bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
