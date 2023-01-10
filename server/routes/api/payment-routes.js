const router = require('express').Router();
const {
    getAllPayments
} = require('../../controllers/payment-controller');

router
    .route('/:account_id')
    .get(getAllPayments);

module.exports = router;