export const regionReducer = (state = [' -- Choose a Region -- '], action) => {
  switch (action.type){
    case "SELECT-REGION":
      return [...state, action.payload];
    default:
      return state;
  }
}