export const hydrateRegionsReducer = (state = [], action) => {
  switch (action.type){
    case "HYDRATE-REGIONS":
      return [...state, action.payload];
    default:
      return state;
  }
}