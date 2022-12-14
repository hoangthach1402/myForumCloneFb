const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/auth");
const mongoosePaginate = require("mongoose-paginate-v2");

const imageSchema = new mongoose.Schema({
  url: String,
  fileName: String,
});
const followerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
})
  
const friendSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isAccept:{type:Boolean,defaul:false}
})
const userSchema = new mongoose.Schema(
  {
    username: { required: true, type: String },
    password: { required: true, type: String },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    type: {
      type: String,
      enum: [
        "Photographer",
        "Blogger",
        "Normal",
        "Motivation",
        "Checker",
        "Sale",
      ],
      default: "Normal",
    },
    gender: { type: String, enum: ["male", "female"], default: "male" },
    role: { type: String, enum: ["admin", "user"], default: "user" },

    isDeleted: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
    image: imageSchema,
    friends:[friendSchema],
    followers:[followerSchema]
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const generatePassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);
  return hashPass;
};
userSchema.pre("save", async function (next) {
  if (this.password) {
    const hassPass = await generatePassword(this.password);
    this.password = hassPass;
  }
  next();
});
userSchema.methods.isMatch = async (password) => {
  return await bcrypt.compare(password, this.password);
};

userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "user",
});
//post virtual
userSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "user",
});
// reivew

//fileUpload
userSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "user",
});
userSchema.plugin(mongoosePaginate);

//comments  binhluanganday
const User = mongoose.model("User", userSchema, "User");
module.exports = User;
