import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '#App';
import UserModel from '#Schemas/user.schema.js';
import { jwtSign } from 'jose';
import { hash } from 'bcrypt';

chai.use(chaiHttp);
const { expect } = chai;

describe('User Update Data Controller', () => {
    let user;
    let jwt;

    before(async () => {
        await UserModel.sync({ force: true }); // Limpia la tabla antes de los tests

        user = await UserModel.create({
            name: 'John',
            surname: 'Doe',
            dni: '12345678',
            email: 'john.doe@example.com',
            password: await hash('Password123', 10),
            role: 1,
        });

        const encoder = new TextEncoder();
        jwt = await jwtSign(
            { id: user.id },
            encoder.encode(process.env.JWT_PRIVATE_KEY),
            { algorithm: 'HS256', expiresIn: '1h' }
        );
    });

    it('should update user data', async () => {
        const updatedData = {
            name: 'Johnny',
            surname: 'Doer',
            dni: '87654321',
            email: 'johnny.doer@example.com',
            role: 2,
        };

        const res = await chai
            .request(app)
            .patch(`/update-data/${user.id}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send(updatedData);

        expect(res).to.have.status(200);
        expect(res.body).to.include(updatedData);
    });

    it('should return 404 if user not found', async () => {
        const updatedData = {
            name: 'Johnny',
            surname: 'Doer',
            dni: '87654321',
            email: 'johnny.doer@example.com',
            role: 2,
        };

        const res = await chai
            .request(app)
            .patch('/update-data/999999') // ID que no existe
            .set('Authorization', `Bearer ${jwt}`)
            .send(updatedData);

        expect(res).to.have.status(404);
        expect(res.body.errors).to.include('Usuario no encontrado');
    });

    it('should update user password if provided', async () => {
        const updatedData = {
            password: 'NewPassword123',
        };

        const res = await chai
            .request(app)
            .patch(`/update-data/${user.id}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send(updatedData);

        expect(res).to.have.status(200);

        const updatedUser = await UserModel.findByPk(user.id);
        const isPasswordMatch = await bcrypt.compare(
            updatedData.password,
            updatedUser.password
        );
        expect(isPasswordMatch).to.be.true;
    });
});
