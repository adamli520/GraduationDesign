// controllers/Api_userController.js
const { db, queryAsync } = require('../db/index');
// 将数据库连接对象命名为 mysql
const mysql = db;

// 导入jwt,用于生成token
const jwt = require('jsonwebtoken')
// 导入jwt配置文件，用于加密跟解密
const jwtconfig = require('../middlerware/jwt_config')
// 导入bcrypt加密中间件
const bcrypt = require('bcryptjs')

// 邮件发送模块
const Emailer = require('../utils/email-send')
const {render,generateCode} = require('../utils/html-render')

exports.userLogin = (req, res) => {
    const { account, password } = req.body;

    // 查询数据库，验证用户账号和密码
    const query = `SELECT * FROM user WHERE account = ?`;
    mysql.query(query, [account], (err, results) => {
        if (err) {
            res.status(500).json({ status:0,message: err });
        } else {
            if (results.length > 0) {
                const user = results[0];
                const passwordMatch = bcrypt.compareSync(password, user.password);
                if (!passwordMatch) {
                    return res.json({ success: false, message: '密码错误' });
                }
                // 生成 JWT token
                const token = jwt.sign({ id: user.id, account: user.account }, jwtconfig.jwtSecretKey, { expiresIn: '1h' });
                res.json({ 
                    success: true,
                    message: '登录成功',
                    token: 'Bearer ' + token, 
                });
            } else {
                res.json({  success:false ,message: '账号不存在' });
            }
        }
    });
};

// 存储验证码和时间戳，这里简化为存储在内存中
const verificationCodes = {};
exports.sendEmailCode= async(req,res)=>{
    const { account,emailaddress } = req.body;
    const code = generateCode(6);
    const currentTime = Date.now();
    
    
    verificationCodes[account] = { code, timestamp: currentTime };
    const html = await render('../views/email_code.ejs', { account, code })
    // 发送邮件
    try {
        let email = await Emailer.Emailer({
            from: {
                name: 'support@lijun520.cn',
                address: 'support@lijun520.cn'
            },
            //发送人
            to: emailaddress,//接收人
            subject: "邮箱验证码",//标题 
            text: "验证码验证", //存文本正文
            html//html正文
        })
        if (email) {
            res.json({success:true,message:'验证码发送成功！',data:req.body})
        }
    } catch (error) {
        console.error('发送邮件出错:', error);
        res.json({ message: '发送邮件出错' });
    }
}
// 公共方法，检查用户是否存在
const checkUserExists = async (account, email) => {
    const query = `SELECT * FROM user WHERE account = ? OR email = ?`;
    const rows = await queryAsync(query, [account, email]);
    return rows.length > 0;
};

exports.userRegister = async(req, res) => {
    // 用户注册逻辑
    
    console.log(req.body)
    const {account,password,confirmPassword,emailaddress,verificationCode}=req.body
    
    const userExists = await checkUserExists(account, emailaddress);
    if (userExists) {
        return res.json({ message: '用户名或邮箱地址已存在' });
    }
    if (!verificationCodes[account]) {
        return res.json({ message: '验证码不存在!或没有发送验证码！' });
    }
    // 检查密码是否匹配
    if (password !== confirmPassword) {
        return res.json({ message: '两次密码不匹配' });
    }

    const { code: storedCode, timestamp } = verificationCodes[account];
    const currentTime = Date.now();

   
    if (verificationCode === storedCode && currentTime - timestamp <= 120000) {
        // 验证码正确且在规定时间内   
    
           // 将用户信息添加到数据库
           hashedPassword=bcrypt.hashSync(password,10);
           const insertUserQuery = `INSERT INTO user (account, password, email) VALUES (?, ?, ?)`;
           const values = [account, hashedPassword, emailaddress];
           const result = await queryAsync(insertUserQuery, values);
           if (result.affectedRows === 1) {
               // 删除验证码
               delete verificationCodes[account];
               res.json({ success: true, message: '注册成功', data: req.body });
           }else{
                console.error('Error inserting user: ' + error);
                res.json({ message: '注册失败'+ error });
           }


    } else {
        // 验证码错误或已过期
        res.json({ message: '验证码错误或已过期' });
    }
  

};


// 获取用户信息 接收参数 id
exports.getUserInfo = (req, res) => {
    
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, jwtconfig.jwtSecretKey, (err, decoded) => {
        if (err) {
            res.status(401).json({ isLogin: false, message: err });
        } else {
            const id = decoded.id;
            const sql = 'SELECT * FROM user WHERE id = ?';
            mysql.query(sql, id, (err, result) => {
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
    });
    

}

// 用户提交反馈
exports.feedback = (req, res) => {
    const { email, content } = req.body;
    // 根据邮箱判断是否存在此用户，如果存在就插入反馈信息 不存在提示用户不存在
    // 查询用户是否存在
    const checkUserSql = `SELECT id,account FROM user WHERE email = '${email}'`;
    mysql.query(checkUserSql, (err, result) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            return res.status(500).json({ error: 'An error occurred' });
        }

        if (result.length > 0) {
            // 用户存在，插入反馈信息
            const userId = result[0].id;
            const name = result[0].account;
            const insertFeedbackSql = `INSERT INTO feedback (user_id, name, email, content) VALUES (${userId}, '${name}', '${email}', '${content}')`;
            mysql.query(insertFeedbackSql, (err, result) => {
                if (err) {
                    console.error('Error executing insert query: ' + err.stack);
                    return res.status(500).json({ error: 'An error occurred' });
                }
                res.json({success:true,message: email+': 反馈信息已提交' });
            });
        } else {
            // 用户不存在，提示用户不存在
            res.json({ message: '用户不存在，请检查邮箱是否正确' });
        }
    });
}

// 用户重置密码
exports.resetPassword=async (req,res)=>{
    const {account,password,emailaddress,verificationCode}=req.body

        const matchQuery = `SELECT * FROM user WHERE account = ? AND email = ?`;
        const values = [account, emailaddress];
        const rows = await queryAsync(matchQuery, values);
        if (rows.length === 0) {
            return res.json({ message: '用户不存在或邮箱不匹配' });
        }
   
    if (!verificationCodes[account]) {
        return res.json({ message: '验证码不存在!或没有发送验证码！' });
    }
    const { code: storedCode, timestamp } = verificationCodes[account];
    const currentTime = Date.now();
    if (verificationCode === storedCode && currentTime - timestamp <= 120000) {
        hashedPassword=bcrypt.hashSync(password,10);
        // 更新用户密码到数据库
        const updateQuery = `UPDATE user SET password = ? WHERE account = ?`;
        const updateValues = [hashedPassword, account];
        const rows= await queryAsync(updateQuery, updateValues);
        if(rows.affectedRows > 0){
            delete verificationCodes[account];
            res.json({ success:true,message: '修改密码成功', data: req.body });
        }else{
            res.json({ message: '修改密码失败' });
        }
        
        // try {
        //     await queryAsync(updateQuery, updateValues);
        //     res.json({ success:true,message: '修改密码成功', data: req.body });
        // } catch (error) {
        //     console.error('Error inserting user: ' + error);
        //     res.json({ message: '修改密码失败'+ error });
        // }


    } else {
        // 验证码错误或已过期
        res.json({ message: '验证码错误或已过期' });
    }

}