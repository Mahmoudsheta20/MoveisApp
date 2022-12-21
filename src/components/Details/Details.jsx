import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { play, group } from "../../assets";
import "./Details.css";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { addDoc } from "firebase/firestore";
import { colRef } from "../../data/firebase";
import { IoCheckmarkSharp, IoAddSharp, IoClose } from "react-icons/io5";
import { base_url } from "../../data/requests";
import {
  fetchDataSeasons,
  fetchDataDatails,
  getDataTrailer,
} from "../../data/requestsFunction";
const Details = () => {
  const [{ watchList, user }, dispatch] = useStateValue();
  const { id, category } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [youtubeId, setyoutubeId] = useState([]);
  const [trailer, setTrailer] = useState(false);
  const [watchlist, setwatchList] = useState([]);
  const [seasons, setseasons] = useState([]);
  const [seasonNum, setseasonNum] = useState(null);
  useEffect(() => {
    fetchDataDatails(category, id)
      .then((data) => {
        setData([data]);
        setLoading(false);
      })
      .catch((error) => console.log(error));

    if (category === "tv") {
      fetchDataSeasons(id, seasonNum).then((data) => setseasons([data]));
    }
  }, [seasonNum, id]);

  const addWatchList = (item) => {
    const find = watchList.find((i) => i.id === item.id);
    if (!find) {
      addDoc(colRef, {
        ...item,
        userId: user.uid,
      });

      dispatch({
        type: actionType.SET_WATCHLIST,
        watchList: item,
      });
    }
  };

  const find = watchList.find((i) => i.id === data.id);
  const isLargeRow = false;

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
                className={`plus ${find ? "activ" : ""}`}
                onClick={() => addWatchList(data)}
              >
                {watchlist.length ? (
                  <span>
                    <IoCheckmarkSharp
                      style={{ color: "green" }}
                      className="icon"
                    />
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
                        onClick={() => setseasonNum(item.season_number)}
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
      {seasonNum !== null ? (
        <>
          {seasons.length && (
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
      ) : (
        <></>
      )}
    </div>
  );
};

export default Details;
