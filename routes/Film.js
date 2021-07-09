const multer = require('multer')
const fs = require('fs')
const router = require('express').Router()
const film = require('../controller/Film')


var storage = multer.diskStorage({
    filename: function (req, file, cb) {
        let ext = file.originalname.substring(
            file.originalname.lastIndexOf("."),
            file.originalname.length
        )
        cb(null, Date.now() + ext);
    },
    destination: function (req, file, cb) {
        cb(null, './gambar')
    }
})

var upload = multer({storage: storage}).single("gambar")


router.post("/input", upload, (req, res) => {
    
    film.inputDataFilm(req.body, req.file.filename)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.get("/datafilm", (req, res) => {
    film.lihatDataFilm()
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.get("/datafilm/:id", (req, res) => {
    film.lihatDetailDataFilm(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.delete("/hapus/:id", (req, res) => {
    film.hapusfilm(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.put("/ubah/:id", upload, (req, res) => {
    let fileName;
    if (req.body.gambar) {
        fileName = req.body.gambar;
    }else {
        FileName = req.file.filename;
    }
    film.updateFilm(req.params.id, req.body, fileName)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

module.exports = router
