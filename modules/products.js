const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema


const Shoe = new Schema({
    _id: { type: Number },
    TenSP: { type: String, required: true },
    GioiThieu: { type: String },
    TenMau: { type: String },
    Size: { type: Object },
    ChatLieu: { type: String },
    NSX: { type: String },
    Gia: { type: Number, required: true },
    TenLoai: { type: String },
    Anh: { type: Object },
    slug: { type: String, slug: 'TenSP', unique: true }
}, {
    _id: false,
    timestamps: true,
})

//add  plugins
mongoose.plugin(slug)
Shoe.plugin(AutoIncrement)
Shoe.plugin(mongooseDelete, { deleteAt: true, overrideMethods: 'all', })
module.exports = mongoose.model('Shoe', Shoe, 'tShoes')