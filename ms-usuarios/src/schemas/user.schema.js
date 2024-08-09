import { DataTypes } from 'sequelize';
import { sequelize } from '#Config/db.js';

const UserModel = sequelize.define('Usuario', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 20],
        },
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4, 50],
        },
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 10],
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
});

UserModel.sync({ alter: true })
    .then(() => console.log('User table synced'))
    .catch((error) => console.error('Error syncing User table:', error));

export default UserModel;
