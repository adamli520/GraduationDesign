const { DataTypes, Model } = require('sequelize');
const sequelize = require('./index'); // 假设这里是正确引入 Sequelize 实例的路径

class Game extends Model {}

Game.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: '游戏名'
    },
    image_url: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: '游戏的图片地址'
    },
    developer: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: '开发商'
    },
    publisher: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: '发行商'
    },
    category: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: '类别'
    },
    original_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 100.00,
        comment: '原价'
    },
    sale_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 50.00,
        comment: '活动价格'
    },
    description: {
        type: DataTypes.TEXT,
        comment: '游戏描述'
    },
    reviews: {
        type: DataTypes.TEXT,
        comment: '鉴赏家点评'
    }
}, {
    sequelize,
    modelName: 'Game',
    tableName: 'games',
    timestamps: false,
    comment: '游戏数据表'
});

module.exports = Game;