const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    categoria: { type: String, required: true },
    stock: { type: Number, default: 0 }
}, { timestamps: true }); // Agrega fecha de creación y actualización automáticamente

module.exports = mongoose.model('Product', ProductSchema);