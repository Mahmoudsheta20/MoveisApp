import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TopSlider.css";
import axios from "../../data/axios";
import { Link } from "react-router-dom";
import { base_url } from "../../data/requests";
const TopSlider = ({ categroy }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,

    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  const [movise, setmovise] = useState([]);
  const [state, setstate] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(categroy);
      setmovise(request.data.results);
      setstate(false);

      return request;
    }
    fetchData();
  }, []);

  return (
    <>
      <Slider className="slider" {...settings}>
        {movise.map((movie) => (
          <Link key={movie.id} to={`/details/movie/${movie.id}`}>
            <div key={movie.id} className="slider_wrappr">
              <img src={`${base_url}${movie.backdrop_path}`} alt="" />
            </div>
          </Link>
        ))}
      </Slider>
    </>
  );
};

export default TopSlider;
