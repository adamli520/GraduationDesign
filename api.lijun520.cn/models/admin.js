const {  DataTypes } = require('sequelize');
// 假设sequelize实例已经在index.js中创建并导出，这里引入
const sequelize = require('./index');

// 定义Admin模型
const Admin = sequelize.define('Admin', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    account: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '账号'
    },
    password: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '密码'
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '邮箱'
    },
    created_at: {
        type: DataTypes.DATE,
        comment: '创建时间'
    },
    updated_at: {
        type: DataTypes.DATE,
        comment: '更新时间'
    }
}, {
    tableName: 'admin',
    timestamps: false, // 这里假设数据库中的时间戳字段是手动管理，关闭Sequelize的自动时间戳功能
    comment: '管理员表'
});

module.exports = Admin;