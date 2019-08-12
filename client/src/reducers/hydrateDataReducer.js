export const hydrateDataReducer = (state = [], action) => {
  switch (action.type){
    case "HYDRATE-DATA":
      return [...state, action.payload];
    default:
      return state;
  }
}