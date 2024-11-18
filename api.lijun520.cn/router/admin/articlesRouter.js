const express = require('express');
const router = express.Router();
const { GetAllArticles,AddArticle,updateArticle,deleteArticle,GetArticlesByAuthor,GetArticlesByCategory} = require('../../controllers/admin/articlesController');

router.get('/', GetAllArticles);
router.post('/', AddArticle);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);
router.get('/author/:authorId', GetArticlesByAuthor);
router.get('/category/:categoryId', GetArticlesByCategory);


module.exports = router;
