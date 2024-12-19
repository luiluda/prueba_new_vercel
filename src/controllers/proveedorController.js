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
        //if (!ruc || !proveedor || !fecha_cosecha || !fecha_envio || !cantidad_kg || !precio_por_kg) {
            //return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        //}

        // Validar que las fechas sean correctas
        //if (isNaN(new Date(fecha_cosecha)) || isNaN(new Date(fecha_envio))) {
            //return res.status(400).json({ error: 'Las fechas son inválidas.' });
        //}

        // Validar que los números sean positivos
        if (cantidad_kg <= 0 || precio_por_kg <= 0) {
            return res.status(400).json({ error: 'La cantidad de kg y el precio por kg deben ser números positivos.' });
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

/**
 * Controlador para eliminar un proveedor por su RUC
 * @param {Object} req - Solicitud HTTP
 * @param {Object} res - Respuesta HTTP
 */
const eliminarProveedor = async (req, res) => {
    try {
        const { ruc } = req.params; // Obtener el RUC del proveedor desde los parámetros de la URL

        // Buscar y eliminar el proveedor por el RUC
        const proveedorEliminado = await Proveedor.findOneAndDelete({ ruc });

        if (!proveedorEliminado) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }

        res.status(200).json({ message: 'Proveedor eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar proveedor:', error.message);
        res.status(500).json({ error: `Error al eliminar proveedor: ${error.message}` });
    }
};

// Exportar los controladores
module.exports = {
    agregarProveedor,
    obtenerProveedores,
    eliminarProveedor,  // Exportar la nueva función de eliminar
};
