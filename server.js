const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();

// Middleware para entender JSON
app.use(express.json());

// Middleware para servir archivos estáticos (Para el login.html)
app.use(express.static(path.join(__dirname, 'public')));

// --- RUTAS DE LA API ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

// Ruta para ver el Login en el navegador (http://localhost:3000/login)
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Ruta de prueba inicial
app.get('/', (req, res) => res.send('API funcionando 🚀. Ve a /login para el formulario.'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));

module.exports = app;