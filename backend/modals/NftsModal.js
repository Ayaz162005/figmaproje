import mongoose from "mongoose";

const NftsSchema = mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "creators",
  },
  price: {
    value: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
  highestBid: {
    value: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
  name: {
    type: String,
    required: true,
  },
  imgPath: {
    type: String,
    required: true,
  },
});

const NftsModel = mongoose.model("Nfts", NftsSchema);
export default NftsModel;
