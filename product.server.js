var express = require("express");
var config = require("./config/index")
var port = process.env.PORT || config.build.port;
var app = express();
var router = express.Router();
router.get("/", function (req, res, next) {
  req.url - 'index.html';
  next();
});
app.use(router);
var appData = require("./data.json"); //加载本地数据文件
var seller = appData.seller;// 获取数据文件中的seller值
var goods = appData.goods;// 获取本地文件中的goods值
var ratings = appData.ratings; // 获取本地文件中的ratings值
var apiRoutes = express.Router();
app.use('/api', apiRoutes);
app.get('/api/seller', (req, res) => {
  res.json({
    errno: 0,
    data: seller
  })
});
app.get('/api/goods', (req, res) => {
  res.json({
    errno: 0,
    data: goods
  })
});
app.get('/api/ratings', (req, res) => {
  res.json({
    errno: 0,
    data: ratings
  })
});
app.use(express.static('./dist'));
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Your application is running here: http://localhost:' + port);
})
