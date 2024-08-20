import userLoginController from '#Controllers/user-login.controller.js';
import userProfileController from '#Controllers/user-profile.controller.js';
import userRegisterController from '#Controllers/user-register.controller.js';
import userUnregisterController from '#Controllers/user-unregister.controller.js';
import userUpdateDataController from '#Controllers/user-update-data.controller.js';
import userUpdateEmailController from '#Controllers/user-update-email.controller.js';
import userUpdatePasswordController from '#Controllers/user-update-password.controller.js';
import getAllUsersController from '#Controllers/user-getAll.controller.js';
import getUserByIdController from '#Controllers/user-getById.controller.js';
import userDeleteController from '#Controllers/user-delete.controller.js';
import validateTokenController from '#Controllers/user-validate-token.controller.js'; // Agrega esta línea

import userJWTDTO from '#Dto/user-jwt.dto.js';
import userLoginDTO from '#Dto/user-login.dto.js';
import userRegisterDTO from '#Dto/user-register.dto.js';
import userUnregisterDTO from '#Dto/user-unregister.dto.js';
import userUpdateDataDTO from '#Dto/user-update-data.dto.js';
import userUpdateEmailDTO from '#Dto/user-update-email.dto.js';
import userUpdatePasswordDTO from '#Dto/user-update-password.dto.js';
import { Router } from 'express';

const userRouter = Router();

userRouter.post('/register', userRegisterDTO, userRegisterController);
userRouter.post('/login', userLoginDTO, userLoginController);
userRouter.get('/profile', userJWTDTO, userProfileController);

// Estos dos los agregué yo. Hay que cambiar el controller por uno nuevo
userRouter.get('/getAll', userJWTDTO, getAllUsersController);
userRouter.get('/get/:id', userJWTDTO, getUserByIdController);

userRouter.patch(
    '/update-data/:id',
    userJWTDTO,
    userUpdateDataDTO,
    userUpdateDataController
);

userRouter.patch(
    '/update-email',
    userJWTDTO,
    userUpdateEmailDTO,
    userUpdateEmailController
);

userRouter.patch(
    '/update-password',
    userJWTDTO,
    userUpdatePasswordDTO,
    userUpdatePasswordController
);

userRouter.delete(
    '/unregister',
    userJWTDTO,
    userUnregisterDTO,
    userUnregisterController
);

// Nuevo endpoint para eliminar un usuario por id (lo agregué a los fines prácticos)
userRouter.delete('/:id', userJWTDTO, userDeleteController);

// Nuevo endpoint para validar el token ---> Una crotera cósmica
userRouter.get('/validate', validateTokenController);

export default userRouter;
