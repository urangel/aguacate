export const addSearch = (region, data_focus, type) => ({
  type: "ADD-SEARCH",
  payload: [
    region,
    data_focus,
    type
  ]
});