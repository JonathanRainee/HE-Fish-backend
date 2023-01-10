var express = require('express')
var router = express.Router()
var db = require('./connect')

/* GET fishes listing. */
router.get('/', function(req, res, next) {

    const q = "SELECT * FROM fishes"
    db.query(q, (err, result) =>{
        if(err) throw err
        res.send(result)
    })
});

// fish detail query
router.get('/get-fish', (req, res) => {
    const id = req.query.id
    const q = select * from fishes where id = " +id
    res.send(id)
})

// fish detail params
router.get('/get-fish/:id', (req, res) => {
    const id = req.params.id
    res.send(id)
})

module.exports = router;