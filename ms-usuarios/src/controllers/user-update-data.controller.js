import UserModel from '#Schemas/user.schema.js';
import bcrypt from 'bcrypt';

const userUpdateDataController = async (req, res) => {
    const { id } = req.params; // Obtener el id desde los parámetros de la URL
    const { name, surname, dni, email, password, role } = req.body;

    try {
        const existingUser = await UserModel.findByPk(id);

        if (!existingUser) {
            return res.status(404).send({ errors: ['Usuario no encontrado'] });
        }

        // Actualizar los campos del usuario
        existingUser.name = name;
        existingUser.surname = surname;
        existingUser.dni = dni;
        existingUser.email = email; // Actualizar el email si se proporciona
        existingUser.role = role; // Actualizar el rol si se proporciona

        // Si se proporciona una nueva contraseña, cifrarla antes de guardarla
        if (password) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            existingUser.password = hashedPassword;
        }

        await existingUser.save();

        // Evitar enviar la contraseña en la respuesta
        const updatedUser = {
            id: existingUser.id,
            name: existingUser.name,
            surname: existingUser.surname,
            dni: existingUser.dni,
            email: existingUser.email,
            role: existingUser.role,
            // No incluir password en el objeto devuelto
        };

        // Enviar el usuario actualizado como respuesta
        return res.status(200).send(updatedUser);
    } catch (error) {
        console.error('Error al actualizar los datos del usuario:', error);
        return res
            .status(500)
            .send({ errors: ['Error al actualizar los datos del usuario'] });
    }
};

export default userUpdateDataController;
