export const api_key = "011a19f7aef4b91e754cc83d49c0bcd9";

const requests = {
  fetchTrending: `/trending/movie/week?api_key=${api_key}&language=en-US`,
  fetchTrendingTv: `/trending/tv/week?api_key=${api_key}&language=en-US`,
  fetchTrending_movies: `/trending/movie/week?api_key=${api_key}&language=en-US`,
  fetchTopRated: `/movie/top_rated?api_key=${api_key}&language=en-US`,
  fetchNetflix: `/discover/movie?api_key=${api_key}&with_networks=213`,
  fetch_action: `/discover/movie?api_key=${api_key}&with_genres=28`,
  fetch_comdy: `/discover/movie?api_key=${api_key}&with_genres=35`,
  fetch_horror: `/discover/movie?api_key=${api_key}&with_genres=27`,
  fetch_documantry: `/discover/movie?api_key=${api_key}&with_genres=99`,
  fetchActionTv: `/discover/tv?api_key=${api_key}&with_genres=28`,
  fetchTopRatedTv: `/tv/top_rated?api_key=${api_key}&language=en-US`,
  fetchComedyTv: `/discover/tv?api_key=${api_key}&with_genres=35`,
  fetchNetflixOriginals: `/discover/tv?api_key=${api_key}&with_networks=213`,
  fetchRomanceMovies: `/discover/movie?api_key=${api_key}&with_genres=10749`,
  fetchFantasy: `/discover/movie?api_key=${api_key}&with_genres=14`,
};

export const requestsMovies = [
  {
    title: "Trending",
    URL: requests.fetchTrending,
  },

  {
    title: "TopRated",
    URL: requests.fetchTopRated,
  },

  {
    title: "action",
    URL: requests.fetch_action,
  },
  {
    title: "comedy",
    URL: requests.fetch_comdy,
  },

  {
    title: "documantry",
    URL: requests.fetch_documantry,
  },
  {
    title: "romantic",
    URL: requests.fetch_romansy,
  },
  {
    title: "Fantasy",
    URL: requests.fetchFantasy,
  },
];

export const requestsSeries = [
  {
    title: "Trending",
    URL: requests.fetchTrendingTv,
  },

  {
    title: "TopRated",
    URL: requests.fetchTopRatedTv,
  },

  {
    title: "netflix",
    URL: requests.fetchNetflixOriginals,
  },

  {
    title: "comedy",
    URL: requests.fetchComedyTv,
  },
];
export const base_url = "https://image.tmdb.org/t/p/original/";

export default requests;
