const express = require('express');
const router = express.Router();
const { agregarProveedor, eliminarProveedor, obtenerProveedores } = require('../controllers/proveedorController');

// Rutas de proveedores
router.post('/api/add', agregarProveedor); // Agregar proveedor
router.delete('/api/delete/:ruc', eliminarProveedor); // Eliminar proveedor por RUC
router.get('/api/proveedores', obtenerProveedores); // Obtener todos los proveedores

module.exports = router;
