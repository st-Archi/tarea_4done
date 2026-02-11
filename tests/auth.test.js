const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');

describe('Pruebas de Autenticación', () => {
    
    // Limpiamos la base de datos de prueba antes de empezar
    beforeAll(async () => {
        await User.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('Debería registrar un nuevo usuario exitosamente', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                nombre: "Test User",
                email: "test@correo.com",
                password: "password123"
            });
        
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('msg', 'Usuario registrado con éxito');
    });

    it('Debería fallar el login con contraseña incorrecta', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: "test@correo.com",
                password: "wrongpassword"
            });
        
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg', 'Contraseña incorrecta');
    });
});