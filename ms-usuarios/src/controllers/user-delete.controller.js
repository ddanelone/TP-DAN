import UserModel from '#Schemas/user.schema.js';

const userDeleteController = async (req, res) => {
    const { id } = req.params; // El ID del usuario a eliminar obtenido desde la URL

    try {
        // Buscar el usuario en la base de datos por su ID
        const existingUser = await UserModel.findByPk(id);

        // Si no se encuentra al usuario, devolver un error de no encontrado
        if (!existingUser) {
            return res.status(404).send({ errors: ['Usuario no encontrado'] });
        }

        // Eliminar el usuario de la base de datos
        await existingUser.destroy();

        // Enviar una respuesta de éxito
        return res.send('Usuario eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        return res
            .status(500)
            .send({ errors: ['Error al eliminar el usuario'] });
    }
};

export default userDeleteController;
