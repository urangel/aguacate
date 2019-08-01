const router = require("express").Router();
const controller = require("../controllers/controller");

router.route("/api/regions")
  .get(controller.getUniqueRegions);

router.route("/api/data/:region")
  .get(controller.getData);

module.exports = router;