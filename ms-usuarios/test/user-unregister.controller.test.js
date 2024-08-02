import request from 'supertest';
import app from './app.js'; // Asume que tienes un archivo app.js o equivalente para configurar tu servidor Express
import UserModel from '#Schemas/user.schema.js';
import { compare } from 'bcrypt';

// PASÓ OK

// Mock the UserModel
jest.mock('#Schemas/user.schema.js');
jest.mock('bcrypt');

describe('userUnregisterController', () => {
    it('should return 401 if user is not found', async () => {
        UserModel.findByPk.mockResolvedValue(null);

        const response = await request(app)
            .delete('/unregister')
            .send({ id: 1, password: 'password' });

        expect(response.status).toBe(401);
        expect(response.body.errors).toContain('Usuario no autorizado');
    });

    it('should return 401 if password is incorrect', async () => {
        UserModel.findByPk.mockResolvedValue({ password: 'hashedpassword' });
        compare.mockResolvedValue(false);

        const response = await request(app)
            .delete('/unregister')
            .send({ id: 1, password: 'wrongpassword' });

        expect(response.status).toBe(401);
        expect(response.body.errors).toContain('Credenciales incorrectas');
    });

    it('should delete user and return success message', async () => {
        const user = { destroy: jest.fn(), password: 'hashedpassword' };
        UserModel.findByPk.mockResolvedValue(user);
        compare.mockResolvedValue(true);

        const response = await request(app)
            .delete('/unregister')
            .send({ id: 1, password: 'password' });

        expect(response.status).toBe(200);
        expect(response.text).toBe('Usuario eliminado');
        expect(user.destroy).toHaveBeenCalled();
    });

    it('should return 500 if there is an error during deletion', async () => {
        UserModel.findByPk.mockRejectedValue(new Error('Database error'));

        const response = await request(app)
            .delete('/unregister')
            .send({ id: 1, password: 'password' });

        expect(response.status).toBe(500);
        expect(response.body.errors).toContain('Error al eliminar el usuario');
    });
});
