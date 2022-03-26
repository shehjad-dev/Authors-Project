import React, { useContext, useEffect, useState } from "react";
import FavAuthorsContext from "../Contexts/FavAuthorsContext";
import ListItemComponent from "./ListItemComponent";

const FavAuthorsList = () => {
  const { favList, setFavList } = useContext(FavAuthorsContext);

  useEffect(() => {
    let localStorageArr = { ...JSON.parse(localStorage.getItem("items")) }.data;
    setFavList([...localStorageArr]);
  }, []);

  return (
    <div className="">
      <h4>Fav List</h4>
      {favList.length > 0 ? (
        <div className="gridContainer">
          {favList.map((item) => (
            <ListItemComponent key={item._id} id={item._id} value={item} />
          ))}
        </div>
      ) : (
        <div className="errorBox" style={{ fontSize: "18px" }}>
          There are no favourite authors. Please add to see any
        </div>
      )}
    </div>
  );
};

export default FavAuthorsList;
