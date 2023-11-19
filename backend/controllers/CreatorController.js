import multer from "multer";
import CreateModal from "../modals/CreateModal.js";
import sharp from "sharp";
import UserModel from "../modals/UserModal.js";
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

const uploadCreatorPhoto = upload.single("photo");

const resizeUserPhoto = async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `avatars-${req.body.userId}-${Date.now()}.jpeg`;

  // Resize the image
  const resizedImage = await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toBuffer();

  // Create a mask for a rounded corner
  const roundedCorner = Buffer.from(
    `<svg><rect x="0" y="0" width="500" height="500" rx="5000" ry="5000"/></svg>`
  );

  // Apply the mask to the resized image
  const roundedImage = await sharp(resizedImage)
    .composite([{ input: roundedCorner, blend: "dest-in" }])
    .toFile(`public/images/avatars/${req.file.filename}`);

  next();
};

const getAllCreators = async (req, res, next) => {
  try {
    console.log(req.query);
    // const data = CreateModal.find();
    const features = new APIFeatures(CreateModal.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const allCreators = await features.query;
    console.log(allCreators.length);
    res.status(200).json({
      message: "success",
      size: allCreators.length,
      data: {
        allCreators,
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

const getOneCreator = async (req, res, next) => {
  const { id } = req.params;
  const creator = await CreateModal.findOne({ _id: id });

  return res.status(200).json({
    message: "success",
    data: {
      creator,
    },
  });
};
const getOneCreatorWithUserId = async (req, res, next) => {
  console.log("sdijkfkkl");
  try {
    const { userId } = req.body;
    console.log(userId);
    const creator = await CreateModal.findOne({ userId });

    if (!creator) {
      return res.status(404).json({
        message: "Creator not found",
        data: null,
      });
    }

    return res.status(200).json({
      message: "success",
      data: {
        creator,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const deleteOneCreate = async (req, res, next) => {
  const { id } = req.params;
  const create = await CreateModal.deleteOne({ _id: id });

  return res.status(200).json({
    message: "deleted",
    data: {
      create,
    },
  });
};

const updateCreate = async (req, res, next) => {
  const { id } = req.params;
  const { data } = req.body;

  try {
    const updatedCreate = await CreateModal.findOneAndUpdate(
      { _id: id },
      data,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCreate) {
      return res.status(404).json({
        message: "Create not found",
        data: null,
      });
    }

    return res.status(200).json({
      message: "updated",
      data: {
        nft: updatedCreate,
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

const addoneCreate = async (req, res, next) => {
  try {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    const newCreator = {
      name: req.body.username,
      totalSale: {
        value: 0,
        currency: "ETH",
      },
      profileImgPath: req.file.filename,
      volume: "500",
      nftSold: 0,
      followers: 0,
      bio: req.body.bio,
      chainId: `0x${result}`,
      userId: req.body.userId,
    };
    const test = await UserModel.findOne({ _id: req.body.userId });
    if (!test) {
      throw new Error("Don't have this user");
    }
    const have = await CreateModal.findOne({ userId: req.body.userId });
    if (have) {
      throw new Error(
        "You can not create Because already this user have creator"
      );
    }
    const create = await CreateModal.create(newCreator);

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

export {
  getAllCreators,
  getOneCreator,
  deleteOneCreate,
  updateCreate,
  addoneCreate,
  uploadCreatorPhoto,
  resizeUserPhoto,
  getOneCreatorWithUserId,
};
