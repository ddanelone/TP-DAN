import { SALT } from '#Constants/salt.js';
import UserModel from '#Schemas/user.schema.js';
import { compare, hash } from 'bcrypt';

const userUpdatePasswordController = async (req, res) => {
    const { id } = req;
    const { oldPassword, newPassword } = req.body;

    try {
        const existingUser = await UserModel.findByPk(id);

        if (!existingUser) {
            return res.status(401).send({ errors: ['Usuario no autorizado'] });
        }

        const checkPassword = await compare(oldPassword, existingUser.password);
        if (!checkPassword) {
            return res
                .status(401)
                .send({ errors: ['Credenciales incorrectas'] });
        }

        const hashedPassword = await hash(newPassword, SALT);
        existingUser.password = hashedPassword;

        await existingUser.save();

        return res.send('Contraseña del usuario actualizada');
    } catch (error) {
        console.error('Error al actualizar la contraseña del usuario:', error);
        return res.status(500).send({
            errors: ['Error al actualizar la contraseña del usuario'],
        });
    }
};

export default userUpdatePasswordController;
