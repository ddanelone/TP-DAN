import { Type } from '@sinclair/typebox';

export const idDTOSchema = Type.Integer({
    errorMessage: {
        type: 'El tipo de _id no es válido, debe ser un número entero',
    },
});

export const nameDTOSchema = Type.String({
    minLength: 2,
    maxLength: 20,
    errorMessage: {
        minLength: 'Nombre debe tener al menos 2 caracteres de longitud',
        maxLength: 'Nombre debe tener como máximo 20 caracteres de longitud',
    },
});

export const surnameDTOSchema = Type.String({
    minLength: 4,
    maxLength: 50,
    errorMessage: {
        minLength: 'Apellido debe tener al menos 4 caracteres de longitud',
        maxLength: 'Apellido debe tener como máximo 50 caracteres de longitud',
    },
});

export const dniDTOSchema = Type.String({
    minLength: 6,
    maxLength: 10,
    errorMessage: {
        minLength: 'El DNI debe tener al menos 6 dígitos de longitud',
        maxLength: 'El DNI debe tener como máximo 10 dígitos de longitud',
    },
});

export const emailDTOSchema = Type.String({
    format: 'email',
    errorMessage: {
        type: 'El tipo del email no es válido, debe ser un string',
        format: 'El formato del email no es válido, debe cumplir el RFC 5322',
    },
});

export const passwordDTOSchema = Type.String({
    minLength: 10,
    maxLength: 25,
    pattern: '(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])',
    errorMessage: {
        type: 'El tipo de la password no es válido, debe ser un string',
        pattern:
            'El formato de la password no es válido, debe contener una mayúscula, una minúscula y un número',
        minLength: 'password debe tener al menos 10 caracteres de longitud',
        maxLength: 'password debe tener como máximo 25 caracteres de longitud',
    },
});

export const roleDTOSchema = Type.Integer({
    errorMessage: {
        type: 'El tipo de role no es válido, debe ser un número entero',
    },
});
