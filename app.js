const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { agregarProveedor, obtenerProveedores } = require('./src/controllers/proveedorController');

// Configuración del servidor
const app = express();
const port = process.env.PORT || 3000;

// Habilitar CORS para todas las solicitudes
app.use(cors());

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos de la carpeta "publico"
app.use(express.static(path.join(__dirname, 'publico')));

// Obtener la URL de conexión desde las variables de entorno
const mongoUrl = process.env.MONGODB_URI || 'mongodb+srv://Prueba:QjdF3qd8w7i2P3AK@dev.sptuy.mongodb.net/ingreso_producto?retryWrites=true&w=majority&appName=Dev';

// Conexión a MongoDB Atlas
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Conectado a MongoDB');
})
.catch(err => {
    console.error('Error al conectar a MongoDB:', err.message);
});

// Rutas
app.post('/api/add', agregarProveedor);
app.get('/api/proveedores', obtenerProveedores);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
