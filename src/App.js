import { Route, Routes, useLocation } from "react-router-dom";
import {
  Details,
  MainContainer,
  Navbar,
  Search,
  Series,
  Watchlist,
} from "./components";
import { requestsMovies, requestsSeries } from "./data/requests";
import { useStateValue } from "./context/StateProvider";

import "./App.css";
import { Movies } from "./components/index";
import { NotFound } from "./pages";
import Login from "./pages/Login";
function App() {
  const location = useLocation();
  // console.log(location);
  const [{ user }, dispatch] = useStateValue();

  return (
    <div>
      <Navbar />

      {user ? (
        <Routes>
          <Route path="*" element={<NotFound />} />

          <Route path="/" element={<MainContainer />} />
          <Route path="/details/:category/:id" element={<Details />} />
          <Route
            path="/movie"
            element={
              <div className="home_route">
                <h2 className="home__heading">Movies</h2>
                {requestsMovies.map((item) => (
                  <Movies
                    key={item.title}
                    isLargeRow
                    titel={item.title}
                    fetchUrl={item.URL}
                  />
                ))}
              </div>
            }
          />

          <Route
            path="/series"
            element={
              <div className="home_route">
                <h2 className="home__heading">Series</h2>

                {requestsSeries.map((item) => (
                  <Series
                    key={item.title}
                    isLargeRow
                    titel={item.title}
                    fetchUrl={item.URL}
                  />
                ))}
              </div>
            }
          />
          <Route path="/search" element={<Search />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      ) : (
        <Routes>
          <Route index path="/*" element={<Login />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
