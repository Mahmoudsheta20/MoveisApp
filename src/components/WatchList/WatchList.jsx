import React, { useState, useEffect } from "react";
import { useStateValue } from "../../context/StateProvider";
import { Link } from "react-router-dom";
import "./WatchList.css";
import { IoAlert, IoTrash } from "react-icons/io5";
import { deleteDoc, doc, getDocs } from "firebase/firestore";
import { db, q } from "../../data/firebase";
import { base_url } from "../../data/requests";
const WatchList = () => {
  const [loading, setLoading] = useState(true);
  const [{ user, watchList }, dispatch] = useStateValue();
  const isLargeRow = true;
  const [state, setstate] = useState([]);

  const handelFilter = () => {
    const test = getDocs(q);
    test
      .then((test) => {
        test.docs.map((doc) => {
          state.push({ ...doc.data(), idFirebase: doc.id });
        });
      })
      .then(() => {
        const filter = state.filter((item) => item.userId === user.uid);
        setstate(filter);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(true);
      });
  };

  useEffect(() => {
    handelFilter();
  }, []);

  const deleteData = (item) => {
    const filter = state.filter((data) => data.idFirebase !== item);
    console.log(filter);
    setstate(filter);

    const docRef = doc(db, "watchList", item);
    deleteDoc(docRef);
  };

  console.log(watchList);
  return (
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
                    <p onClick={() => deleteData(item.idFirebase)}>
                      <IoTrash />
                    </p>
                    <Link to={`/details/movie/${item.id}`}>
                      <p>
                        <IoAlert />
                      </p>
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
  );
};

export default WatchList;
