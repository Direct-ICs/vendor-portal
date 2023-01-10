const router = require('express').Router();
const {
    getPendingData
} = require('../../controllers/rfq-controller');

// get all RMAs from CRM
// /api/rfq
router
    .route('/pending')
    .get(getPendingData);

module.exports = router;