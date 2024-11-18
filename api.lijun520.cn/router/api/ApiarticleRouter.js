const express = require('express');
const router = express.Router();
const { ArticleList, ArticleDetail} = require('../../controllers/Api_articleController');

router.get('/', ArticleList);
router.get('/:id', ArticleDetail);


module.exports = router;
