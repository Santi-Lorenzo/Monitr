const express = require("express");
const sourcesController = require("../controllers/sourcesController");
const authController = require("../controllers/authController");
const router = express.Router();

// get categories
router.get(
  "/",
  authController.authorize,
  sourcesController.getSources,
  (req, res) => res.status(200).json(res.locals.results)
);

// add categories
router.post(
  "/",
  authController.authorize,
  sourcesController.addSource,
  (req, res) => res.status(200).json(res.locals.results)
);

// update categories
router.put(
  "/",
  authController.authorize,
  sourcesController.editSource,
  (req, res) => res.status(200).json(res.locals.results)
);

// delete categories
router.delete(
  "/:id",
  authController.authorize,
  sourcesController.deleteSource,
  (req, res) => res.status(200).json(res.locals.results)
);

module.exports = router;
