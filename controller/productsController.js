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
const PAGE_SIZE = 12
class productsController {

    index(req, res, next) {
        var page = req.query.page
        if (page) {

            page = parseInt(page)
            var S = (page - 1) * PAGE_SIZE
            const list = {}

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
            Shoes.find({})
                .skip(S)
                .limit(PAGE_SIZE)
                .then(tShoes => {

                    list.tShoes = multipleMongooseToObject(tShoes)
                }).then(() => {
                    res.render('products', list)
                })
                .catch(next)


        } else {

            const list = {}


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

            Shoes.find({})
                .then((tShoes) => {
                    list.tShoes = multipleMongooseToObject(tShoes)

                }).then(() => {
                    res.render('products', list)
                })
                .catch(next)
        }
    }

    show(req, res, next) {
        const list = {}


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

        Shoes.find({ TenLoai: req.params.TenLoai })
            .then((tShoes) => {
                list.tShoes = multipleMongooseToObject(tShoes)
            })
            .then(() => {
                res.render('products', list)
            })
            .catch(next)
    }

    nsx(req, res, next) {
        const list = {}


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

        Shoes.find({ NSX: req.params.NSX })
            .then((tShoes) => {
                list.tShoes = multipleMongooseToObject(tShoes)
            })
            .then(() => {
                res.render('products', list)
            })
            .catch(next)
    }

}
module.exports = new productsController