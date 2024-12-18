const mongoose = require('mongoose');

// URL de conexión a MongoDB Atlas
const mongoURI = 'mongodb+srv://Prueba:QjdF3qd8w7i2P3AK@dev.sptuy.mongodb.net/';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexión exitosa a MongoDB Atlas');
    mongoose.disconnect(); // Desconectar después de la prueba
}).catch(err => {
    console.error('Error de conexión a MongoDB Atlas:', err.message);
});