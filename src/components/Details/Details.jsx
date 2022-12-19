import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../data/axios";
import YouTube from "react-youtube";
import { play, group } from "../../assets";
import "./Details.css";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { addDoc, getDocs } from "firebase/firestore";
import { colRef, q } from "../../data/firebase";
import { IoCheckmarkSharp, IoAddSharp } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Details = () => {
  const [{ watchList, user }, dispatch] = useStateValue();
  const { id, category } = useParams();
  const api_key = "011a19f7aef4b91e754cc83d49c0bcd9";
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [youtubeId, setyoutubeId] = useState([]);
  const [trailr, settrailer] = useState(true);
  const [watchlist, setwatchList] = useState([]);
  const [seasons, setseasons] = useState([]);
  const [episodes, setepisodes] = useState([]);
  const [seasonNum, setseasonNum] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const reqeust = await axios.get(
        `/${category}/${id}?api_key=${api_key}&language=en-US`
      );
      const trailer = await axios.get(
        `/${category}/${id}/videos?api_key=${api_key}&language=en-US`
      );

      setData([reqeust.data]);
      setyoutubeId(
        trailer.data.lenght < 1
          ? trailer.data.results[1]["key"]
          : trailer.data.results[0]["key"]
      );
      setLoading(false);

      // const test = getDocs(q);
      // test
      //   .then((test) => {
      //     test.docs.map((doc) => {
      //       watchlist.push({ ...doc.data(), idFirebase: doc.id });
      //     });
      //   })
      //   .then(() => {
      //     const filter = watchlist.filter((item) => item.userId === user.uid);
      //     setwatchList(filter);
      //     const findList = watchlist.find((i) => i.id === data.id);

      //     setwatchList(findList);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }

    async function fetchDataSeasons() {
      try {
        const seasonsreq = await axios.get(
          `/tv/${id}/season/${seasonNum}?api_key=${api_key}&language=en-US`
        );
        setseasons([seasonsreq.data]);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
    fetchDataSeasons();
  }, [seasonNum, id]);

  const opts = {
    height: "650",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
  };

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
  console.log(watchlist);
  console.log(data);
  console.log(seasons);
  const isLargeRow = false;

  return (
    <div className="details">
      <div className="deatils_right">
        <div className={`${loading ? "loader_page" : "loader_page_head"}`}>
          <div className={`${loading ? "loader" : "loader_head"}`}></div>
        </div>
        {data.map((item) => (
          <>
            <div className="detail_background">
              <img src={`${base_url}${item.backdrop_path}`} alt="" />
            </div>
            <div className="details_img">
              <h2>{item?.title || item?.name || item?.original_name}</h2>
            </div>
            <div className="details_control">
              <button className="play" onClick={() => settrailer(false)}>
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

            <div className="deatils__sesons">
              {item.seasons.map((item) => (
                <div onClick={() => setseasonNum(item.season_number)}>
                  <img
                    className={`row_postr ${isLargeRow && "row_posterlarg"}`}
                    src={`${base_url}${item.poster_path}`}
                    alt={item.name}
                    key={item.id}
                  />
                </div>
              ))}
            </div>

            <div className={`${trailr ? "trailer_activ" : "trailer"}`}>
              <button onClick={() => settrailer(true)} className="exit">
                X
              </button>
              {!trailr && (
                <YouTube className="youtube" opts={opts} videoId={youtubeId} />
              )}
            </div>
          </>
        ))}
      </div>
      {seasonNum && (
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
      )}
    </div>
  );
};

export default Details;
