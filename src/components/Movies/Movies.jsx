import React, { useEffect, useState } from "react";
import "./Movies.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "../../data/axios";
import { Link } from "react-router-dom";

const base_url = "https://image.tmdb.org/t/p/original/";
const Movies = ({ titel, fetchUrl }) => {
  const [movise, setmovise] = useState([]);
  const [state, setstate] = useState(true);
  const [isLargeRow, setisLargeRow] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const requst = await axios.get(fetchUrl);
      setmovise(requst.data.results);
      setstate(false);

      return requst;
    }
    fetchData();

    if (titel === "Trending") {
      setisLargeRow(true);
    }
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className={`${state ? "loader_page" : "loader_page_head"}`}>
        <div className={`${state ? "loader" : "loader_head"}`}></div>
      </div>
      {movise && (
        <div className="row">
          <h2>{titel}</h2>

          <Slider {...settings}>
            {movise.map((movie) => (
              <div key={movie.id} className="row_name">
                <Link to={`/details/movie/${movie.id}`}>
                  <img
                    className={`row_postr ${isLargeRow && "row_posterlarg"}`}
                    src={`${base_url}${
                      isLargeRow ? movie.poster_path : movie.backdrop_path
                    }`}
                    alt={movie.name}
                    key={movie.id}
                  />
                </Link>

                {isLargeRow ? (
                  <p></p>
                ) : (
                  <p>{movie?.title || movie?.name || movie?.original_name}</p>
                )}
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};

export default Movies;
