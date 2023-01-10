const router = require('express').Router();
const {
    getAllbills, getbillPdf, getSinglebill, getbillHTML
} = require('../../controllers/bill-controller');

// get all bills from a user
// /api/bills
router
    .route('/all/:account_id/:filter')
    .get(getAllbills)

// /:bill_id
router
    .route('/:bill_id')
    .post(getbillHTML)
    .get(getSinglebill);

// /:bill_id/pdf
router
    .route('/:bill_id/pdf')
    .get(getbillPdf);

module.exports = router;