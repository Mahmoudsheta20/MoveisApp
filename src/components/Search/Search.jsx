import React, { useState, useEffect } from "react";
import { IoSearch, IoClose } from "react-icons/io5";
import "./Search.css";
import { base_url } from "../../data/requests";
import { Link } from "react-router-dom";
import { getDataSearch } from "../../data/requestsFunction";

const Search = () => {
  const [search, setsearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const isLargeRow = true;
  useEffect(() => {
    getDataSearch(search)
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setData(false);
        console.log(error.messages);
        setLoading(true);
      });

    if (!search) {
      setData([]);
    }
  }, [search]);

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
        {data ? (
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
