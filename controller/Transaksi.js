const ModelAlbum = require('../model/Transaksi')
const Responses = require('../config/response')
const ObjectId = require('mongoose').Types.ObjectId


exports.transaksi = (data) =>
  new Promise((resolve, reject) => {
    ModelAlbum.create(data)
    .then(() => {
        console.log('Berhasil')
        resolve(Responses.commonSuccesMsg('Berhasil Transaksi'))
      }).catch((err) =>{
        console.log(err)
        reject(Responses.commonErrorMsg('Gagal melakukan Transaksi'))
      })
  })

exports.getAll = () =>
  new Promise((resolve, reject) => {
    ModelAlbum.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "username",
          foreignField: "userName",
          as: "dataUser"
        }
      }
    ])
    .then((data) => {
      console.log(data)
      resolve(Responses.commonResult(data))
    })
    .catch((err) =>{
      console.log(err)
      reject(Responses.commonErrorMsg('Gagal mendapatkan Data'))
    })
  })

exports.getTransaksiByIdUSer = (username) =>
  new Promise((resolve, reject) => {
    ModelAlbum.aggregate([
      {
        $match: {
          username: username
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "username",
          foreignField: "userName",
          as: "dataUser"
        }
      }
    ]).then((data) => {
      resolve(Responses.commonResult(data))
    }).catch((err) =>{
      console.log(err)
      reject(Responses.commonErrorMsg('Gagal mendapatkan Data'))
    })
  })

exports.UpdateTransaksi = (id, data) =>
  new Promise((resolve, reject) => {
    AlbumModel.updateOne({
      _id: ObjectId(id)
    }, {
      Status: data.Status
    })
    .then(() => resolve(Responses.commonSuccessMsg('Berhasil Merubah Data')))
    .catch((err) =>{
      console.log(err)
      reject(Responses.commonErrorMsg('Gagal Merubah Data'))
    })
  })

exports.deleteTransaksi = (id) =>
  new Promise((resolve, reject) => {
    ModelAlbum.deleteMany({
      username: id
    }).then(() => {
      resolve(Responses.commonSuccessMsg('Berhasil Hapus'))
    }).catch((err) =>{
      console.log(err)
      reject(Responses.commonErrorMsg('Gagal Hapus Data'))
    })
  })