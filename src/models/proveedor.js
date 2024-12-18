const mongoose = require('mongoose');

// Esquema del proveedor
const proveedorSchema = new mongoose.Schema({
    ruc: { type: String, required: true },
    proveedor: { type: String, required: true },
    fecha_cosecha: { type: Date, required: true },
    fecha_envio: { type: Date, required: true },
    cantidad_kg: { type: Number, required: true },
    precio_por_kg: { type: Number, required: true },
    total_dolar: { type: Number, required: true }
});

// Modelo de proveedor
const Proveedor = mongoose.model('Proveedor', proveedorSchema);

module.exports = Proveedor;