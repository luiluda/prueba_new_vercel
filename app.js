const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const path = require('path');
//const { agregarProveedor, obtenerProveedores } = require('./src/controllers/proveedorController');

const proveedorRoutes = require('./src/models/proveedorRoutes');

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: 'https://prueba-new-vercel.vercel.app/', 
    methods: ['GET', 'POST','DELETE'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions)); 


// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/api', proveedorRoutes);

// Servir archivos estáticos de la carpeta "publico"
app.use(express.static(path.join(__dirname, 'publico')));

// Conexión a MongoDB Atlas (asegúrate de usar tu URL correcta)
const mongoUrl = 'mongodb+srv://Prueba:QjdF3qd8w7i2P3AK@dev.sptuy.mongodb.net/ingreso_producto'
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch(err => {
    console.error('Error al conectar a MongoDB:', err.message);
});

// Rutas
//app.use('/api', proveedorRoutes);


// Middleware para manejar rutas no encontradas
//app.use((req, res) => {
    //res.status(404).json({ error: 'Ruta no encontrada' });
//});

// Middleware para manejar errores genéricos
//app.use((err, req, res, next) => {
    //console.error('Error:', err.message);
    //res.status(500).json({ error: 'Error interno del servidor' });
//});



// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
