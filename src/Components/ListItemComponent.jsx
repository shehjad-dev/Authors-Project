import React, { useContext } from "react";
import FavAuthorsContext from "../Contexts/FavAuthorsContext";

const ListItemComponent = ({ value, id }) => {
  const { favList, setFavList } = useContext(FavAuthorsContext);

  const addToFavList = async (name, bio, link, id) => {
    let isDuplicate = false;
    const oldArr = [...favList];
    if (oldArr.length === 0) {
      setFavList([...oldArr, { name, bio, link, _id: id, isFav: true }]);
      localStorage.setItem(
        "items",
        JSON.stringify({
          data: [...oldArr, { name, bio, link, _id: id, isFav: true }],
        })
      );
      return;
    }
    oldArr.forEach((item) => {
      if (item._id === id) {
        isDuplicate = true;
      }
    });

    if (isDuplicate === false) {
      setFavList([...oldArr, { name, bio, link, _id: id, isFav: true }]);
      localStorage.setItem(
        "items",
        JSON.stringify({
          data: [...oldArr, { name, bio, link, _id: id, isFav: true }],
        })
      );
    }
    //return;
  };
  const removeFromFavList = async (id) => {
    let localStorageArr = { ...JSON.parse(localStorage.getItem("items")) }.data;
    //console.log({ ...JSON.parse(localStorage.getItem("items")) }.data);
    let itemIndex = null;
    console.log(`Remove this ${id}`);
    const oldArr = [...favList];
    for (let i = 0; i < oldArr.length; i++) {
      if (oldArr[i]._id === id) {
        itemIndex = i;
      }
    }
    if (typeof itemIndex === "number") {
      oldArr.splice(itemIndex, 1);
      localStorageArr.splice(itemIndex, 1);
    }
    setFavList(oldArr);
    localStorage.setItem(
      "items",
      JSON.stringify({
        data: [...localStorageArr],
      })
    );
  };
  return (
    <div className="authorCardBox">
      <div>
        <b>Name:</b> {value.name}
      </div>
      <div>
        <b>Bio:</b>

        {value.bio}
      </div>
      <div>
        <b>Link:</b>
        <a href={value.link} target="_blank">
          {value.link}
        </a>
      </div>
      {/* <div>Id: {id}</div> */}
      {value?.isFav ? (
        <button className="removeBtn" onClick={() => removeFromFavList(id)}>
          Remove
        </button>
      ) : (
        <button
          className="addBtn"
          onClick={() => addToFavList(value.name, value.bio, value.link, id)}
        >
          Add
        </button>
      )}
    </div>
  );
};

export default ListItemComponent;
