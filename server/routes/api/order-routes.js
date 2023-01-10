const router = require('express').Router();
const {
    getAllOrders, getOrderPdf, getOrderHTML, getSingleOrder, getOrderPrint
} = require('../../controllers/order-controller');

// get all orders from a user
// /api/orders

router
    .route('/print/:order_id')
    .get(getOrderPrint);

router
    .route('/all/:account_id/:filter')
    .get(getAllOrders);

// /api/orders/:order_id
router
    .route('/:order_id')
    .get(getSingleOrder)
    .post(getOrderHTML);

// /api/order/:order_id/pdf
router
    .route('/:order_id/pdf')
    .get(getOrderPdf);

module.exports = router;