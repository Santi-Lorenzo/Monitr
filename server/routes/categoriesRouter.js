const express = require("express");
const categoriesController = require("../controllers/categoriesController");
const authController = require("../controllers/authController");
const router = express.Router();

// get categories
router.get(
  "/",
  authController.authorize,
  categoriesController.getCategories,
  (req, res) => res.status(200).json(res.locals.results)
);

// add categories
router.post(
  "/",
  authController.authorize,
  categoriesController.addCategory,
  (req, res) => res.status(200).json(res.locals.results)
);

// update categories
router.put(
  "/",
  authController.authorize,
  categoriesController.editCategory,
  (req, res) => res.status(200).json(res.locals.results)
);

// delete categories
router.delete(
  "/:id",
  authController.authorize,
  categoriesController.deleteCategory,
  (req, res) => res.status(200).json(res.locals.results)
);

module.exports = router;
