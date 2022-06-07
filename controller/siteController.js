const res = require("express/lib/response")
const Shoes = require('../modules/products')
const Mau = require('../modules/mausp')
const Chatlieu = require('../modules/chatlieu')
const Nsx = require('../modules/nsx')
const User = require('../modules/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Loaisp = require('../modules/loaiSP')
const Sequelize = require('sequelize')
var express = require("express");
const Op = Sequelize.Op
const { multipleMongooseToObject } = require('../util/mongoose')
const { mongooseToObject } = require('../util/mongoose')


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
class siteController {

    //[get] /      trang home , search, contact 
    index(req, res, next) {

        Shoes.find({})
            .skip(1)
            .limit(8)
            .then(tShoes => {
                res.render('home', { tShoes: multipleMongooseToObject(tShoes) })
            })
            .catch(next)

    }

    search(req, res, next) {
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



        const regex = new RegExp(escapeRegex(req.query.TenSP), 'gi')
        Shoes.find({ TenSP: regex })
            .then((tShoes) => {
                list.tShoes = multipleMongooseToObject(tShoes)
            })
            .then(() => {
                res.render('products', list)
            })
            .catch(next)
    }
}


module.exports = new siteController