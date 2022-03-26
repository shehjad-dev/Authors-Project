import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AuthorsList from "./Components/AuthorsList";
import FavAuthorsList from "./Components/FavAuthorsList";
import HomePage from "./Components/HomePage";

import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="authors" element={<AuthorsList />} />
        <Route path="favauthors" element={<FavAuthorsList />} />
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route
        path="*"
        element={
          <main className="errorBox">
            <p>404 error</p>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
