const Write = require("../models/Write");
const FileUpload = require("../models/fileUpload");

const writeController = {
  getAll: async (req, res) => {
    const wall = req.headers.referer.split("/")[4];
    const writes = await Write.find({ user: wall });
    res.render("users/detail", { writes });
  },
  createWrite: async (req, res) => {
    const content = req.body.content;
    const wall = req.headers.referer.split("/")[4] || req.user.id;
    const body = {
      user: req.user.id,
      wall: wall,
      content: content,
    };

    const write = new Write(body);
    await write.save();
    const images = req.files;
    console.log("images: req.files: ->", req.files);
    for (var i = 0; i < images.length; i++) {
      await FileUpload.create({
        fileName: images[i].etag,
        filePath: images[i].url,
        doc: write._id,
        docModel: "Write",
      });
    }
    res.json({success:true,message:'success adding new write',data:write})
    // res.history.back
    // res.redirect("back"); 
    // res.
    // res.json(write)
  },
  addComment: async (req, res) => {
    const comment = {
      content: req.body.commentInput,
      user: req.user.id,
    };

    //  console.log(req.params.writeId)
    const write = await Write.findById(req.params.writeId);
    write.comments.push(comment);
    await write.save();
    res.redirect("back");
  },
  deleteWrite: async (req, res) => {
    const write = await Write.findById(req.params.writeId);
    await write.remove();
    // res.redirect("back");
    res.json({success:true,message:'write is deleted'})
  },
  addLike: async (req, res) => {
    const write = await Write.findById(req.params.writeId);
    const userId = req.user._id;
    console.log("userId: ", userId);

    const index = write.likes.findIndex(
      (like) => like.user.toString() == userId.toString()
    );
    if (index >= 0) {
      write.likes[index] ={...write.likes[index],isLike:!!req.body.like}

    } else {
      write.likes.push({ user: req.user._id, isLike: !!req.body.like });
    }
    await write.save();
    res.redirect("/");

  },

  getDetail: async (req, res) => {
    const write = await Write.findById(req.params.writeId)
      .populate({ path: "user", select: "username" })
      .populate({ path: "fileUploads", select: "filePath" })
      .populate({ path: "wall", select: "username" })
      .populate({
        path: "comments",
        populate: { path: "user", select: "username" },
      });
    res.render("write/singleShow", { write });
  },
};

module.exports = writeController;
