const Admin = require('../../models/admin'); // 引入Admin模型


exports.Getinfor = (req, res)=> {
    if(!req.auth.id){
        return res.send({
            msg:'未授权或者未登录'
        })
    }
      // 使用 Sequelize 查询管理员信息
      Admin.findByPk(req.auth.id)
      .then((admin) => {
           if (admin) {
               res.send({
                   msg: '查询成功',
                   data: admin
               });
           } else {
               res.send({
                   msg: '管理员信息未找到'
               });
           }
       })
      .catch((error) => {
           console.error('查询管理员信息出错: ', error);
           res.send({
               msg: '查询管理员信息时出现错误'
           });
       });
}


exports.updateAdmin= (req, res)=> {
    const updateData = {};
    const allowedFields = ['account', 'password', 'email']; // 可更新的字段

    allowedFields.forEach((field) => {
        if (req.body[field]!== undefined) {
            updateData[field] = req.body[field];
        }
    });

    if (Object.keys(updateData).length === 0) {
        return res.send({ msg: '没有要更新的有效字段' });
    }

    Admin.update(updateData, {
        where: {
            id: req.auth.id
        }
    })
      .then(([rowsUpdated]) => {
            if (rowsUpdated > 0) {
                res.send({ msg: '管理员信息更新成功' });
            } else {
                res.send({ msg: '未找到要更新的管理员记录' });
            }
        })
      .catch((error) => {
            console.error('更新管理员信息出错: ', error);
            res.send({ msg: '更新管理员信息时出现错误' });
        });
}