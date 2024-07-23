// #Controllers/user-validate-token.controller.js

import { jwtVerify } from 'jose';

const validateTokenController = async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(200).send({ valid: false });
    }

    const jwt = authorization.split(' ')[1];

    if (!jwt) {
        return res.status(200).send({ valid: false });
    }

    try {
        const encoder = new TextEncoder();
        await jwtVerify(jwt, encoder.encode(process.env.JWT_PRIVATE_KEY));
        return res.status(200).send({ valid: true });
    } catch (error) {
        return res.status(200).send({ valid: false });
    }
};

export default validateTokenController;
