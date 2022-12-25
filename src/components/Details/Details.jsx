import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { play, group } from "../../assets";
import "./Details.css";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { addDoc } from "firebase/firestore";
import { colRef } from "../../data/firebase";
import { IoAddSharp, IoClose, IoCheckmarkDone } from "react-icons/io5";
import { base_url } from "../../data/requests";
import {
  fetchDataSeasons,
  fetchDataDatails,
  getDataTrailer,
} from "../../data/requestsFunction";
import { getWatchList } from "../../data/firebaseFunction";

const Details = () => {
  const [{ user }, dispatch] = useStateValue();
  const { id, category } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [youtubeId, setyoutubeId] = useState([]);
  const [trailer, setTrailer] = useState(false);
  const [seasons, setseasons] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const state = [];
  const [watchlist, setwatchlist] = useState({});
  const isLargeRow = false;

  useEffect(() => {
    fetchDataDatails(category, id)
      .then((data) => {
        setData([data]);
      })
      .catch((error) => console.log(error));

    getWatchList()
      .then((data) =>
        data.map((doc) => state.push({ ...doc.data(), idFirebase: doc.id }))
      )
      .then(() => {
        const filter = state.filter((item) => item.userId === user.uid);
        const find = filter.find((item) => item.id == id);

        setwatchlist(find);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, category, user, refresh]);

  console.log(state);

  const addWatchList = (item) => {
    if (!watchlist) {
      addDoc(colRef, {
        ...item,
        userId: user.uid,
      }).catch((error) => console.log(error));
      setrefresh(true);
      toast.success(
        `${item?.title || item?.name || item?.original_name} Add to WatchList`
      );
    }
  };

  const getTrailer = async () => {
    getDataTrailer(category, id)
      .then((data) => {
        setyoutubeId(
          data.lenght < 1 ? data.results[1]["key"] : data.results[0]["key"]
        );
        setTrailer(true);
      })
      .catch((error) => console.log(error));
  };

  const getAddSesson = (seasonNum) => {
    if (category === "tv") {
      fetchDataSeasons(id, seasonNum)
        .then((data) => setseasons([data]))
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="details">
      <div className="deatils_right">
        {loading && (
          <div className={`loader_page`}>
            <div className={`loader`}></div>
          </div>
        )}

        {data.map((item) => (
          <>
            <div className="detail_background">
              <img
                src={`${base_url}${
                  item.backdrop_path ? item.backdrop_path : item.poster_path
                }`}
                alt=""
              />
            </div>
            <div className="details_img">
              {item.networks && (
                <div className="logo_path">
                  <img
                    src={`${base_url}${item.networks[0].logo_path}`}
                    alt=""
                  />
                </div>
              )}

              <h2>{item?.title || item?.name || item?.original_name}</h2>
            </div>
            <div className="details_control">
              <button className="play" onClick={getTrailer}>
                {" "}
                <img src={play} alt="" /> <span>play</span>{" "}
              </button>

              <button
                className={`plus activ`}
                onClick={() => addWatchList(item)}
              >
                {watchlist ? (
                  <span>
                    <IoCheckmarkDone />
                  </span>
                ) : (
                  <span>
                    <IoAddSharp />
                  </span>
                )}
              </button>
              <button className="groub">
                <img src={group} alt="" />
              </button>
              <div className="rate">
                <p>{Math.floor(item.vote_average)}</p>
              </div>
            </div>
            <div className="descrption">
              <p>{item.overview}</p>
            </div>
            {item.seasons && (
              <div className="deatils__sesons">
                {item.seasons.map((item) => (
                  <>
                    {item.poster_path && (
                      <div
                        className="deatils__hover"
                        key={item.id}
                        onClick={() => getAddSesson(item.season_number)}
                      >
                        <img
                          className={`row_postr ${
                            isLargeRow && "row_posterlarg"
                          }`}
                          src={`${base_url}${item.poster_path}`}
                          alt={item.name}
                        />
                      </div>
                    )}
                  </>
                ))}
              </div>
            )}

            {trailer && (
              <div className="overflow__trailer">
                <div className={`trailer`}>
                  <div className="close">
                    <button onClick={() => setTrailer(false)} className="exit">
                      <IoClose />
                    </button>
                  </div>

                  {youtubeId && (
                    <YouTube
                      className="youtube"
                      opts={{
                        height: "650",
                        width: "640",
                        playerVars: {
                          autoplay: 1,
                        },
                      }}
                      videoId={youtubeId}
                    />
                  )}
                </div>
              </div>
            )}
          </>
        ))}
      </div>

      <>
        {seasons && (
          <div className="episodes__deatils">
            {seasons.map((item) =>
              item.episodes.map((doc) => (
                <div key={doc.id} className="episodes__image">
                  <img
                    className={`row_postr ${isLargeRow && "row_posterlarg"}`}
                    src={`${base_url}${doc.still_path}`}
                    alt={doc.name}
                    key={doc.id}
                  />

                  <p>{doc.name}</p>
                </div>
              ))
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default Details;
