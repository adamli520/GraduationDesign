const express = require('express');
const router = express.Router();
const {addToCart, checkoutCart, deleteFromCart,getCart,update,Test } = require('../controllers/shopCartController');

router.post('/addToCart', addToCart);
router.post('/checkout', checkoutCart);
router.post('/delete', deleteFromCart);
router.get('/getCart', getCart)
router.put('/update',update)

router.get('/test',Test)

module.exports = router;