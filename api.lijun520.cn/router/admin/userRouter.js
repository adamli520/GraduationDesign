const express = require('express');
const router = express.Router();
const { GetAlluser,AddUser,updateUser,deleteUser} = require('../../controllers/admin/userController');

router.get('/', GetAlluser);
router.post('/', AddUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


module.exports = router;
