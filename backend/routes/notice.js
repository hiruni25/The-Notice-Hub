const express = require('express')
const router = express.Router();

const { 
    newProduct, 
    getNotices,
    getSingleNotice,
    newNotice
} = require('../controllers/noticeController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


router.route('/notice').get(getNotices);
router.route('/notice/:id').get(getSingleNotice);
router.route('/notice').post(isAuthenticatedUser, authorizeRoles('admin'), newNotice);

module.exports = router;