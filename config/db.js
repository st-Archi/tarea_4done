const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Usamos la variable de entorno que definiremos en el archivo .env
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1); // Detiene la app si falla la conexión
    }
};

module.exports = connectDB;