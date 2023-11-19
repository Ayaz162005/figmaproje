import sharp from "sharp";
import NftsModal from "../modals/NftsModal.js";
import multer from "multer";
import UserModel from "../modals/UserModal.js";
import CreatorModel from "../modals/CreateModal.js";
import { APIFeatures } from "../utils/ApiFeatures.js";

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Error", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadNftPhoto = upload.single("photo");

export const resizeNftPhoto = async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `nfts-${req.body.userId}-${Date.now()}.jpeg`;

  // Resize the image
  const resizedImage = await sharp(req.file.buffer)
    .resize(500, 480)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/nfts/${req.file.filename}`);

  // Create a mask for a rounded corner

  // Apply the mask to the resized image

  next();
};

export const getAllNfts = async (req, res, next) => {
  try {
    const d = await NftsModal.find();
    const features = new APIFeatures(
      NftsModal.find().populate("creatorId"),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const allNfts = await features.query;

    res.status(200).json({
      message: "success",
      size: d.length,
      data: {
        allNfts,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getOneNft = async (req, res, next) => {
  const { id } = req.params;
  const nft = await NftsModal.findOne({ _id: id });

  return res.status(200).json({
    message: "success",
    data: {
      nft,
    },
  });
};

export const deleteOneNft = async (req, res, next) => {
  const { id } = req.params;
  const nft = await NftsModal.deleteOne({ _id: id });

  return res.status(200).json({
    message: "deleted",
    data: {
      nft,
    },
  });
};

export const updateNft = async (req, res, next) => {
  const { id } = req.params;
  const { data } = req.body;

  try {
    const updatedNft = await NftsModal.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedNft) {
      return res.status(404).json({
        message: "NFT not found",
        data: null,
      });
    }

    return res.status(200).json({
      message: "updated",
      data: {
        nft: updatedNft,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const addoneNft = async (req, res, next) => {
  try {
    const creator = await CreatorModel.findOne({ userId: req.body.userId });

    if (!creator) {
      throw new Error("Creator don't correct");
    }
    const newCreator = {
      name: req.body.name,
      price: {
        value: req.body.price,
        currency: "ETH",
      },
      highestBid: {
        value: 0,
        currency: "wETH",
      },
      imgPath: req.file.filename,
      creatorId: creator._id,
    };
    const test = await CreatorModel.findOne({ _id: creator._id });
    if (!test) {
      throw new Error("Don't have this creator");
    }

    const create = await NftsModal.create(newCreator);

    return res.status(200).json({
      message: "created",
      data: {
        create,
      },
    });
  } catch (error) {
    console.error("Error creating:", error);
    return res.status(500).json({
      message: "Error creating entity",
      error: error.message, // Pass the error message for debugging
    });
  }
};
