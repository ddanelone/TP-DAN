import UserModel from '#Schemas/user.schema.js';
import { compare } from 'bcrypt';

const userUpdateEmailController = async (req, res) => {
    const { id } = req;
    const { email, password } = req.body;

    try {
        const existingUser = await UserModel.findByPk(id);

        if (!existingUser) {
            return res.status(401).send({ errors: ['Usuario no autorizado'] });
        }

        const checkPassword = await compare(password, existingUser.password);
        if (!checkPassword) {
            return res
                .status(401)
                .send({ errors: ['Credenciales incorrectas'] });
        }

        existingUser.email = email;

        await existingUser.save();

        return res.send('Email del usuario actualizado');
    } catch (error) {
        console.error('Error al actualizar el email del usuario:', error);
        return res
            .status(500)
            .send({ errors: ['Error al actualizar el email del usuario'] });
    }
};

export default userUpdateEmailController;
