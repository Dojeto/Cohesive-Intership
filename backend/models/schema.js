import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  spend: {
    type: Number,
    default: 0,
  },
  data: {
    frineds: [
      {
        type: Object,
      },
    ],
  },
  userid: mongoose.SchemaTypes.ObjectId,
});

const User = mongoose.model("moneytrack", UserSchema);

export default User;
