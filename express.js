const express = require('express')

const bodyParser=require("body-parser");
const app = express()

// 参考资料 
// https://www.cnblogs.com/a-small-lyf/p/10766261.html
// https://www.cnblogs.com/lpxj-blog/p/10673441.html
// 创建application/json 解析器
var jsonParser = bodyParser.json()

// 创建 application/x-www-form-urlencoded 解析器
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.get('/img', function (req, res) {
  console.log('req:', req.method, req.query);
  // res.sendStatus(201)
  res.send('Hello World')
})

app.post('/iframe-post', jsonParser,function (req, res) {
// app.post('/iframe-post', urlencodedParser,function (req, res) {
  const id = req.body.id;
  const name = req.body.name;
  console.log('req:', req.method, name, id);
  // res.sendStatus(201)
  res.send({
    id,name
  })
})

app.listen(3007, () => {
  console.log(`http://localhost:3007`)
})