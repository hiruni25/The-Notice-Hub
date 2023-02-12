const express = require('express')
const router = express.Router();

const { 
    getNotices,
    getSingleNotice,
    newNotice,
    updateNotice,
    deleteNotice
} = require('../controllers/noticeController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


router.route('/notice').get(getNotices);
router.route('/notice/:id').get(getSingleNotice);
router.route('/notice/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateNotice);
router.route('/notice/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteNotice);
router.route('/notice').post(isAuthenticatedUser, authorizeRoles('admin'), newNotice);

module.exports = router;