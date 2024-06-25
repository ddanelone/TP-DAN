import UserModel from '#Schemas/user.schema.js';

const userProfileController = async (req, res) => {
    const { id } = req;

    try {
        const existingUserById = await UserModel.findByPk(id);

        if (!existingUserById) {
            return res.status(401).send({ errors: ['Usuario no autorizado'] });
        }

        const {
            id: userId,
            name,
            surname,
            dni,
            email,
            role,
        } = existingUserById;

        return res.send({ id: userId, name, dni, surname, email, role });
    } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        return res
            .status(500)
            .send({ errors: ['Error al obtener el perfil del usuario'] });
    }
};

export default userProfileController;
