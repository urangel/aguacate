export const dataFocusReducer = (state = ['Average Price'], action) => {
  switch (action.type){
    case "SELECT-DATA-FOCUS":
      return [...state, action.payload];
    default:
      return state;
  }
}