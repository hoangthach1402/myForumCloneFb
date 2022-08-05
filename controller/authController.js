const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/auth");
const asyncHandler = require("../utils/async");
const { registerSuccess } = require("../dtos/responseApp/user.dto");
const Post = require('../models/post')
const Review = require('../models/review')

const bcrypt = require("bcrypt");

const authController = {
  getHome:async(req,res,next)=>{
    const users = await User.find().sort({createdAt:'desc'}).limit(3);
    const posts = await Post.find().populate({path:'cave',select:'name'}).sort({createdAt:'desc'}).limit(10);
    const reviews = await Review.find().populate({path:'user',select:'username'}).populate({path:'cave',select:'name'}).sort({createdAt:'desc'}).limit(5);
    res.render('index',{users,posts,reviews})
  },
  loginDisplay: (req, res) => {
    res.render("user/login");
  },
  login: asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
      res
        .status(400)
        .json({ success: false, message: "cannot be blank fields!" });
    }
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        res
          .status(400)
          .json({ success: false, message: "this username is invalid!" });
      } else {
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          //sai password
          res
            .status(400)
            .json({ success: false, message: "password is invalid" });
        const token = generateToken(user);
        const bearToken = `Bearer ${token}`;
        //dang nhap thanh cong
        req.user = user;
        res.cookie("jwt", bearToken);
        res.redirect(`/user/${user.id}/details`);
      }
    } catch (err) {
      res.send(err);
    }
  }),
  register: asyncHandler(async (req, res, next) => {
    const isExist = await User.findOne({ username: req.body.username });
    if (isExist)
      res
        .status(400)
        .json({ success: false, message: "this user is already exists" });
    const user = new User(req.body.user);
    user.image = { url: req.files[0].url, fileName: req.files[0].originalname };
    await user.save();
    const token = generateToken(user);
    const bearToken = `Bearer ${token}`;
    //dang nhap thanh cong
    req.user = user;
    res.cookie("jwt", bearToken);
    res.redirect(`/user/${user.id}/details`);
    // res.render('user/detail')
  }),
};

module.exports = authController;
