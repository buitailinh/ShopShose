const User = require('../modules/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const res = require("express/lib/response")
const { multipleMongooseToObject } = require('../util/mongoose')
const { mongooseToObject } = require('../util/mongoose')
const { use } = require('../router/user')
const user = require('../modules/user')
const { re } = require('mathjs')
const { redirect } = require('express/lib/response')


var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

function isEmailValid(email) {
    if (!email)
        return false;

    if (email.length > 254)
        return false;

    var valid = emailRegex.test(email);
    if (!valid)
        return false;

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if (parts[0].length > 64)
        return false;

    var domainParts = parts[1].split(".");
    if (domainParts.some(function(part) { return part.length > 63; }))
        return false;

    return true;
}
class userController {

    index(req, res, next) {
        User.find({})
            .then(() => {
                res.render('user/register')
            })
            .catch(next)
    }

    store(req, res, next) {

            const salt = bcrypt.genSalt(10)
            const hashed = bcrypt.hash(req.body.Password, salt)

            var Email = req.body.Email
            var Password = req.body.Password
            var FirstName = req.body.FirstName
            var LastName = req.body.LastName
            var DiaChi = req.body.DiaChi
            var SDT = req.body.SDT
            var d = 0;
            if (!Email) {
                d++
                res.render('user/register', {
                    err2: 'email ko dc de trong!'
                })
            }

            if (isEmailValid(Email) === false) {
                d++
                res.render('user/register', {
                    err2: 'email khong dung dinh dang!'
                })
            }

            if (!Password) {
                d++
                res.render('user/register', {
                    err3: 'password ko dc de trong!'
                })
            }

            if (!SDT) {
                d++
                res.render('user/register', {
                    err4: 'Vui long nhap SDT'
                })
            }


            // Check for errors
            if (d === 0) {
                if (Password.length < 8) {

                    d++
                    res.render('user/register', {
                        err3: 'password phai toi da 8 ki tu '
                    })
                } else {

                    // Validate Fields

                    User.findOne({
                        Email: Email
                    }).then(data => {
                        if (data) {
                            res.render('user/register', {
                                err1: 'Tai khoan da ton tai!'
                            })
                        } else {
                            return User.create({
                                Email: Email,
                                Password: Password,
                                FirstName: FirstName,
                                LastName: LastName,
                                DiaChi: DiaChi,
                                SDT: SDT
                            })
                        }

                    }).then(data => {
                        //res.json('Tao tai khoan thanh cong')
                        if (data) {

                            res.render('user/login')
                        }
                    }).catch(err => {
                        // res.status(500).json('Tao tai khoan that bai')
                        res.json(err)
                    })


                    // const user = await newUser.save().then(() => res.redirect('/'))
                    // res.status(200).json(user)
                }

            }
        }
        //res.json(req.body)
        // user.save().then(() => res.redirect('/'))
        //     .catch(next)


    // const shoes = new Shoes(req.body)

    // res.json(req.body)

    show(req, res, next) {
        User.find({})
            .then(() => {
                res.render('user/login')
            })
            .catch(next)
    }

    login(req, res, next) {
        var Email = req.body.Email
        var Password = req.body.Password
        User.findOne({
                Email: Email,
                Password: Password,
            }).then(data => {

                if (data) {
                    var token = jwt.sign({
                        _id: data._id
                    }, 'mk')
                    res.json({
                        message: 'Dang nhap thanh cong',
                        token: token,
                        email: Email,
                        redirect: '/',
                    })


                } else {
                    return res.json({ message: 'Email hoac mat khau khong dung!', redirect: '/user/login' })
                }

            })
            .catch(err => {
                res.status(500).json('loi server')
            })


    }


    private1(req, res, next) {
        try {
            var token = req.cookies.token
            var kq = jwt.verify(token, 'mk')
            var user = User.findOne(token.Email)
                // console.log(user)
                // res.data = user
            if (kq) {
                next()
            }
        } catch (error) {
            res.redirect('/user/login')

        }

    }
    private2(req, res, next) {
        // req.flash('success_msg', 'You are now registered. Log In!');
        res.redirect('/')
    }

    logout(req, res, next) {
        res.clearCookie('token');
        res.redirect('/')
    }
    profile(req, res, next) {
        User.findOne({ id: req.params._id })
            .then(tUser =>
                res.render('user/profile', { tUser: mongooseToObject(tUser) })
            )
            .catch(next)
    }

    //     checklogin(req, res, next) {
    //         try {
    //             var token = req.cookies.token
    //             var idUser = jwt.verify(token, 'mk')
    //             User.findOne({
    //                     _id: idUser
    //                 })
    //                 .then(data => {
    //                     if (data) {
    //                         req.data = data
    //                         next()
    //                     } else {
    //                         res.json('Ban ko co du quyen')
    //                     }
    //                 })
    //                 .catch(err => {})

    //         } catch (error) {
    //             res.status(500).json('token ko hon le')
    //         }

    //     }
    //     checkcustom(req, res, next) {
    //         if (req.data.admin === false) {
    //             next()
    //         } else {
    //             res.json('Ban ko co quyen')
    //         }
    //     }
    //     checkadmin(req, res, next) {
    //         if (req.data.admin === true) {
    //             next()
    //         } else {
    //             res.json('Ban ko co quyen')
    //         }
    //     }
    //     admin1(req, res, next) {
    //         res.json('All')
    //     }
    //     custom1(req, res, next) {
    //         res.json('custom')
    //     }

}


module.exports = new userController