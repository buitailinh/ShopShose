const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const csruf = require('csurf')
const Schema = mongoose.Schema

const User = new Schema({
    Email: { type: String, unique: true, },
    Password: { type: String, },
    FirstName: { type: String },
    LastName: { type: String },
    DiaChi: { type: String },
    SDT: { type: Number },
    admin: { type: Boolean, default: false },
    slug: { type: String, slug: 'Email', unique: true }
}, {
    timestamps: true
})

mongoose.plugin(slug)
module.exports = mongoose.model('User', User, 'tUser')