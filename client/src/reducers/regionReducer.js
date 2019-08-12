export const regionReducer = (state = ['Houston'], action) => {
  switch (action.type){
    case "SELECT-REGION":
      return [...state, action.payload];
    default:
      return state;
  }
}