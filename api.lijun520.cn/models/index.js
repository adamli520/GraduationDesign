const { Sequelize } = require('sequelize');

// 创建Sequelize实例
const sequelize = new Sequelize('api.admin.lijun520.cn', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    // 以下是一些可选的配置参数
    logging: console.log, // 打印执行的SQL语句
    pool: {
        max: 5, // 连接池中最大连接数
        min: 0, // 连接池中最小连接数
        acquire: 30000, // 获取连接的最大超时时间（毫秒）
        idle: 10000 // 连接的最大空闲时间（毫秒）
    }
});

// 测试数据库连接
sequelize.authenticate()
  .then(() => {
        console.log('模型：数据库连接成功');
        // 在这里可以继续进行其他操作，比如定义模型、执行查询等
    })
  .catch(err => {
        console.error('模型：无法连接数据库:', err);
    });

module.exports = sequelize;