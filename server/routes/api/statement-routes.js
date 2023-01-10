const router = require('express').Router();
const {
    getStatement
} = require('../../controllers/statement-controller');

router
    .route('/')
    .get(getStatement);

module.exports = router;