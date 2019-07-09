import axios from "axios";

export default {

  //Avocado Stuff

  getRegions: () => {
    return axios.get("/api/regions");
  },

  getData: (region) => {
    return axios.get("/api/data/" + region);
  }

};