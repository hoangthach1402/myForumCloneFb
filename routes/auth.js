const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary");

const upload = multer({ storage });
const authController = require("../controller/authController");


router.route('/').get(authController.getHome)
router.get('/logout',(req,res)=>{ 
  res.cookie('jwt', '');
  res.redirect('/');
})
router
  .route("/login")
  .get(authController.loginDisplay)
  .post(authController.login);

router.get("/register", (req, res) => {
  res.render("user/new");
});
router.post("/register", upload.array("images"), authController.register);
module.exports = router;
