const bodyParser = require('body-parser')
const userRoutes = require('./routes/user')
const express = require('express')
const app = express()


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())
app.use('/api/users', userRoutes)

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
})


module.exports = app