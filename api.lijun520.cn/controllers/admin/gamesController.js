
const Game = require('../../models/games');



// 获取所有游戏
exports.GetAllGames = (req, res) => {
    Game.findAll()
      .then((games) => {
            res.send({
                msg: '查询所有游戏成功',
                data: games
            });
        })
      .catch((error) => {
            console.error('查询所有游戏出错: ', error);
            res.send({
                msg: '查询所有游戏时出现错误'
            });
        });
};

// 添加新游戏
exports.AddGame = (req, res) => {
    const newGame = req.body;
    Game.create(newGame)
      .then((game) => {
            res.send({
                msg: '游戏添加成功',
                data: game
            });
        })
      .catch((error) => {
            console.error('添加游戏出错: ', error);
            res.send({
                msg: '添加游戏时出现错误',
                error: error.message
            });
        });
};

// 更新游戏
exports.updateGame = (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    Game.update(updateData, {
        where: { id }
    })
      .then(([rowsUpdated]) => {
            if (rowsUpdated > 0) {
                res.send({
                    msg: '游戏更新成功'
                });
            } else {
                res.send({
                    msg: '未找到要更新的游戏'
                });
            }
        })
      .catch((error) => {
            console.error('更新游戏出错: ', error);
            res.send({
                msg: '更新游戏时出现错误'
            });
        });
};

// 删除游戏
exports.deleteGame = (req, res) => {
    const id = req.params.id;
    Game.destroy({
        where: { id }
    })
      .then((rowsDeleted) => {
            if (rowsDeleted > 0) {
                res.send({
                    msg: '游戏删除成功'
                });
            } else {
                res.send({
                    msg: '未找到要删除的游戏'
                });
            }
        })
      .catch((error) => {
            console.error('删除游戏出错: ', error);
            res.send({
                msg: '删除游戏时出现错误'
            });
        });
};