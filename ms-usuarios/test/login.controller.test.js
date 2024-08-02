import request from 'supertest';
import app from './app.js'; // Asume que tienes un archivo app.js o equivalente para configurar tu servidor Express
import UserModel from '#Schemas/user.schema.js';
import { compare } from 'bcrypt';
import { SignJWT } from 'jose';

// Mock the UserModel
jest.mock('#Schemas/user.schema.js');
jest.mock('bcrypt');
jest.mock('jose');

describe('userLoginController', () => {
    it('should return 401 if email does not exist', async () => {
        UserModel.findOne.mockResolvedValue(null);

        const response = await request(app)
            .post('/login')
            .send({ email: 'nonexistent@example.com', password: 'password' });

        expect(response.status).toBe(401);
        expect(response.body.errors).toContain('Credenciales incorrectas');
    });

    it('should return 401 if password is incorrect', async () => {
        UserModel.findOne.mockResolvedValue({ password: 'hashedpassword' });
        compare.mockResolvedValue(false);

        const response = await request(app)
            .post('/login')
            .send({ email: 'user@example.com', password: 'wrongpassword' });

        expect(response.status).toBe(401);
        expect(response.body.errors).toContain('Credenciales incorrectas');
    });

    it('should return JWT and user data if login is successful', async () => {
        const user = {
            id: 1,
            name: 'Test',
            surname: 'User',
            dni: '12345678',
            email: 'user@example.com',
            password: 'hashedpassword',
            role: 'user',
        };
        UserModel.findOne.mockResolvedValue(user);
        compare.mockResolvedValue(true);
        const jwt = 'jwt-token';
        SignJWT.prototype.sign = jest.fn().mockResolvedValue(jwt);

        const response = await request(app)
            .post('/login')
            .send({ email: 'user@example.com', password: 'password' });

        expect(response.status).toBe(200);
        expect(response.body.jwt).toBe(jwt);
        expect(response.body.user).toEqual({
            id: user.id,
            name: user.name,
            surname: user.surname,
            dni: user.dni,
            email: user.email,
            role: user.role,
        });
    });

    it('should return 500 if there is an error during login', async () => {
        UserModel.findOne.mockRejectedValue(new Error('Database error'));

        const response = await request(app)
            .post('/login')
            .send({ email: 'user@example.com', password: 'password' });

        expect(response.status).toBe(500);
        expect(response.body.errors).toContain('Error al iniciar sesión');
    });
});
