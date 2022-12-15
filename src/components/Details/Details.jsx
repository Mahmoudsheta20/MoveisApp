import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../data/axios";
import YouTube from "react-youtube";
import { play, group } from "../../assets";
import "./Details.css";
const Details = () => {
  const { id, category } = useParams();
  console.log(id, category);
  const api_key = "011a19f7aef4b91e754cc83d49c0bcd9";
  const base_url = "https://image.tmdb.org/t/p/original/";

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [youtubeId, setyoutubeId] = useState([]);
  const [trailr, settrailer] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const reqeust = await axios.get(
        `/${category}/${id}?api_key=${api_key}&language=en-US`
      );
      const trailer = await axios.get(
        `/${category}/${id}/videos?api_key=${api_key}&language=en-US`
      );

      setData(reqeust.data);
      setLoading(false);
      setyoutubeId(
        trailer.data.lenght < 1
          ? trailer.data.results[1]["key"]
          : trailer.data.results[0]["key"]
      );
    }
    fetchData();
  }, [id]);

  const opts = {
    height: "650",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="details">
      <div className={`${loading ? "loader_page" : "loader_page_head"}`}>
        <div className={`${loading ? "loader" : "loader_head"}`}></div>
      </div>
      <div className="detail_background">
        <img src={`${base_url}${data.backdrop_path}`} alt="" />
      </div>
      <div className="details_img">
        <h2>{data?.title || data?.name || data?.original_name}</h2>
      </div>
      <div className="details_control">
        <button className="play" onClick={() => settrailer(false)}>
          {" "}
          <img src={play} alt="" /> <span>play</span>{" "}
        </button>

        <button className="plus">
          <span>+</span>
        </button>
        <button className="groub">
          <img src={group} alt="" />
        </button>
        <div className="rate">
          <p>{Math.floor(data.vote_average)}</p>
        </div>
      </div>
      <div className="descrption">
        <p>{data.overview}</p>
      </div>
      <div className={`${trailr ? "trailer_activ" : "trailer"}`}>
        <button onClick={() => settrailer(true)} className="exit">
          X
        </button>
        {!trailr && (
          <YouTube className="youtube" opts={opts} videoId={youtubeId} />
        )}
      </div>
    </div>
  );
};

export default Details;
