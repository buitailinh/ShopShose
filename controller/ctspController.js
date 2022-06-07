const Shoes = require('../modules/products')
const Mau = require('../modules/mausp')
const Chatlieu = require('../modules/chatlieu')
const Nsx = require('../modules/nsx')
const User = require('../modules/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Loaisp = require('../modules/loaiSP')
const res = require("express/lib/response")
const { multipleMongooseToObject } = require('../util/mongoose')
const { mongooseToObject } = require('../util/mongoose')
class ctspController {


    show(req, res, next) {
        Shoes.findOne({ TenSP: req.params.TenSP })
            .then(tShoes =>
                res.render('SP/ctsp', { tShoes: mongooseToObject(tShoes) })
            )
            .catch(next)
    }

    create(req, res, next) {
        // res.render('SP/create')
        const list = {}

        Mau.find({})
            .then((tMau) => {
                list.tMau = multipleMongooseToObject(tMau)
            }).catch(next)
        Nsx.find({})
            .then((tNSX) => {
                list.tNSX = multipleMongooseToObject(tNSX)
            }).catch(next)
        Loaisp.find({})
            .then((tLoaiSP) => {
                list.tLoaiSP = multipleMongooseToObject(tLoaiSP)
            }).catch(next)
        Chatlieu.find({})
            .then((tChatLieu) => {
                list.tChatLieu = multipleMongooseToObject(tChatLieu)
            })
            .then(() => {
                res.render('SP/create', list)
            })



        //     Mau.find({})
        //         .then(tMau => {

        //             res.render('SP/create', { tMau: multipleMongooseToObject(tMau) })
        //         })
        //         .catch(next)
    }

    // post /ctsp/store
    store(req, res, next) {

        const shoes = new Shoes(req.body)
        shoes.save().then(() => res.redirect('/ctsp/store/aproduct'))
            .catch(next)
            // res.json(req.body)
    }
    adminkt(req, res, next) {
        var token = req.headers.cookie.split("=")[1]
        var decodeToken = jwt.verify(token, "mk")
        User.find({ _id: decodeToken._id }).then(function(data) {
            if (data.length == 0) {

                return res.redirect('/user/private')
            } else {
                if (data[0].admin == true) {

                    next()
                } else {
                    res.json('ban khong co quyen')
                }
            }
        })

    }
    adminnext(req, res) {
            res.json('ban la admin')
        }
        // get /ctsp/store/aproduct
    storeAproduct(req, res, next) {
        Promise.all([Shoes.find({}), Shoes.countDocumentsDeleted()])
            .then(([tShoes, deletedCount]) =>
                res.render('SP/store_aproduct', {
                    deletedCount,
                    tShoes: multipleMongooseToObject(tShoes)
                }))
            .catch(next)

    }
    edit(req, res, next) {
            // Shoes.findById(req.params.id)
            //     .then(tShoes => res.render('SP/edit', {
            //         tShoes: mongooseToObject(tShoes)
            //     }))
            //     .catch(next)
            const list = {}

            Mau.find({})
                .then((tMau) => {
                    list.tMau = multipleMongooseToObject(tMau)
                }).catch(next)
            Nsx.find({})
                .then((tNSX) => {
                    list.tNSX = multipleMongooseToObject(tNSX)
                }).catch(next)
            Loaisp.find({})
                .then((tLoaiSP) => {
                    list.tLoaiSP = multipleMongooseToObject(tLoaiSP)
                }).catch(next)
            Chatlieu.find({})
                .then((tChatLieu) => {
                    list.tChatLieu = multipleMongooseToObject(tChatLieu)
                }).catch(next)
            Shoes.findById(req.params.id)
                .then(tShoes => {
                    list.tShoes = mongooseToObject(tShoes)
                })
                .then(() => {
                    res.render('SP/edit', list)
                })
        }
        // put /ctsp/:id
    update(req, res, next) {
            // res.json(req.body)
            Shoes.updateOne({ _id: req.params.id }, req.body)
                .then(() => res.redirect('/ctsp/store/aproduct'))
                .catch(next)
        }
        // delete /ctsp/:id
    destroy(req, res, next) {
            Shoes.delete({ _id: req.params.id })
                .then(() => res.redirect('back'))
                .catch(next)
        }
        // delete
    forceDestroy(req, res, next) {
        Shoes.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
    trashAproduct(req, res, next) {
            Shoes.findDeleted({})
                .then(tShoes => res.render('SP/trash_aproduct', {
                    tShoes: multipleMongooseToObject(tShoes)
                }))
                .catch(next)
        }
        // /ctsp/:id/restore
    restore(req, res, next) {
        Shoes.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
}
module.exports = new ctspController