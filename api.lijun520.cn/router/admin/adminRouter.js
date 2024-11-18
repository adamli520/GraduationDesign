const express = require('express');
const router = express.Router();
const { Getinfor,updateAdmin} = require('../../controllers/admin/adminController');

router.get('/', Getinfor);
router.put('/', updateAdmin);


module.exports = router;
