const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    kodeFilm: {
        type : String
    },
    judulFilm: {
        type : String
    },
    sutradara: {
        type : String
    },
    genre: {
        type : String
    },
    durasi: {
        type : String
    },
    harga: {
        type : String
    },
    gambar: {
        type: String
    }

})

module.exports = mongoose.model('film', userSchema)
