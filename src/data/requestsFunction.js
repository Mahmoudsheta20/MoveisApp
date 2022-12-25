import { api_key } from "./requests";
import axios from "./axios";

export const fetchDataDatails = async (category, id) => {
  try {
    const reqeust = await axios.get(
      `/${category}/${id}?api_key=${api_key}&language=en-US`
    );

    return reqeust.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDataSeasons = async (id, seasonNum) => {
  try {
    const reqeust = await axios.get(
      `/tv/${id}/season/${seasonNum}?api_key=${api_key}&language=en-US`
    );
    return reqeust.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDataTrailer = async (category, id) => {
  try {
    const reqeust = await axios.get(
      `/${category}/${id}/videos?api_key=${api_key}&language=en-US`
    );

    return reqeust.data;
  } catch (error) {
    console.log(error);
  }
};
export const getDataSearch = async (search) => {
  try {
    const reqeust = await axios.get(
      `/search/multi?api_key=${api_key}&language=en-US&query=${search}&page=1&include_adult=false`
    );
    return reqeust.data.results;
  } catch (error) {
    console.log(error);
  }
};
