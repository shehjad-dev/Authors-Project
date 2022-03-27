import { useState, useEffect } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import FavAuthorsContext from "./Contexts/FavAuthorsContext";
import "./App.css";

const App = () => {
  const [favList, setFavList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(0);

  return (
    <div className="whole">
      <FavAuthorsContext.Provider
        value={{
          favList,
          setFavList,
          skip,
          setSkip,
          currentPage,
          setCurrentPage,
        }}
      >
        <div className="navBar">
          <nav>
            <NavLink
              to="/authors"
              style={({ isActive }) => {
                return {
                  color: isActive ? "white" : "black",
                  backgroundColor: isActive ? "black" : "",
                };
              }}
            >
              Authors
            </NavLink>
            <NavLink
              to="/favauthors"
              style={({ isActive }) => {
                return {
                  color: isActive ? "white" : "black",
                  backgroundColor: isActive ? "black" : "",
                };
              }}
            >
              Favourite Authors
            </NavLink>
            <NavLink
              to="/"
              style={({ isActive }) => {
                return {
                  color: isActive ? "white" : "black",
                  backgroundColor: isActive ? "black" : "",
                  position: "absolute",
                  bottom: "0",
                  left: "",
                };
              }}
            >
              Home 🏠
            </NavLink>
          </nav>
        </div>
        <div className="ListBox">
          <Outlet />
        </div>
      </FavAuthorsContext.Provider>
    </div>
  );
};

export default App;
