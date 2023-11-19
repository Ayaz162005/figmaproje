import mongoose from "mongoose";

const CreatorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  totalSale: {
    value: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
  profileImgPath: {
    type: String,
    required: true,
  },
  volume: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  nftSold: {
    type: Number,
    required: true,
  },
  followers: {
    type: Number,
    required: true,
  },
  followersIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "creators",
    },
  ],
  bio: {
    type: String,
    required: true,
  },
  chainId: {
    type: String,
    required: true,
  },
});

const CreatorModel = mongoose.model("creators", CreatorSchema);
export default CreatorModel;
