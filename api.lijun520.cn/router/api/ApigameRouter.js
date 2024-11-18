const express = require('express');
const router = express.Router();
const { initGame, filterGame, gameDetail} = require('../../controllers/Api_gameController');

router.get('/init', initGame);
router.get('/filter', filterGame);
router.get('/detail', gameDetail);


module.exports = router;
