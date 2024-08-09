// userUpdateDataDTO.js
import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';

const UpdateDataDTOSchema = Type.Object(
    {
        name: Type.String(),
        surname: Type.String(),
        dni: Type.String(),
        email: Type.String(), // Agregar el campo email si es necesario
        password: Type.String(), // Agregar el campo password si es necesario
        role: Type.Integer(),
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties: 'El formato del objeto no es válido',
        },
    }
);

const ajv = new Ajv({ allErrors: true })
    .addKeyword('kind')
    .addKeyword('modifier');
addErrors(ajv);

const validateSchema = ajv.compile(UpdateDataDTOSchema);

const userUpdateDataDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body);

    if (!isDTOValid) {
        return res.status(400).send({
            errors: validateSchema.errors.map((error) => error.message),
        });
    }

    next();
};

export default userUpdateDataDTO;
