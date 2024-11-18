const express = require('express');
const router = express.Router();

const { getUserInfo,viewOrders,viewFeedback,recharge,updateUserInfo,Test } = require('../controllers/userController');

const expressJoi = require('@escook/express-joi')
const {
	updateinfo_limit
} = require('../middlerware/joi_user')

router.get('/getUserInfo', getUserInfo)
router.get('/viewOrders', viewOrders)
router.get('/viewFeedback', viewFeedback)
router.post('/recharge',recharge)
router.post('/updateUserInfo',expressJoi(updateinfo_limit),updateUserInfo)
router.get('/test',Test)


module.exports = router;