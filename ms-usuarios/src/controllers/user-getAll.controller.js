import UserModel from '#Schemas/user.schema.js';

export const getAllUsersController = async (req, res) => {
    try {
        const users = await UserModel.findAll({
            attributes: ['id', 'name', 'surname', 'dni', 'email', 'role'], // Puedes ajustar los campos según sea necesario
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
};

export default getAllUsersController;
