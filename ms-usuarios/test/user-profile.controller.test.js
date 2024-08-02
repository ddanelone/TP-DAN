import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '#App';
import UserModel from '#Schemas/user.schema.js';
import { jwtSign } from 'jose';

chai.use(chaiHttp);
const { expect } = chai;

describe('User Profile Controller', () => {
    let user;
    let jwt;

    before(async () => {
        await UserModel.sync({ force: true }); // Limpia la tabla antes de los tests

        user = await UserModel.create({
            name: 'John',
            surname: 'Doe',
            dni: '12345678',
            email: 'john.doe@example.com',
            password: 'Password123',
            role: 1,
        });

        const encoder = new TextEncoder();
        jwt = await jwtSign(
            { id: user.id },
            encoder.encode(process.env.JWT_PRIVATE_KEY),
            { algorithm: 'HS256', expiresIn: '1h' }
        );
    });

    it('should return user profile for a valid token', async () => {
        const res = await chai
            .request(app)
            .get('/profile')
            .set('Authorization', `Bearer ${jwt}`);

        expect(res).to.have.status(200);
        expect(res.body).to.include({
            id: user.id,
            name: user.name,
            surname: user.surname,
            dni: user.dni,
            email: user.email,
            role: user.role,
        });
    });

    it('should return 401 for an invalid token', async () => {
        const res = await chai
            .request(app)
            .get('/profile')
            .set('Authorization', 'Bearer invalid_token');

        expect(res).to.have.status(401);
        expect(res.body.errors).to.include('Usuario no autorizado');
    });
});
