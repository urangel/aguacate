export const dataFocusReducer = (state = [], action) => {
  switch (action.type){
    case "SELECT-DATA-FOCUS":
      return [...state, action.payload];
    default:
      return state;
  }
}