const express = require("express");
const mongoose = require("mongoose");
const slugify = require("slugify");
const router = express.Router();

const imageSchema = new mongoose.Schema({
  url: String,
  fileName: String,
});
const caveSchema = new mongoose.Schema(
  {
    name: { type: String },
    age: Number,
    price: Number,
    slug:{type:String}
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps:true
  }
);

caveSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
caveSchema.virtual("fileUploads", {
  ref: "FileUpload",
  localField: "_id",
  foreignField: "doc",
});
caveSchema.virtual('reviews',{
  ref:'Review',
  localField:'_id',
  foreignField:'cave'
})
const Cave = mongoose.model("Cave", caveSchema, "Cave");
module.exports = Cave;
