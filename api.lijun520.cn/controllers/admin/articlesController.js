const Article = require('../../models/articles'); // 假设路径正确


// 获取所有文章
exports.GetAllArticles = (req, res) => {
    Article.findAll()
      .then((articles) => {
            res.send({
                msg: '查询所有文章成功',
                data: articles
            });
        })
      .catch((error) => {
            console.error('查询所有文章出错: ', error);
            res.send({
                msg: '查询所有文章时出现错误'
            });
        });
};

// 添加文章
exports.AddArticle = (req, res) => {
    const newArticle = req.body;
    Article.create(newArticle)
      .then((article) => {
            res.send({
                msg: '文章添加成功',
                data: article
            });
        })
      .catch((error) => {
            console.error('添加文章出错: ', error);
            res.send({
                msg: '添加文章时出现错误',
                error: error.message
            });
        });
};

// 更新文章
exports.updateArticle = (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    Article.update(updateData, {
        where: { id }
    })
      .then(([rowsUpdated]) => {
            if (rowsUpdated > 0) {
                res.send({
                    msg: '文章更新成功'
                });
            } else {
                res.send({
                    msg: '未找到要更新的文章'
                });
            }
        })
      .catch((error) => {
            console.error('更新文章出错: ', error);
            res.send({
                msg: '更新文章时出现错误'
            });
        });
};

// 删除文章
exports.deleteArticle = (req, res) => {
    const id = req.params.id;
    Article.destroy({
        where: { id }
    })
      .then((rowsDeleted) => {
            if (rowsDeleted > 0) {
                res.send({
                    msg: '文章删除成功'
                });
            } else {
                res.send({
                    msg: '未找到要删除的文章'
                });
            }
        })
      .catch((error) => {
            console.error('删除文章出错: ', error);
            res.send({
                msg: '删除文章时出现错误'
            });
        });
};

// 根据作者获取文章（示例额外路由）
exports.GetArticlesByAuthor = (req, res) => {
    const authorId = req.params.authorId;
    Article.findAll({
        where: { author_id: authorId }
    })
      .then((articles) => {
            res.send({
                msg: '查询作者的文章成功',
                data: articles
            });
        })
      .catch((error) => {
            console.error('查询作者文章出错: ', error);
            res.send({
                msg: '查询作者文章时出现错误'
            });
        });
};

// 根据分类获取文章（示例额外路由）
exports.GetArticlesByCategory = (req, res) => {
    const categoryId = req.params.categoryId;
    Article.findAll({
        where: { category_id: categoryId }
    })
      .then((articles) => {
            res.send({
                msg: '查询分类的文章成功',
                data: articles
            });
        })
      .catch((error) => {
            console.error('查询分类文章出错: ', error);
            res.send({
                msg: '查询分类文章时出现错误'
            });
        });
};