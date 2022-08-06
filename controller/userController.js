const User = require("../models/user");
const asyncHandler = require("../utils/async");
const { generateToken } = require("../utils/auth");
const Write = require('../models/Write')
const userController = {
  getUsers: async (req, res) => {
    const options = {
      page: req.query.page || 1,
      limit: req.query.limit || 10,
      // select: '',

      sort: { createdAt: -1 },
    };

    const users = await User.paginate({}, options, function (err, users) {
      console.log(users);
      res.render("user/show", { users });
    });
    // // res.json(users)
  },
  getUserByIdWithComment: async (req, res) => {
    const userWithReview = await User.findById(req.params.userId).populate({
      path: "comments",
      select: "content",
    });
    res.json(userWithReview);
  },

  getDetail: async (req, res, next) => {
    try {
      // const writes =[] 
       
      // const wall = req.headers.referer.split('/')[4]  
      const writes = await Write.find({wall:req.params.userId }).populate({path:'wall',select:'username'}).populate({path:'user',select:'username'}).populate({path:'fileUploads'}).populate({path:'comments',populate:{path:'user',select:'username'}}).sort({createdAt:-1}).limit(10)
      console.log('writes debug line 34 :',writes)
      const owner = req.owner 
      const user = await User.findById(req.params.userId)

        .populate({
          path: "comments",
          populate: { path: "cave", select: "name" },
        })
        .populate({
          path: "reviews",
          populate: { path: "cave", select: "name" },
        })
        .populate("posts")
        .limit(5);
      // console.log(user);
      console.log(owner)
      // res.json(writes)
      res.render("user/detail", { userdetail:user,owner,writes });
    } catch (err) {
      next(err);
    }
  },
  updateBanned: async (req, res, next) => {
    try {
      res.send("banned");
    } catch (err) {
      next(err);
    }
  },
};

module.exports = userController;
