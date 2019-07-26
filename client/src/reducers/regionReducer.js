const regionReducer = (state = [], action) => {
  switch (action.type){
    case "SELECTREGION":
      return [...state, action.payload];
    default:
      return state;
  }
}

export default {regionReducer};