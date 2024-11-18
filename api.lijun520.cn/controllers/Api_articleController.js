const { db } = require('../db/index');
// 将数据库连接对象命名为 mysql
const mysql = db;
exports.ArticleList = (req, res) => {
    let orderByClause = 'ORDER BY updated_at DESC';
   const { type } = req.query;
   if (type=='latest') {
       // 如果 latest 参数存在，按创建时间降序排列获取最新发布的文章
       orderByClause = 'ORDER BY updated_at DESC';
   } else if (type=='popular') {
       // 如果 popular 参数存在，按浏览量（views）降序排列获取最受欢迎的文章
       orderByClause = 'ORDER BY views DESC';
   }else {
       // 如果 type 参数不是 'latest' 或 'popular'，返回错误信息
       return res.json({
           success: false,
           message: '没有或者无效的type参数'
       });
   }
   sql = `SELECT * FROM articles ${orderByClause}`;
   mysql.query(sql, (err, results) => {
       if (err) {
           console.error('查询文章列表失败：', err);
           res.status(500).json({
               message: '服务器内部错误',
           });
           return;
       }
       res.json({
           data: results,
       });
   });
};

exports.ArticleDetail = (req, res) => {
    // 文章详情
    const { id } = req.params;
    
    const sql = 'SELECT * FROM articles WHERE id =?';
    mysql.query(sql, [id], (err, results) => {
        if (err) {
            console.error('查询文章详情失败：', err);
            res.status(500).json({
                message: '服务器内部错误',
            });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({
                message: '文章不存在',
            });
            return;
        }
        res.json({
            data: results[0],
        });
    });
};
