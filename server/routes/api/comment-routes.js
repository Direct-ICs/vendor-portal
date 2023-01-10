const router = require('express').Router();
const { getComments, submitComment } = require('../../controllers/comment-controller')

// get all user info
// /api/comments
router
    .route('/:type/:id')
    .get(getComments)
    .post(submitComment);

module.exports = router;