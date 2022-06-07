const { string } = require('mathjs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const NSX = new Schema({
    TenNSX: { type: String },
})
module.exports = mongoose.model('NSX', NSX, 'tNSX')