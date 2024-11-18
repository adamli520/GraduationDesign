const express = require('express');
const router = express.Router();
const { getAllArticleCategories,addArticleCategory,updateArticleCategory,deleteArticleCategory} = require('../../controllers/admin/article_CategoryController');

router.get('/', getAllArticleCategories);
router.post('/', addArticleCategory);
router.put('/:id', updateArticleCategory);
router.delete('/:id', deleteArticleCategory);


module.exports = router;
