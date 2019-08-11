export const previousSearchesReducer = (state = [], action) => {
  switch (action.type){
    case "ADD-SEARCH":
      return [
        ...state,
        action.payload
      ]
    default:
      return state;
  }
}