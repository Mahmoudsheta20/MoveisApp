export const actionType = {
  SET_USER: "SET_USER",
  SET_WATCHLIST: "SET_WATCHLIST",
  SET_ALL_WATCHLIST: "SET_ALL_WATCHLIST",
};

const reducer = (state, action) => {
  console.log(action);
  console.log(state);
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionType.SET_WATCHLIST:
      return {
        ...state,

        watchList: [...state.watchList, action.watchList],
      };
    case actionType.SET_ALL_WATCHLIST:
      return {
        ...state,
        watchListAll: action.watchListAll,
      };

    default:
      return state;
  }
};
export default reducer;
