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

class cartController {


    index(req, res, next) {
        res.render('cart/cart')
    }
    addcart(req, res, next) {}
}


module.exports = new cartController