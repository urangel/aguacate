export const typeReducer = (state = ['Conventional'], action) => {
  switch (action.type){
    case "SELECT-TYPE":
      return [...state, action.payload];
    default:
      return state;
  }
}