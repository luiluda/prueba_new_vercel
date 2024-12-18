const Proveedor = require('../models/proveedor');

// Controlador para agregar un proveedor
const agregarProveedor = async(req, res) => {
    try {
        const { ruc, proveedor, fecha_cosecha, fecha_envio, cantidad_kg, precio_por_kg } = req.body;

        const total_dolar = cantidad_kg * precio_por_kg;

        const nuevoProveedor = new Proveedor({
            ruc,
            proveedor,
            fecha_cosecha: new Date(fecha_cosecha),
            fecha_envio: new Date(fecha_envio),
            cantidad_kg,
            precio_por_kg,
            total_dolar
        });

        await nuevoProveedor.save();
        res.status(200).send('Proveedor agregado exitosamente');
    } catch (error) {
        res.status(400).send('Error al agregar proveedor: ' + error.message);
    }
};

// Controlador para obtener todos los proveedores
const obtenerProveedores = async(req, res) => {
    try {
        const proveedores = await Proveedor.find();
        res.status(200).json(proveedores);
    } catch (error) {
        res.status(400).send('Error al obtener proveedores: ' + error.message);
    }
};

module.exports = { agregarProveedor, obtenerProveedores };