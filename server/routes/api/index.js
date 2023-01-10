const router = require('express').Router();
const orderRoutes = require('./order-routes');
const billRoutes = require('./bill-routes');
const userRoutes = require('./user-routes');
const paymentRoutes = require('./payment-routes');
const statementRoutes = require('./statement-routes');
const accountRoutes = require('./account-routes');
const rfqRoutes = require('./rfq-routes');
const commentRoutes = require('./comment-routes');

router.use('/orders', orderRoutes);
router.use('/bills', billRoutes);
router.use('/users', userRoutes);
router.use('/accounts', accountRoutes);
router.use('/payments', paymentRoutes);
router.use('/statements', statementRoutes);
router.use('/rfq', rfqRoutes);
router.use('/comments', commentRoutes);

module.exports = router;