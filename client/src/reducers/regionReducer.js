export const regionReducer = (state = [], action) => {
  switch (action.type){
    case "SELECT-REGION":
      return [...state, action.payload];
    default:
      return state;
  }
}