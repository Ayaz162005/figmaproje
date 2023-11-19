import express from "express";
import {
  getAllNfts,
  deleteOneNft,
  updateNft,
  addoneNft,
  uploadNftPhoto,
  resizeNftPhoto,
} from "../controllers/NftsController.js"; // assuming .mjs extension for ES6 modules

const routes = express.Router();

routes
  .route("/")
  .get(getAllNfts)
  .post(uploadNftPhoto, resizeNftPhoto, addoneNft);

routes.route("/:id").get(deleteOneNft).put(updateNft).delete(deleteOneNft);
export default routes;
