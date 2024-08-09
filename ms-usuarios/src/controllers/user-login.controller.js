import UserModel from '#Schemas/user.schema.js';
import { compare } from 'bcrypt';
import { SignJWT } from 'jose';

const userLoginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUserByEmail = await UserModel.findOne({
            where: { email },
        });

        if (!existingUserByEmail) {
            return res
                .status(401)
                .send({ errors: ['Credenciales incorrectas'] });
        }

        const checkPassword = await compare(
            password,
            existingUserByEmail.password
        );

        if (!checkPassword) {
            return res
                .status(401)
                .send({ errors: ['Credenciales incorrectas'] });
        }

        // Generar JWT
        const jwtConstructor = new SignJWT({ id: existingUserByEmail.id });

        const encoder = new TextEncoder();
        const jwt = await jwtConstructor
            .setProtectedHeader({
                alg: 'HS256',
                typ: 'JWT',
            })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

        const key = encoder.encode(process.env.JWT_PRIVATE_KEY);
        console.log(
            'Clave secreta SIN codificar: ',
            process.env.JWT_PRIVATE_KEY
        );
        console.log('Clave secreta utilizada para HMAC256 (Node.js):', key);

        // Obtener datos del usuario (excepto contraseña)
        const userData = {
            id: existingUserByEmail.id,
            name: existingUserByEmail.name,
            surname: existingUserByEmail.surname,
            dni: existingUserByEmail.dni,
            email: existingUserByEmail.email,
            role: existingUserByEmail.role,
        };

        // Enviar respuesta con JWT y datos del usuario
        return res.send({ jwt, user: userData });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).send({ errors: ['Error al iniciar sesión'] });
    }
};

export default userLoginController;
