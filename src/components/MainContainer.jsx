import React from "react";
import requests, { requestsMovies, requestsSeries } from "../data/requests";
import { Movies, Series, TopSlider, Viwer } from "./index";
import "./index.css";

const MainContainer = () => {
  return (
    <div>
      <div className="home">
        <TopSlider categroy={requests.fetchTopRated} />
        <Viwer />

        {requestsMovies.map((item) => (
          <Movies
            key={item.title}
            isLargeRow
            titel={item.title}
            fetchUrl={item.URL}
          />
        ))}
        {requestsSeries.map((item) => (
          <Series
            key={item.title}
            isLargeRow
            titel={item.title}
            fetchUrl={item.URL}
          />
        ))}
      </div>
    </div>
  );
};

export default MainContainer;
