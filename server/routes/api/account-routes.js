const router = require('express').Router();
const { getAccountData, findAccountByName } = require('../../controllers/account-controller')

// get all user info
// /api/accounts
router
    .route('/:account_id')
    .get(getAccountData);

router
    .route('/')
    .get(findAccountByName);

module.exports = router;