const express = require('express');
const router = express.Router();
const { userLogin, userRegister,getUserInfo,sendEmailCode,feedback,resetPassword} = require('../../controllers/Api_userController');

const expressJoi = require('@escook/express-joi')

const {
	login_limit,
	register_limit,
	resetPassword_limit,
	sendEmailCode_limit
} = require('../../middlerware/joi_user')


router.post('/login',expressJoi(login_limit) ,userLogin);
router.post('/register',expressJoi(register_limit), userRegister);
router.post('/getUserInfo', getUserInfo)
router.post('/getemailcode',expressJoi(sendEmailCode_limit),sendEmailCode)
router.post('/feedback',feedback)
router.post('/resetPassword',expressJoi(resetPassword_limit),resetPassword)
module.exports = router;
