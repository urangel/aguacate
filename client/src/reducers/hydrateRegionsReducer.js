export const hydrateRegionsReducer = (state = {}, action) => {
  switch (action.type){
    case "HYDRATE-REGIONS":
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}