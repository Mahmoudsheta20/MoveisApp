import React, { useState, useEffect } from "react";
import { useStateValue } from "../../context/StateProvider";
import { Link } from "react-router-dom";
import "./WatchList.css";
import { IoAlert, IoTrash } from "react-icons/io5";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../data/firebase";
import { base_url } from "../../data/requests";
import { getWatchList } from "../../data/firebaseFunction";
import { actionType } from "../../context/reducer";
const WatchList = () => {
  const [loading, setLoading] = useState(true);
  const [{ user, watchList, watchListAll }, dispatch] = useStateValue();
  const isLargeRow = true;
  const [state, setstate] = useState([]);

  useEffect(() => {
    getWatchList()
      .then((data) =>
        data.map((doc) => state.push({ ...doc.data(), idFirebase: doc.id }))
      )
      .then(() => {
        const filter = state.filter((item) => item.userId === user.uid);
        setstate(filter);
        setLoading(false);

        dispatch({
          type: actionType.SET_ALL_WATCHLIST,
          watchListAll: filter,
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(true);
      });
  }, [user]);

  console.log(watchListAll);

  const deleteData = (item) => {
    const filter = state.filter((data) => data.idFirebase !== item);
    console.log(filter);
    setstate(filter);

    const docRef = doc(db, "watchList", item);
    deleteDoc(docRef);
  };

  console.log(watchList);
  return (
    <div className="watchList__main">
      <h2>watchList</h2>
      <div className="watchList">
        {loading ? (
          <div className="watchList__Loading">
            <div className="lds-ripple">
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <>
            {state.map((item) => (
              <div key={item.id} className="row_name">
                <div className="watchList__image">
                  <div className="watchlist__overlay">
                    <div className="icons">
                      <div
                        className="icons__p"
                        onClick={() => deleteData(item.idFirebase)}
                      >
                        <IoTrash />
                      </div>
                      <Link to={`/details/movie/${item.id}`}>
                        <div className="icons__p">
                          <IoAlert />
                        </div>
                      </Link>
                    </div>
                  </div>

                  <img
                    className={`row__image ${isLargeRow && "row_imagelarg"}`}
                    src={`${base_url}${
                      isLargeRow ? item.poster_path : item.backdrop_path
                    }`}
                    alt={item.name}
                    key={item.id}
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default WatchList;
