import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import userRegisterController from '#Controllers/user-register.controller.js';
import UserModel from '#Schemas/user.schema.js';
import { hash } from 'bcrypt';

// PASÓ

const app = express();
app.use(bodyParser.json());
app.post('/register', userRegisterController);

jest.mock('#Schemas/user.schema.js');
jest.mock('bcrypt');

describe('userRegisterController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should register a new user successfully', async () => {
        UserModel.findOne.mockResolvedValue(null);
        hash.mockResolvedValue('hashedPassword');

        UserModel.create.mockResolvedValue({
            id: 1,
            name: 'John',
            surname: 'Doe',
            dni: '12345678',
            email: 'john.doe@example.com',
            password: 'hashedPassword',
            role: 0,
        });

        const res = await request(app).post('/register').send({
            name: 'John',
            surname: 'Doe',
            dni: '12345678',
            email: 'john.doe@example.com',
            password: 'Password123',
            role: 0,
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Usuario registrado con éxito');
        expect(res.body.user).toEqual({
            id: 1,
            name: 'John',
            surname: 'Doe',
            dni: '12345678',
            email: 'john.doe@example.com',
            role: 0,
        });
    });

    test('should return 409 if user with email already exists', async () => {
        UserModel.findOne.mockResolvedValue({ email: 'john.doe@example.com' });

        const res = await request(app).post('/register').send({
            name: 'John',
            surname: 'Doe',
            dni: '12345678',
            email: 'john.doe@example.com',
            password: 'Password123',
            role: 0,
        });

        expect(res.statusCode).toBe(409);
        expect(res.body.errors).toContain(
            'Ya existe un usuario con ese email registrado'
        );
    });

    test('should return 500 on server error', async () => {
        UserModel.findOne.mockRejectedValue(new Error('DB error'));

        const res = await request(app).post('/register').send({
            name: 'John',
            surname: 'Doe',
            dni: '12345678',
            email: 'john.doe@example.com',
            password: 'Password123',
            role: 0,
        });

        expect(res.statusCode).toBe(500);
        expect(res.body.errors).toContain('Error al registrar usuario');
    });
});
