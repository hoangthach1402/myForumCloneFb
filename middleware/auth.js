const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require('../utils/async')
const isAuthenticated = (req, res, next) => {


  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    const bearToken = token.split(' ')[1] 
    jwt.verify(bearToken,process.env.SECRET_TOKEN, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
   
};
const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
 
  if (token) {
    const bearToken = token.split(' ')[1]
    jwt.verify(bearToken,process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        req.user = user
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }}
;
const isAdmin = (req, res, next) => {
  if (req.user.role != "admin")
    next(new ErrorResponse(`Admin only permission!`, 403));
  next();
};
module.exports = { isAuthenticated, isAdmin, checkUser };
