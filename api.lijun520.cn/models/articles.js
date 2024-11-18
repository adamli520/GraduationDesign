const { DataTypes, Model } = require('sequelize');
const sequelize = require('./index'); // 假设这里是正确引入 Sequelize 实例的路径

class Article extends Model {}

Article.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        get() {
            return this.getDataValue('title');
        }
    },
    summary: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    views: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    },
    likes: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    thumbnail: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Article',
    tableName: 'articles',
    timestamps: false, // 因为表中已经有 created_at 和 updated_at 字段，这里关闭自动时间戳功能
});

// 定义关联（如果需要在模型中体现外键关系）
Article.associate = function(models) {
    Article.belongsTo(models.User, { foreignKey: 'author_id', onDelete: 'restrict', onUpdate: 'restrict' });
    Article.belongsTo(models.ArticleCategory, { foreignKey: 'category_id', onDelete: 'restrict', onUpdate: 'restrict' });
};

module.exports = Article;