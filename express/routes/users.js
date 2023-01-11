var express = require('express')
var router = express.Router()
var db = require('./connect')

/* GET users listing. */
router.get('/', function(req, res, next) {

  const q = "select * from users"
  db.query(q, (err, result) => {
    if(err) throw err
    res.send(result)
  })
})

// user detail params
router.get('/get-user/:id', (req, res) => {
  const id = req.params.id
  const q = `select * from users where id = ${id}`
  db.query(q, (err, result) => {
    if(err) throw err
    res.send(result[0])
  })
})

// register user
router.post('/register-user', (req, res) => {
  const data = req.body
  const q = `insert into users (email, username, password, token)
              values ('${data.email}', '${data.username}', '${data.password}', 12345)`

  db.query(q, (err, result) => {
    if(err) throw err
    res.send(result)
  })
})

module.exports = router;
