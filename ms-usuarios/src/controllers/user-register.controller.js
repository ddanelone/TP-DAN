import { SALT } from '#Constants/salt.js';
import UserModel from '#Schemas/user.schema.js';
import { hash } from 'bcrypt';

const userRegisterController = async (req, res) => {
    const { name, surname, dni, email, password, role } = req.body;

    console.log('Usuario Recibido:', req.body); // Log de la respuesta
    try {
        // Verificar si ya existe un usuario con ese email
        const existingUserByEmail = await UserModel.findOne({
            where: { email },
        });

        if (existingUserByEmail) {
            return res.status(409).send({
                errors: ['Ya existe un usuario con ese email registrado'],
            });
        }

        // Hash de la contraseña
        const hashedPassword = await hash(password, SALT);

        // Crear nuevo usuario
        const newUser = await UserModel.create({
            name,
            surname,
            dni,
            email,
            password: hashedPassword,
            role,
        });

        // Obtener datos del usuario creado (excepto contraseña)
        const userData = {
            id: newUser.id,
            name: newUser.name,
            surname: newUser.surname,
            dni: newUser.dni,
            email: newUser.email,
            role: newUser.role,
        };

        console.log('Usuario registrado con éxito:', userData); // Log de la respuesta
        // Enviar respuesta con datos del usuario
        return res
            .status(201)
            .send({ message: 'Usuario registrado con éxito', user: userData });
    } catch (error) {
        console.error('Error al registrar usuario:', error); // Log del error completo
        return res
            .status(500)
            .send({ errors: ['Error al registrar usuario', error.message] }); // Enviar mensaje de error más detallado
    }
};

export default userRegisterController;
