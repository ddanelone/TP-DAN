import request from 'supertest';
import app from './app.js'; // Asume que tienes un archivo app.js o equivalente para configurar tu servidor Express
import UserModel from '#Schemas/user.schema.js';

// Mock the UserModel
jest.mock('#Schemas/user.schema.js');

describe('userDeleteController', () => {
    it('should return 404 if user is not found', async () => {
        UserModel.findByPk.mockResolvedValue(null);

        const response = await request(app).delete('/users/1');

        expect(response.status).toBe(404);
        expect(response.body.errors).toContain('Usuario no encontrado');
    });

    it('should delete user and return success message', async () => {
        const user = { destroy: jest.fn() };
        UserModel.findByPk.mockResolvedValue(user);

        const response = await request(app).delete('/users/1');

        expect(response.status).toBe(200);
        expect(response.text).toBe('Usuario eliminado correctamente');
        expect(user.destroy).toHaveBeenCalled();
    });

    it('should return 500 if there is an error during deletion', async () => {
        UserModel.findByPk.mockRejectedValue(new Error('Database error'));

        const response = await request(app).delete('/users/1');

        expect(response.status).toBe(500);
        expect(response.body.errors).toContain('Error al eliminar el usuario');
    });
});
