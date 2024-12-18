// Importar el modelo de proveedor
const Proveedor = require('../models/proveedor');

/**
 * Controlador para agregar un proveedor
 * @param {Object} req - Solicitud HTTP
 * @param {Object} res - Respuesta HTTP
 */
const agregarProveedor = async (req, res) => {
    try {
        // Extraer datos del cuerpo de la solicitud
        const { ruc, proveedor, fecha_cosecha, fecha_envio, cantidad_kg, precio_por_kg } = req.body;

        // Validar que los campos requeridos no estén vacíos
        if (!ruc || !proveedor || !fecha_cosecha || !fecha_envio || !cantidad_kg || !precio_por_kg) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        // Calcular el total en dólares
        const total_dolar = cantidad_kg * precio_por_kg;

        // Crear un nuevo proveedor
        const nuevoProveedor = new Proveedor({
            ruc,
            proveedor,
            fecha_cosecha: new Date(fecha_cosecha),
            fecha_envio: new Date(fecha_envio),
            cantidad_kg,
            precio_por_kg,
            total_dolar
        });

        // Guardar el proveedor en la base de datos
        await nuevoProveedor.save();
        res.status(201).json({ message: 'Proveedor agregado exitosamente.' });
    } catch (error) {
        console.error('Error al agregar proveedor:', error.message);
        res.status(500).json({ error: `Error al agregar proveedor: ${error.message}` });
    }
};

/**
 * Controlador para obtener todos los proveedores
 * @param {Object} req - Solicitud HTTP
 * @param {Object} res - Respuesta HTTP
 */
const obtenerProveedores = async (req, res) => {
    try {
        // Obtener todos los proveedores de la base de datos
        const proveedores = await Proveedor.find();

        // Enviar la lista de proveedores como respuesta
        res.status(200).json(proveedores);
    } catch (error) {
        console.error('Error al obtener proveedores:', error.message);
        res.status(500).json({ error: `Error al obtener proveedores: ${error.message}` });
    }
};

// Exportar los controladores
module.exports = {
    agregarProveedor,
    obtenerProveedores,
};
