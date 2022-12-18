import { Route, Routes } from "react-router-dom";
import {
  Details,
  MainContainer,
  Navbar,
  Search,
  Series,
  Watchlist,
} from "./components";
import { requestsMovies } from "./data/requests";

import "./App.css";
import { Movies } from "./components/index";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/*" element={<MainContainer />} />
        <Route path="/details/:category/:id" element={<Details />} />
        <Route
          path="/movie"
          element={
            <>
              <h2>Movies</h2>
              {requestsMovies.map((item) => (
                <Movies
                  key={item.title}
                  isLargeRow
                  titel={item.title}
                  fetchUrl={item.URL}
                />
              ))}
            </>
          }
        />

        <Route
          path="/series"
          element={
            <>
              <h2>Series</h2>
              {requestsMovies.map((item) => (
                <Series
                  key={item.title}
                  isLargeRow
                  titel={item.title}
                  fetchUrl={item.URL}
                />
              ))}
            </>
          }
        />
        <Route path="/search" element={<Search />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </div>
  );
}

export default App;
