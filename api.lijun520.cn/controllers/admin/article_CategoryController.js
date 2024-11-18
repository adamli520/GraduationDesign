const ArticleCategory = require('../../models/ArticleCategory');

// 获取所有文章分类
exports.getAllArticleCategories = (req, res) => {
    ArticleCategory.findAll()
       .then((categories) => {
            res.send({
                msg: '查询所有文章分类成功',
                data: categories
            });
        })
       .catch((error) => {
            console.error('查询所有文章分类出错: ', error);
            res.send({
                msg: '查询所有文章分类时出现错误'
            });
        });
};

// 添加文章分类
exports.addArticleCategory = (req, res) => {
    const newCategory = req.body;
    ArticleCategory.create(newCategory)
       .then((category) => {
            res.send({
                msg: '文章分类添加成功',
                data: category
            });
        })
       .catch((error) => {
            console.error('添加文章分类出错: ', error);
            res.send({
                msg: '添加文章分类时出现错误',
                error: error.message
            });
        });
};

// 更新文章分类
exports.updateArticleCategory = (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    ArticleCategory.update(updateData, {
        where: { id }
    })
       .then(([rowsUpdated]) => {
            if (rowsUpdated > 0) {
                res.send({
                    msg: '文章分类更新成功'
                });
            } else {
                res.send({
                    msg: '未找到要更新的文章分类'
                });
            }
        })
       .catch((error) => {
            console.error('更新文章分类出错: ', error);
            res.send({
                msg: '更新文章分类时出现错误'
                });
        });
};

// 删除文章分类
exports.deleteArticleCategory = (req, res) => {
    const id = req.params.id;
    ArticleCategory.destroy({
        where: { id }
    })
       .then((rowsDeleted) => {
            if (rowsDeleted > 0) {
                res.send({
                    msg: '文章分类删除成功'
                });
            } else {
                res.send({
                    msg: '未找到要删除的文章分类'
                });
            }
        })
       .catch((error) => {
            console.error('删除文章分类出错: ', error);
            res.send({
                msg: '删除文章分类时出现错误'
            });
        });
};