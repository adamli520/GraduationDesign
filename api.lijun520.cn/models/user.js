const {  DataTypes } = require('sequelize');

// 假设已经在其他地方正确创建并导出了sequelize实例，这里引入
const sequelize = require('./index'); 

// 创建用户模型
const User = sequelize.define('User', {
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
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: '密码'
    },
    nickname: {
        type: DataTypes.STRING(30),
        comment: '昵称'
    },
    sex: {
        type: DataTypes.TINYINT.UNSIGNED,
        defaultValue: 1,
        comment: '性别：1男 2女'
    },
    mobile: {
        type: DataTypes.STRING(50),
        comment: '手机'
    },
    email: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '邮箱'
    },
    address: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '地址'
    },
    balance: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
        comment: '余额'
    },
    birthday: {
        type: DataTypes.DATE,
        comment: '生日'
    },
    created_at: {
        type: DataTypes.DATE,
        comment: '创建时间'
    },
    updated_at: {
        type: DataTypes.DATE,
        comment: '更新时间'
    },
    del: {
        type: DataTypes.TINYINT.UNSIGNED,
        defaultValue: 0,
        comment: '是否删除：0否 1是'
    }
}, {
    tableName: 'user',
    comment: '用户表',
    timestamps: false,
});

module.exports = User;