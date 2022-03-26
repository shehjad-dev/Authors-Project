import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import axios from "axios";
import ListItemComponent from "./ListItemComponent";
import FavAuthorsContext from "../Contexts/FavAuthorsContext";

const AuthorsList = () => {
  const { favList, setFavList, skip, setSkip, currentPage, setCurrentPage } =
    useContext(FavAuthorsContext);
  /*   const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(0); */
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [authorsList, setAuthorsList] = useState([]);

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
    setSkip(skip + 3);
  };
  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
    setSkip(skip - 3);
    if (currentPage < 1) {
      setCurrentPage(1);
    }
  };
  useLayoutEffect(() => {
    let localStorageArr = { ...JSON.parse(localStorage.getItem("items")) }.data;
    setFavList([...localStorageArr]);
  }, []);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://api.quotable.io/authors?limit=3&skip=${skip}`)
      .then((res) => {
        let oldArr = [];
        oldArr = [...res.data.results];
        let newArr = [];
        let favIdList = [];
        if (favList.length > 0) {
          favList.forEach((item) => {
            favIdList.push(item._id);
          });

          oldArr.forEach((item) => {
            if (favIdList.indexOf(item._id) !== -1) {
              newArr.push({ ...item, isFav: true });
            } else {
              newArr.push({ ...item, isFav: false });
            }
          });
        } else {
          oldArr.forEach((item) => {
            newArr.push({ ...item, isFav: false });
          });
        }

        setAuthorsList(newArr);
      })
      .catch((err) => {
        if (err) {
          setErrorState(true);
          console.log(err.message);
        }
      });

    setIsLoading(false);
  }, [currentPage, favList]);

  return (
    <div>
      {isLoading && (
        <div className="loader-container">
          <div class="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      {errorState && <div className="errorBox">There has been an error</div>}
      {!errorState && !isLoading && (
        <>
          <h4 onClick={() => console.log(authorsList)}>Authors</h4>
          <div className="gridContainer">
            {authorsList.map((item) => (
              <ListItemComponent key={item._id} id={item._id} value={item} />
            ))}
          </div>

          <div className="paginationBox">
            {currentPage !== 1 && (
              <button onClick={() => handlePrevBtn()}>{"<"}</button>
            )}

            <span>
              <b>Page: {currentPage}</b>
            </span>
            <button onClick={() => handleNextBtn()}>{">"}</button>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthorsList;
