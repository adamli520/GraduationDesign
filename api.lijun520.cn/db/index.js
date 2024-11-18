// src: db/index.js

const mysql = require('mysql2');

// 数据库配置
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'api.admin.lijun520.cn'
}

// 创建连接池并赋值给db变量
const db =  mysql.createPool({
  connectionLimit: 5, // 连接池中允许的最大连接数
  ...dbConfig // 将dbConfig中的配置项传入连接池配置中
});

// 监听连接断开事件，自动重连
db.on('connection', (connection) => {
  console.log('数据库连接已建立');
  connection.on('error', (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('数据库连接丢失，尝试重新连接...');
      db.getConnection((error, newConnection) => {
        if (error) {
          console.error('重新连接失败: ' + error.stack);
        } else {
          console.log('重新连接成功');
        }
      });
    }
  });
});


// 设置字符集为UTF-8
// db.query('SET NAMES utf8', (err) => {
//   if (err) {
//     console.error('设置字符集失败: ' + err.stack);
//     return;
//   }
//   console.log('字符集设置成功');
// });

// 将 mysql.query 方法包装在 Promise 中
const queryAsync = (query, values) => {
  return new Promise((resolve, reject) => {
      db.query(query, values, (error, rows) => {
          if (error) {
              reject(error);
          } else {
              resolve(rows);
          }
      });
  });
};

module.exports = { db, queryAsync };
