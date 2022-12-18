import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoSearch, IoClose } from "react-icons/io5";
import "./Search.css";
import { api_key, base_url } from "../../data/requests";
import axios from "../../data/axios";
import { Link } from "react-router-dom";

const Search = () => {
  const [search, setsearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const isLargeRow = true;
  useEffect(() => {
    async function fetchData() {
      try {
        const reqeust = await axios.get(
          `/search/multi?api_key=${api_key}&language=en-US&query=${search}&page=1&include_adult=false`
        );
        console.log(reqeust.status);
        setData(reqeust.data.results);
        setLoading(false);
      } catch (error) {
        console.log(error.messages);
        setLoading(true);
      }
    }
    fetchData();

    if (!search) {
      setData([]);
    }
  }, [search]);
  console.log(data);
  return (
    <div className="search">
      <div className="serach__input">
        <input
          type="search"
          value={search}
          placeholder="Search by title, character, or genre"
          onChange={(e) => setsearch(e.target.value)}
        />
        {search ? (
          <p className="icon" onClick={() => setsearch("")}>
            <IoClose />{" "}
          </p>
        ) : (
          <p className="icon">
            <IoSearch />
          </p>
        )}
      </div>
      <div className="search__main">
        {data.length ? (
          <div className="search__result">
            {loading ? (
              <div className="watchList__Loading">
                <div className="lds-ripple">
                  <div></div>
                  <div></div>
                </div>
              </div>
            ) : (
              <>
                {" "}
                {data.map((movie) => (
                  <>
                    {movie.poster_path && (
                      <div key={movie.id} className="row_search">
                        <Link to={`/details/movie/${movie.id}`}>
                          <img
                            className={`row_postr ${
                              isLargeRow && "row_posterlarg_search"
                            }`}
                            src={`${base_url}${
                              isLargeRow
                                ? movie.poster_path
                                : movie.backdrop_path
                            }`}
                            alt={movie.name}
                            key={movie.id}
                          />
                        </Link>

                        {isLargeRow ? (
                          <p></p>
                        ) : (
                          <p>
                            {movie?.title ||
                              movie?.name ||
                              movie?.original_name}
                          </p>
                        )}
                      </div>
                    )}
                  </>
                ))}
              </>
            )}
          </div>
        ) : (
          <div className="result__fail">
            <p>no results</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
