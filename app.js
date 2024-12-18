const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importamos CORS
const path = require('path');
const { agregarProveedor, obtenerProveedores } = require('./src/controllers/proveedorController');

// Configuración del servidor
const app = express();
const port = process.env.PORT || 3000;

// Configuración de CORS para permitir solicitudes solo desde tu dominio en Vercel
const corsOptions = {
    origin: 'https://prueba-new-vercel-rouge.vercel.app', // El dominio de tu frontend
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions)); // Habilitamos CORS para todas las rutas

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos de la carpeta "publico"
app.use(express.static(path.join(__dirname, 'publico')));

// Conexión a MongoDB Atlas (asegúrate de usar tu URL correcta)
const mongoUrl = 'mongodb+srv://Prueba:QjdF3qd8w7i2P3AK@dev.sptuy.mongodb.net/ingreso_producto';
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch(err => {
    console.error('Error al conectar a MongoDB:', err.message);
});

// Rutas
app.post('/api/add', agregarProveedor);
app.get('/api/proveedores', obtenerProveedores);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
