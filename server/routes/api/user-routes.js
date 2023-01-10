const router = require('express').Router();
const {
    getUserData, createNewContact, updateContact, requestDashboardAccess, deleteContactFromDashboard, getDashboardInfoByEmail
} = require('../../controllers/user-controller');

// get all user info
// /api/users
router
    .route('/')
    .post(getUserData);

router
    .route('/contact')
    .post(createNewContact);

router
    .route('/dashboard')
    .post(requestDashboardAccess);

router
    .route('/dashboard/:id')
    .delete(deleteContactFromDashboard);

router
    .route('/dashboard/:email')
    .get(getDashboardInfoByEmail);

router
    .route('/contact/:contact_person_id')
    .put(updateContact);

module.exports = router;