var express = require('express')
var router = express.Router()
var db = require('./connect')

var multer = require('multer')
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './assets/')
    }, filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

var upload = multer({storage: storage})

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
    const q = `select * from fishes where id = ${id}`
    db.query(q, (err, result) => {
        if(err) throw err
        res.send(result[0])
    })
})

// fish detail params
router.get('/get-fish/:id', (req, res) => {
    const id = req.params.id
    const q = `select * from fishes where id = ${id}`
    db.query(q, (err, result) => {
        if(err) throw err
        res.send(result[0])
    })
})

// insert fish
router.post('/insert-new-fish', upload.single('image'), (req, res) => {
    const data = req.body
    const file = req.file

    const filePath = `http://10.0.2.2:3000/${file.path.replace('\\', '/')}`

    const q = `insert into fishes (user_id, fish_type_id, name, description, price, image_path) 
                values (${data.userID}, ${data.fishType}, '${data.name}', '${data.desc}', ${data.price}, '${filePath}')`
    
    db.query(q, (err, result) => {
        if(err) throw err
        res.send(result)
    })

    res.json(file.path)
})

// update fish
router.put('/update-fish', upload.single('image'), (req, res) => {
    const data = req.body
    const file = req.file

    const filePath = `http://10.0.2.2:3000/${file.path.replace('\\', '/')}`

    const q = `update fishes set fish_type_id = ${data.fishType}, name = '${data.name}', description = '${data.desc}', price = ${data.price}, image_path = '${filePath}' where id = ${data.id}`
    
    db.query(q, (err, result) => {
        if(err) throw err
        res.send(result)
    })

    res.json(file.path)
})

// delete fish
router.delete('/delete-fish', (req, res) => {
    const data = req.body

    const q = `DELETE FROM fishes WHERE id = ${data.id}`

    db.query(q, (err, result) => {
        if(err) throw err
        res.send(result)
    })
})

module.exports = router;