import axios from "axios";

export default {

  //Avocado Stuff

  getRegions: () => {
    return axios.get("/api/regions");
  },

  getData: (region, queryType) => {
    console.log(queryType);
    return axios.get("/api/data", {
      region: region,
      type: queryType
    });
  }

};