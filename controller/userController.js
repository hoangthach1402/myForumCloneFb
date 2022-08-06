const User = require("../models/user");
const asyncHandler = require("../utils/async");
const { generateToken } = require("../utils/auth");
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
      res.render("user/detail", { user,owner });
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
