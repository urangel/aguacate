const SELECTREGION = "SELECTREGION";

const selectRegion = (region) => {
  return {
    type: SELECTREGION,
    payload: region
  }
};