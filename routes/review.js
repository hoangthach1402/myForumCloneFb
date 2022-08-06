const express = require('express');
const router = express.Router();
const reviewController = require('../controller/reviewController')
const {isAuthenticated} = require('../middleware/auth')


router.route('/').get(reviewController.getReviews).post(isAuthenticated,reviewController.createReview)
router.get('/:id',reviewController.getReview)

module.exports = router

