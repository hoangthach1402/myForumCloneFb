const Post = require("../models/post");
const Cave = require("../models/cave");
const FileUpload = require("../models/fileUpload");
const Comment = require("../models/comment");
const asyncHandler = require("../utils/async");
const postController = {
  get_newPost: (req, res) => {
    res.render("post/new");
  },
  getPosts: async (req, res) => {
    const posts = await Post.find()
      .populate({ path: "cave", populate: { path: "fileUploads" } })
      .populate("comments")
      .exec();
    // res.json(posts);
    console.log(posts)
    res.render('post/show',{posts})
  },
  getPost: async (req, res) => {
    const postDetail = await Post.findById(req.params.id)
      .populate({ path: "cave", populate: { path: "fileUploads" } })
      .populate({ path: "comments" });
      console.log(postDetail)
    res.render('post/detail',{post:postDetail})
  },
  createPost: async (req, res) => {
   
   
    const caveInfo = {
      name: req.body.cavename,
      age: parseInt(req.body.caveage),
      price: parseInt(req.body.caveprice),
    };
    const cave = new Cave(caveInfo);
    await cave.save()
   

    const images = req.files;
    
    // console.log('images: ',images)
    for (var i = 0; i < images.length; i++) {
      // tao model upload image for cave
      const doc = cave._id;
      console.log("caveId is :", cave._id);
      const fileUpload = await FileUpload.create({
        fileName: images[i].etag,
        filePath: images[i].url,
        doc: doc,
        docModel: "Cave",
      });
    }
  
    const newPost = {
      user: req.user.id,
      cave:cave._id,
      title: req.body.posttitle,
      description: req.body.postdescription,
    };
    const post = await Post.create(newPost); //taopost
    res.json({cave,post} );
    
  },

   

  getPostComment: async (req, res) => {
    const comment = await Comment.create({
      user: req.body.user,
      content: req.body.content,
      doc: req.params.postId,
      docModel: "Post",
    });
    res.json(comment);
  },
  deletePost: async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "deleted" });
  },
};
module.exports = postController;
