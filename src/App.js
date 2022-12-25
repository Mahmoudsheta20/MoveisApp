import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  Details,
  Navbar,
  Search,
  Series,
  Watchlist,
  Movies,
} from "./components";
import { requestsMovies, requestsSeries } from "./data/requests";
import { useStateValue } from "./context/StateProvider";
import "./App.css";
import { Home, NotFound, Login } from "./pages";
function App() {
  const [{ user }] = useStateValue();

  return (
    <div>
      <Navbar />
      <Toaster position="top-right" />
      {user ? (
        <Routes>
          <Route path="*" element={<NotFound />} />

          <Route path="/" element={<Home />} />
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
