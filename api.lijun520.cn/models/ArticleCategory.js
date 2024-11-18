const { DataTypes, Model } = require('sequelize');
const sequelize = require('./index');

class ArticleCategory extends Model {}

ArticleCategory.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT('long')
    }
}, {
    sequelize,
    modelName: 'ArticleCategory',
    timestamps: false,
    tableName: 'article_category'
});

module.exports = ArticleCategory;