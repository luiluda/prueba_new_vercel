const express = require('express');
const router = express.Router();
const { agregarProveedor, eliminarProveedor, obtenerProveedores } = require('../controllers/proveedorController');

// Rutas de proveedores
router.post('/add', agregarProveedor); // Agregar proveedor
router.delete('/:ruc', eliminarProveedor); // Eliminar proveedor por RUC
router.get('/proveedores', obtenerProveedores); // Obtener todos los proveedores

module.exports = router;
