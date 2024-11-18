const express = require('express');
const router = express.Router();
const { GetAllGames,AddGame,updateGame,deleteGame} = require('../../controllers/admin/gamesController');

router.get('/', GetAllGames);
router.post('/', AddGame);
router.put('/:id', updateGame);
router.delete('/:id', deleteGame);


module.exports = router;
