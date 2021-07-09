const film = require('../model/Film')
const response = require('../config/response')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.inputDataFilm = (data, gambar) =>
    new Promise(async (resolve, reject)=> {
        
        const filmBaru = new film({
            kodeFilm : data.kodeFilm,
            judulFilm : data.judulFilm,
            sutradara : data.sutradara,
            genre : data.genre,
            durasi : data.durasi,
            harga : data.harga,
            gambar : gambar
        })
        await film.findOne({kodeFilm: data.kodeFilm})
            .then(film => {
                if (film) {
                    reject(response.commonErrorMsg('Kode Film sudah terdaftar'))
                }else {
                    filmBaru.save()
                    .then(r=>{
                        resolve(response.commonSuccesMsg('Berhasil Menambahkan Data'))
                    }).catch(err=> {
                        reject(response.commonErrorMsg('Mohon Maaf Gagal Menambahkan Data'))
                    })
                }
            }).catch(err => {
                reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami'))
            })      
    })

exports.lihatDataFilm = () =>
    new Promise(async (resolve, reject) => {
       await film.find({})
            .then(result => {
                resolve(response.commonResult(result))
            })
            .catch(() => reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami')))
    })

    exports.lihatDetailDataFilm = (kodeFilm) =>
    new Promise(async (resolve, reject) => {
       await film.findOne({kodeFilm: kodeFilm})
            .then(result => {
                resolve(response.commonResult(result))
            })
            .catch(() => reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami')))
    })

exports.updateFilm = (id, data, gambar) =>
    new Promise(async (resolve, reject) => {
        await film.updateOne(
            {_id : ObjectId(id)},
            {
                $set: {
                    kodeFilm : data.kodeFilm,
                    judulFilm : data.judulFilm,
                    sutradara : data.sutradara,
                    genre : data.genre,
                    durasi : data.durasi,
                    harga : data.harga,
                    gambar : gambar
                }
            }
        ).then(film => {
            resolve(response.commonSuccesMsg('Berhasil Mengubah Data'))
        }).catch(err => {
            reject(response.commonErrorMsg('Mohon Maaf Gagal Menambahkan Data'))
        })
    })

exports.hapusfilm = (_id) =>
    new Promise (async (resolve, reject) => {
        await film.remove({_id: ObjectId(_id)})
        .then(() => {
            resolve(response.commonSuccesMsg ('Berhasil menghapus data'))
        }).catch(() => {
            reject(response.commonErrorMsg ('Maaf Terjadi Kesalahan Pada Server Kami'))
        })
    })
    