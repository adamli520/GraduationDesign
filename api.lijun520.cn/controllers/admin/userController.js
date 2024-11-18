const User = require('../../models/user'); // 确保路径正确，指向用户模型定义的文件

exports.GetAlluser = (req, res) => {

    User.findAll()
      .then((users) => {
            res.send({
                msg: '查询所有用户成功',
                data: users
            });
        })
      .catch((error) => {
            console.error('查询所有用户出错: ', error);
            res.send({
                msg: '查询所有用户时出现错误'
            });
        });
};


exports.AddUser = (req, res) => {
    const newUser = req.body;
    User.create(newUser)
      .then((user) => {
            res.send({
                msg: '用户添加成功',
                data: user
            });
        })
      .catch((error) => {
            console.error('添加用户出错: ', error);
            res.send({
                msg: '添加用户时出现错误',
                error: error.message
            });
        });
};


exports.updateUser = (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    User.update(updateData, {
        where: { id }
    })
      .then(([rowsUpdated]) => {
            if (rowsUpdated > 0) {
                res.send({
                    msg: '用户更新成功'
                });
            } else {
                res.send({
                    msg: '未找到要更新的用户'
                });
            }
        })
      .catch((error) => {
            console.error('更新用户出错: ', error);
            res.send({
                msg: '更新用户时出现错误'
            });
        });
};


exports.deleteUser = (req, res) => {
    const id = req.params.id;
    User.destroy({
        where: { id }
    })
      .then((rowsDeleted) => {
            if (rowsDeleted > 0) {
                res.send({
                    msg: '用户删除成功'
                });
            } else {
                res.send({
                    msg: '未找到要删除的用户'
                });
            }
        })
      .catch((error) => {
            console.error('删除用户出错: ', error);
            res.send({
                msg: '删除用户时出现错误'
                });
        });
};