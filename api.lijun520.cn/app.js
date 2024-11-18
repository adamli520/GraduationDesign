// app.js
const express = require('express');
const app = express();
// 导入cors
const cors = require('cors')
// 全局挂载
app.use(cors())

// 导入body-parser
var bodyParser = require('body-parser')
// 当extended为false时，值为数组或者字符串，当为ture时，值可以为任意类型
app.use(bodyParser.urlencoded({
	extended: false
}))
// parse application/json
app.use(bodyParser.json())

const jwtconfig = require('./middlerware/jwt_config.js')
const  {expressjwt: jwt} = require('express-jwt')
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(jwt({ secret: jwtconfig.jwtSecretKey,algorithms:['HS256'], }).unless({ path: [/^\/api\//] }))

const ApiuserRouter = require('./router/api/ApiuserRouter.js');
const ApiadminRouter = require('./router/admin/ApiadminRouter.js');
const ApigameRouter = require('./router/api/ApigameRouter.js');
const ApiarticleRouter = require('./router/api/ApiarticleRouter.js');
const shopCartRouter = require('./router/shopCartRouter');
const userRouter = require('./router/userRouter.js');
const adminRouter = require('./router/admin/adminRouter.js');
const adminUserRouter = require('./router/admin/userRouter.js');
const adminArticlesRouter = require('./router/admin/articlesRouter.js');
const adminGamesRouter = require('./router/admin/gamesRouter.js');
const adminArticleCategoryRouter = require('./router/admin/article_CategoryRouter.js');

app.use('/api/user', ApiuserRouter);
app.use('/api/admin', ApiadminRouter);
app.use('/api/game', ApigameRouter);
app.use('/api/article', ApiarticleRouter);
app.use('/shopCart', shopCartRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/admin/user', adminUserRouter);
app.use('/admin/article', adminArticlesRouter);
app.use('/admin/game', adminGamesRouter);
app.use('/admin/articlecategory', adminArticleCategoryRouter);

const Joi = require('joi')
// 对不符合joi规则的情况进行报错
app.use((err, req, res, next) => {
	if (err instanceof Joi.ValidationError) {
		// 提取错误信息
		const errorDetails = err.details.map(d => {
			return {
				message: d.message,
				path: d.path.join('.')
			};
		});
		const errorMessages = errorDetails.map(error => error.message);
		res.json({
			success: false,
			message: errorMessages,
			errors: errorDetails
		});
	}
	next(err);
})

//全局中间件
app.use((err, req, res, next) => {
	if (err && err.name === "UnauthorizedError") {
		res.status(401).send({
			status: 401,
			message: '无效的Token',
			errors: err
		})
	}

	// res.status(500).send({
	// 	status: 500,
	// 	message: '未知的错误',
	// 	errors: err
	// })
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

