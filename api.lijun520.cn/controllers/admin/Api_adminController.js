
//当前文件路径：controllers\admin\Api_adminController.js

const Admin = require('../../models/admin'); // 引入Admin模型

// 导入jwt,用于生成token
const jwt = require('jsonwebtoken')
// 导入jwt配置文件，用于加密跟解密
const jwtconfig = require('../../middlerware/jwt_config')
// 导入bcrypt加密中间件
const bcrypt = require('bcryptjs')


exports.adminLogin = (req, res) => {
    const { account, password } = req.body;
    if (!account ||!password) {
        return res.status(400).json({
            success: false,
            message: '账号和密码不能为空'
        });
    }

    // 在数据库中查找匹配账号的管理员记录
    Admin.findOne({
        where: {
            account: account
        }
    })
 .then((admin) => {
        if (admin) {
            // 比较输入密码和数据库中加密的密码
            const passwordMatch = bcrypt.compareSync(password, admin.password);
            if (passwordMatch) {
                // 生成JWT token
                const token = jwt.sign({ id: admin.id, account: admin.account }, jwtconfig.jwtSecretKey, { expiresIn: '1h' });
                res.json({
                    success: true,
                    message: '登录成功',
                    token: 'Bearer ' + token,
                    data: {
                        id: admin.id,
                        account: admin.account,
                        email: admin.email
                    }
                });
            } else {
                res.status(401).json({
                    success: false,
                    message: '密码错误'
                });
            }
        } else {
            res.status(401).json({
                success: false,
                message: '账号不存在'
            });
        }
    })
 .catch((error) => {
        console.error('登录查询出错:', error);
        res.status(500).json({
            success: false,
            message: '服务器内部错误'
        });
    });
};


