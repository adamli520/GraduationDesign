// controllers/userController.js

const { db } = require('../db/index');
// 将数据库连接对象命名为 mysql
const mysql = db;


exports.Test = (req, res) => {
    res.send('test 测试测试！')
};

// 获取用户信息 接收参数 id
exports.getUserInfo = (req, res) => {
    // console.log("当前路由"+req.auth.id)
        if(!req.auth.id){
            return res.sendStatus(401);
        }else{
            const sql = 'SELECT * FROM user WHERE id = ?';
            mysql.query(sql, req.auth.id, (err, result) => {
                if (err) {
                    return res.cc(err);
                }
                if (result.length === 0) {
                    res.status(401).json({ isLogin: false, message: '用户不存在' });
                } else {
                    // 删除密码属性
                    delete result[0].password;
                    res.json({ isLogin: true, message: '用户已登录', data: result[0] });
                }
            });
        }

}

exports.viewOrders= (req, res) => {
    if(!req.auth.id){
        return res.sendStatus(401);
    }else{
        const query = `SELECT o.order_id, o.order_date, o.order_status, o.total_amount, od.game_name, od.unit_price, od.quantity 
        FROM orders o 
        INNER JOIN order_details od ON o.order_id = od.order_id 
        WHERE o.user_id = (SELECT id FROM user WHERE id = ?)`;

        mysql.query(query,req.auth.id,(err,result)=>{
            if (err) {
                console.error("Error querying database: " + err);
                return res.status(500).json({ success: false, message: "获取订单历史失败" });
            }

            if (result.length > 0) {
                return res.status(200).json({ success: true, data: result });
            } else {
                return res.json({ success: false, message: "未找到订单历史" });
            }
                
        })               
    }
    
}

exports.recharge= (req, res) => {
    const id = req.auth.id;
    const amount = parseInt(req.body.amount)
    if (amount<=0) {
        return res.json({ success: false, message: "充值金额大于0" });
    }
    const getBalanceQuery = `SELECT balance FROM user WHERE id = ? `;
    mysql.query(getBalanceQuery, id, (err, result) => {
        if (err) {
            console.error("Error querying database: " + err);
            return res.json({ success: false, message: "获取用户余额失败" });
        }

        if (result.length > 0) {
            const balance = parseInt(result[0].balance);
            const newBalance = balance + amount;

            const updateBalanceQuery = `UPDATE user SET balance = ? WHERE id = ?`;
            mysql.query(updateBalanceQuery, [newBalance, id], (err,) => {
                if (err) {
                    console.error("Error updating balance: " + err);
                    return res.json({ success: false, message: "充值失败" });
                }

                return res.status(200).json({
                    success: true,
                    message: "充值成功",
                    data: {
                        balance: newBalance
                    }
                });
            });
        } 
    });
}

exports.viewFeedback= (req, res) => {
    const query = `SELECT * FROM feedback WHERE user_id = (SELECT id FROM user WHERE id = ?)`;
    mysql.query(query, req.auth.id, (err, result) => {
        if (err) {
            console.error("Error querying database: " + err);
            return res.status(500).json({ success: false, message: "获取反馈信息失败" });
        }

        if (result.length > 0) {
            return res.status(200).json({ success: true, data: result });
        } else {
            return res.json({ success: false, message: "未找到反馈信息" });
        }
    });
}

exports.updateUserInfo= (req, res) => {
   
    const { nickname, sex, mobile, email, address } = req.body;
    const account = req.auth.account; 

    // 更新数据库中的用户信息
    const query = `UPDATE user SET nickname = '${nickname}', sex = '${sex}', mobile = '${mobile}', email = '${email}', address = '${address}' WHERE account = '${account}'`;
    
    mysql.query(query, (err, result) => {
        if (err) {
            console.error("Error updating user info: " + err);
            return res.status(500).json({ success: false, message: "保存用户信息失败" });
        }
        res.json({ success: true,message: "更新用户信息成功" });
    });
}

