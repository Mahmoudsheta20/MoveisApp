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
