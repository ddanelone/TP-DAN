"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _salt = require("#Constants/salt.js");

var _userSchema = _interopRequireDefault(require("#Schemas/user.schema.js"));

var _bcrypt = require("bcrypt");

var _rabbitMQ = require("#Config/rabbitMQ.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Importa la función para enviar mensajes
var userRegisterController = function userRegisterController(req, res) {
  var _req$body, name, surname, dni, email, password, role, existingUserByEmail, hashedPassword, newUser, clienteData, userData;

  return regeneratorRuntime.async(function userRegisterController$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, surname = _req$body.surname, dni = _req$body.dni, email = _req$body.email, password = _req$body.password, role = _req$body.role;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_userSchema["default"].findOne({
            where: {
              email: email
            }
          }));

        case 4:
          existingUserByEmail = _context.sent;

          if (!existingUserByEmail) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(409).send({
            errors: ['Ya existe un usuario con ese email registrado']
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap((0, _bcrypt.hash)(password, _salt.SALT));

        case 9:
          hashedPassword = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(_userSchema["default"].create({
            name: name,
            surname: surname,
            dni: dni,
            email: email,
            password: hashedPassword,
            role: role
          }));

        case 12:
          newUser = _context.sent;

          if (!(role === 0)) {
            _context.next = 17;
            break;
          }

          clienteData = {
            nombre: name,
            apellido: surname,
            dni: dni,
            correoElectronico: email,
            cuit: '',
            // Asigna el valor de CUIT que corresponda, si está disponible
            maximoDescubierto: 0 // Valor por defecto

          };
          _context.next = 17;
          return regeneratorRuntime.awrap((0, _rabbitMQ.sendClientCreationMessage)(clienteData));

        case 17:
          // Obtener datos del usuario creado (excepto contraseña)
          userData = {
            id: newUser.id,
            name: newUser.name,
            surname: newUser.surname,
            dni: newUser.dni,
            email: newUser.email,
            role: newUser.role
          }; // Enviar respuesta con datos del usuario

          return _context.abrupt("return", res.status(201).send({
            message: 'Usuario registrado con éxito',
            user: userData
          }));

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](1);
          console.error('Error al registrar usuario:', _context.t0); // Log del error completo

          return _context.abrupt("return", res.status(500).send({
            errors: ['Error al registrar usuario', _context.t0.message]
          }));

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 21]]);
};

var _default = userRegisterController;
exports["default"] = _default;