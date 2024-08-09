import UserModel from '#Schemas/user.schema.js';

export const getUserByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findByPk(id, {
            attributes: ['id', 'name', 'surname', 'dni', 'email', 'role'],
        });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user' });
    }
};

export default getUserByIdController;
