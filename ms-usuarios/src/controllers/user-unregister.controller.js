import UserModel from '#Schemas/user.schema.js';
import { compare } from 'bcrypt';

const userUnregisterController = async (req, res) => {
    const { id } = req;
    const { password } = req.body;

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

        await existingUser.destroy();

        return res.send('Usuario eliminado');
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        return res
            .status(500)
            .send({ errors: ['Error al eliminar el usuario'] });
    }
};

export default userUnregisterController;
