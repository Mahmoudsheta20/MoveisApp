export const actionType = {
  SET_USER: "SET_USER",
  SET_WATCHLIST: "SET_WATCHLIST",
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

    default:
      return state;
  }
};
export default reducer;
