import request from 'supertest';
import app from './app.js'; // Asume que tienes un archivo app.js o equivalente para configurar tu servidor Express
import UserModel from '#Schemas/user.schema.js';

// Mock the UserModel
jest.mock('#Schemas/user.schema.js');

describe('getUserByIdController', () => {
    it('should return user by id', async () => {
        const user = {
            id: 1,
            name: 'User1',
            surname: 'Surname1',
            dni: '12345678',
            email: 'user1@example.com',
            role: 'user',
        };
        UserModel.findByPk.mockResolvedValue(user);

        const response = await request(app).get('/users/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(user);
    });

    it('should return 404 if user is not found', async () => {
        UserModel.findByPk.mockResolvedValue(null);

        const response = await request(app).get('/users/1');

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('User not found');
    });

    it('should return 500 if there is an error fetching user', async () => {
        UserModel.findByPk.mockRejectedValue(new Error('Database error'));

        const response = await request(app).get('/users/1');

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Error fetching user');
    });
});
