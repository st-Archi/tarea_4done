const request = require('supertest');
const app = require('../server'); // Importamos tu server.js
const mongoose = require('mongoose');

describe('Pruebas Unitarias - CRUD Productos', () => {
    
    // Cerramos la conexión a la DB después de las pruebas para que Jest no se quede colgado
    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('Debería denegar el acceso a GET /api/products si no hay Token', async () => {
        const res = await request(app)
            .get('/api/products')
            .send();
        
        // Esperamos un 401 (Unauthorized)
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('msg', 'Acceso denegado. No hay token.');
    });

    it('Debería fallar al intentar crear un producto sin datos (bad request)', async () => {
        // Para esta prueba, simulamos que tenemos token pero enviamos datos vacíos
        // Nota: En una prueba real necesitarías un token válido generado en un "beforeAll"
        const res = await request(app)
            .post('/api/products')
            .set('Authorization', 'Bearer token_falso') 
            .send({});
        
        // Como el token es falso, debería dar 401 o 400
        expect(res.statusCode).toBe(401);
    });
});