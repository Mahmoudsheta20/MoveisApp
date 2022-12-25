import React from "react";
import requests, { requestsMovies, requestsSeries } from "../data/requests";
import { Movies, Series, Viwer, TopSlider } from "../components";
import "./index.css";

const Home = () => {
  return (
    <div>
      <div className="home">
        <TopSlider categroy={requests.fetchTopRated} />
        <Viwer />
        <h2 className="home__heading">Movies</h2>

        {requestsMovies.map((item) => (
          <Movies key={item.title} titel={item.title} fetchUrl={item.URL} />
        ))}
        <h2 className="home__heading">Series</h2>

        {requestsSeries.map((item) => (
          <Series key={item.title} titel={item.title} fetchUrl={item.URL} />
        ))}
      </div>
    </div>
  );
};

export default Home;
