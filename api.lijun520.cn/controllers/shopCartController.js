const { db} = require('../db/index');
// 将数据库连接对象命名为 mysql
const mysql = db;

exports.addToCart = (req, res) => {
  const { game_id, quantity } = req.body;
  const userId = req.auth.id;
  const checkSql = `SELECT cart_id, quantity, unit_price FROM shopping_cart WHERE user_id = ${userId} AND game_id = ${game_id}`;
  mysql.query(checkSql, (err, result) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      return res.status(500).json({ error: 'An error occurred' });
    }

    if (result.length > 0) {
      
      const existingCartItem = result[0];
      const newQuantity = parseInt(existingCartItem.quantity) + parseInt(quantity);
      const updateSql = `UPDATE shopping_cart SET quantity = ${newQuantity} WHERE cart_id = ${existingCartItem.cart_id}`;
      
      mysql.query(updateSql, (err, result) => {
        if (err) {
          console.error('Error executing update query: ' + err.stack);
          return res.status(500).json({ error: 'An error occurred' });
        }
        res.json({ success: true, message: `你已购此游戏,现已加购: ${newQuantity}` });
      });
    } else {
      
      const selectGameSql = `SELECT name, sale_price FROM games WHERE id = ${game_id}`;
      mysql.query(selectGameSql, (err, gameResult) => {
        if (err) {
          console.error('Error executing query: ' + err.stack);
          return res.status(500).json({ error: 'An error occurred' });
        }
        if (gameResult.length > 0) {
          const game = gameResult[0];
          const unitPrice = game.sale_price;
          const gameName = game.name;

          const insertSql = `INSERT INTO shopping_cart (user_id, game_id, quantity, unit_price)
                             VALUES (${userId}, ${game_id}, ${quantity}, ${unitPrice})`;

          mysql.query(insertSql, (err, insertResult) => {
            if (err) {
              console.error('Error executing insert query: ' + err.stack);
              return res.status(500).json({ error: 'An error occurred' });
            }
            res.json({ success: true, message: `成功将 ${gameName} 加入购物车! 单价: ￥ ${unitPrice} 元` });
          });
        }
      });
    }
  });

};

exports.checkoutCart = (req, res) => {
  const { game_ids } = req.body;
  const user_id = req.auth.id;

  if (game_ids.length === 0) {
    return res.json({message:"请选择要结算的商品"});
  }

  const gameIdsString = game_ids.join(',');

  const sql = `SELECT games.id, games.name, shopping_cart.quantity, shopping_cart.unit_price
               FROM shopping_cart
               INNER JOIN user ON shopping_cart.user_id = user.id
               INNER JOIN games ON shopping_cart.game_id = games.id
               WHERE user.id = ${user_id} AND games.id IN (${gameIdsString})`;

  mysql.query(sql, (err, result) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      return res.json({ error: 'An error occurred' });
    }

    const rows = Array.isArray(result) ? result : [result];

    if (rows.length === 0) {
      return res.json({success:false,message:"购物车中没有选中的商品"});
    }

    let totalAmount = 0;
    const orderDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const orderStatus = 'Delivered';

    const insertOrderSql = `INSERT INTO orders (user_id, order_date, order_status, total_amount)
                            VALUES (${user_id}, '${orderDate}', '${orderStatus}', ${totalAmount})`;

    mysql.query(insertOrderSql, (err, result) => {
      if (err) {
        console.error('Error executing insert query: ' + err.stack);
        return res.json({ error: 'An error occurred' });
      }

      const orderId = result.insertId;

      rows.forEach(row => {
        totalAmount += row.quantity * row.unit_price;

        const insertOrderDetailSql = `INSERT INTO order_details (order_id, game_id, game_name, unit_price, quantity)
                                      VALUES (${orderId}, ${row.id}, '${row.name}', ${row.unit_price}, ${row.quantity})`;

        mysql.query(insertOrderDetailSql);
      });

      const updateOrderSql = `UPDATE orders SET total_amount = ${totalAmount} WHERE order_id = ${orderId}`;
      mysql.query(updateOrderSql);

      const deleteCartItemsSql = `DELETE FROM shopping_cart WHERE user_id = ${user_id} AND game_id IN (${gameIdsString})`;
      mysql.query(deleteCartItemsSql);

      res.json({ success:true,message:"订单结算成功"});
    });
  });
};

exports.deleteFromCart = (req, res) => {
   
  const { game_ids } = req.body;
  const userId = req.auth.id;

  if (!userId) {
    return res.status(401).send("未授权访问");
  }

  if (!game_ids || game_ids.length === 0) {
    return res.status(400).send("请选择要删除的商品");
  }

  const gameIdsString = game_ids.join(',');

  const sql = `DELETE FROM shopping_cart WHERE user_id = ${userId} AND game_id IN (${gameIdsString})`;

  mysql.query(sql, (err, result) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      return res.status(500).json({ error: 'An error occurred' });
    }

    console.log("成功删除购物车商品");
    // res.send("成功删除购物车商品");
    res.json({status:true,message:"成功删除购物车商品"});
  });
};


exports.Test = (req, res) => {
    console.log(req.auth);
   res.send({
    msg: '结算!',
    data:req.auth.admin
   })
};


exports.getCart=(req,res)=>{
    
    if(!req.auth.account){
     return res.sendStatus(401);
    }else{
        const account = req.auth.account;

        const sql = `SELECT games.id, games.name, shopping_cart.quantity, shopping_cart.unit_price
                     FROM shopping_cart
                     INNER JOIN user ON shopping_cart.user_id = user.id
                     INNER JOIN games ON shopping_cart.game_id = games.id
                     WHERE user.account = '${account}'`;
    
        mysql.query(sql, (err, result) => {
          if (err) {
            console.error('Error executing query: ' + err.stack);
            return res.status(500).json({ error: 'An error occurred' });
          }
    
          if (result.length > 0) {
            res.json({status:true,data:result});
          } else {
            res.json({status:false,data:[]});
          }
        });
    }

}

exports.update=(req,res)=>{
    const { game_id, quantity } = req.body;
    const userId = req.auth.id;
     // 查询购物车中是否已经存在该商品
  const checkIfExistsQuery = `SELECT * FROM shopping_cart WHERE user_id = ${userId} AND game_id = ${game_id}`;

  mysql.query(checkIfExistsQuery, (err, results) => {
    if (err) {
      console.error('Error checking if item exists in cart: ' + err.message);
      res.status(500).json({ error: 'An error occurred while checking if item exists in cart' });
    } else {
      if (results.length === 0) {
        // 如果购物车中不存在该商品，则返回提示信息
        res.json({ message: '购物车中不存在该商品' });
      } else {

        let newQuantity =parseInt(quantity);
        if (newQuantity < 1) {
          res.json({ message: '数量不能小于1' });
          return
        }

        const updateQuantityQuery = `UPDATE shopping_cart SET quantity = ${newQuantity} WHERE user_id = ${userId} AND game_id = ${game_id}`;

        mysql.query(updateQuantityQuery, (err, result) => {
          if (err) {
            console.error('Error updating cart item quantity: ' + err.message);
            res.status(500).json({ error: 'An error occurred while updating cart item quantity' });
          } else {
            res.json({success:true,message: '成功更新数量' });
          }
        });
      }
    }
  });  
}
