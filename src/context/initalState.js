import { fetchUser } from "../data/fetchUserLocal";

export const initialState = {
  user: fetchUser(),
  watchList: [],
  watchListAll: null,
};
