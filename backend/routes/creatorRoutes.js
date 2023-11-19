import express from "express";
import {
  getAllCreators,
  addoneCreate,
  deleteOneCreate,
  updateCreate,
  getOneCreator,
  uploadCreatorPhoto,
  resizeUserPhoto,
  getOneCreatorWithUserId,
} from "../controllers/CreatorController.js"; // Assuming .mjs extension for ES6 modules

const routes = express.Router();

routes
  .route("/")
  .get(getAllCreators)
  .post(uploadCreatorPhoto, resizeUserPhoto, addoneCreate);

routes.route("/userId").post(getOneCreatorWithUserId);

routes
  .route("/:id")
  .delete(deleteOneCreate)
  .put(updateCreate) // Changed to .put() for updating according to REST conventions
  .get(getOneCreator);

export default routes;
