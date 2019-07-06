const router = require("express").Router();
const controller = require("../controllers/controller");

// // Matches with "/api/jobs"
// router.route("/")
//   .get(jobsController.findAll)
//   .post(jobsController.create);

// router.route("/:type")
//   .get(jobsController.findByType);

// // Matches with "/api/jobs/:id"
// router.route("/:id")
//   .get(jobsController.findById)
//   .put(jobsController.update)
//   .delete(jobsController.remove);

router.route("/api/regions")
  .get(controller.getUniqueRegions);

module.exports = router;