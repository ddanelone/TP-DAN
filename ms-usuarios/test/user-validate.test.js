import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '#App';
import { jwtSign } from 'jose';

chai.use(chaiHttp);
const { expect } = chai;

describe('Validate Token Controller', () => {
    it('should return valid true for a valid token', async () => {
        const encoder = new TextEncoder();
        const jwt = await jwtSign(
            { id: 1 },
            encoder.encode(process.env.JWT_PRIVATE_KEY),
            { algorithm: 'HS256', expiresIn: '1h' }
        );

        const res = await chai
            .request(app)
            .get('/validate')
            .set('Authorization', `Bearer ${jwt}`);

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('valid', true);
    });

    it('should return valid false for an invalid token', async () => {
        const res = await chai
            .request(app)
            .get('/validate')
            .set('Authorization', 'Bearer invalid_token');

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('valid', false);
    });

    it('should return valid false when no token is provided', async () => {
        const res = await chai.request(app).get('/validate');

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('valid', false);
    });
});
