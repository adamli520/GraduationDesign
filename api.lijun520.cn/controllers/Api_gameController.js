const { db } = require('../db/index');
// 将数据库连接对象命名为 mysql
const mysql = db;


exports.initGame = (req, res) => {
    // 初始化游戏逻辑
    const sql = 'SELECT * FROM games';
    mysql.query(sql, (err, results) => {
      if (err) {
        console.error('查询数据失败: ' + err.stack);
        return res.status(500).send('查询数据失败');
      }
  
      const cards = results.map(row => ({
        id: row.id,
        name: row.name,
        image_url: row.image_url,
        developer: row.developer,
        publisher: row.publisher,
        category: row.category,
        original_price: row.original_price,
        sale_price: row.sale_price
      }));
  
      res.json({status: true, data: cards});
    });
};

exports.filterGame = (req, res) => {
    // 筛选游戏逻辑
};

exports.gameDetail = (req, res) => {
    // 查询游戏详情
    
    const gameId = req.query.id;
    const sql = 'SELECT * FROM games WHERE id = ?';
    
    mysql.query(sql, gameId, (err, results) => {
        if (err) {
            console.error("Error querying game details: " + err);
            return res.json({ success: false, message: "查询游戏详情失败" });
        }
        if (results.length === 0) {
            return res.json({ success: false, message: "游戏不存在" });
        }
        const gameDetail = results[0];
        // 剔除不需要的字段
        const { image_url,category,original_price,sale_price, ...filteredGameDetail } = gameDetail;

        res.json({ success: true, data: filteredGameDetail });
    });

};

