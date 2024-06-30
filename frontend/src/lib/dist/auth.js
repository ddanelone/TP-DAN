"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getProductosByPedidoId = exports.getClienteByPedidoId = exports.addProductoToDetalle = exports.addClienteToPedido = exports.deletePedido = exports.createPedido = exports.getPedidoById = exports.getAllPedidos = exports.validarObra = exports.getCoordinates = exports.deleteObra = exports.updateObra = exports.createObra = exports.getObraById = exports.getEstadosObras = exports.getAllObras = exports.deleteAuthorizedUser = exports.updateAuthorizedUser = exports.createAuthorizedUser = exports.getAuthorizedUserById = exports.getAllAuthorizedUsers = exports.deleteClient = exports.updateClient = exports.createClient = exports.getClientByEmail = exports.getClientById = exports.getAllClients = exports.deleteProductById = exports.saveProduct = exports.getProductById = exports.getProducts = exports.sendResetEmail = exports.signOutAccount = exports.updateUser = exports.createUser = exports.signIn = void 0;
var axios_1 = require("./axios");
var set_in_localstorage_1 = require("@/action/set-in-localstorage");
var get_from_localstorage_1 = require("@/action/get-from-localstorage");
/* ========== Usuarios  ========== */
exports.signIn = function (user) { return __awaiter(void 0, void 0, Promise, function () {
    var response, _a, jwt, userData, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].post("/usuarios/login", user)];
            case 1:
                response = _b.sent();
                _a = response.data, jwt = _a.jwt, userData = _a.user;
                set_in_localstorage_1.setInLocalstorage("jwt", jwt);
                set_in_localstorage_1.setInLocalstorage("user", userData);
                return [2 /*return*/, userData];
            case 2:
                error_1 = _b.sent();
                if (error_1.response && error_1.response.data && error_1.response.data.errors) {
                    throw new Error(error_1.response.data.errors[0]);
                }
                else {
                    throw new Error("Error al iniciar sesión");
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createUser = function (user) { return __awaiter(void 0, void 0, Promise, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, axios_1["default"].post("/usuarios/register", user)];
            case 1:
                _a.sent();
                return [4 /*yield*/, exports.signIn({ email: user.email, password: user.password })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                throw error_2;
            case 4: return [2 /*return*/];
        }
    });
}); };
// updateUser function in React
exports.updateUser = function (userId, user) { return __awaiter(void 0, void 0, Promise, function () {
    var token, config, response, updatedUserData, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                token = get_from_localstorage_1.getFromLocalstorage("jwt");
                config = {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                };
                return [4 /*yield*/, axios_1["default"].patch("/usuarios/update-data/" + userId, user, config)];
            case 1:
                response = _a.sent();
                updatedUserData = response.data;
                // Guarda los datos actualizados del usuario en el local storage
                set_in_localstorage_1.setInLocalstorage("user", updatedUserData);
                return [2 /*return*/, updatedUserData];
            case 2:
                error_3 = _a.sent();
                throw new Error(error_3.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.signOutAccount = function () {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
};
exports.sendResetEmail = function (email) { return __awaiter(void 0, void 0, Promise, function () {
    var response, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].post("/usuarios/reset-password", { email: email })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_4 = _a.sent();
                throw new Error(error_4.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
/* ========== Productos  ========== */
// Función para obtener la lista de productos
exports.getProducts = function () { return __awaiter(void 0, void 0, Promise, function () {
    var token, config, response, products, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                token = get_from_localstorage_1.getFromLocalstorage("jwt");
                config = {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                };
                return [4 /*yield*/, axios_1["default"].get("/productos", config)];
            case 1:
                response = _a.sent();
                products = response.data;
                return [2 /*return*/, products];
            case 2:
                error_5 = _a.sent();
                throw new Error(error_5.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
// Función para obtener un producto específico por su ID
exports.getProductById = function (productId) { return __awaiter(void 0, void 0, Promise, function () {
    var token, config, response, product, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                token = get_from_localstorage_1.getFromLocalstorage("jwt");
                config = {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                };
                return [4 /*yield*/, axios_1["default"].get("/productos/" + productId, config)];
            case 1:
                response = _a.sent();
                product = response.data;
                return [2 /*return*/, product];
            case 2:
                error_6 = _a.sent();
                if (error_6.response && error_6.response.status === 404) {
                    // Si el producto no se encuentra, retorna null
                    return [2 /*return*/, null];
                }
                else {
                    throw new Error(error_6.response.data.message);
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Función para crear o actualizar un producto
exports.saveProduct = function (product) { return __awaiter(void 0, void 0, Promise, function () {
    var token, config, response, savedProduct, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                token = get_from_localstorage_1.getFromLocalstorage("jwt");
                config = {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                };
                return [4 /*yield*/, axios_1["default"].post("/productos", product, config)];
            case 1:
                response = _a.sent();
                savedProduct = response.data;
                return [2 /*return*/, savedProduct];
            case 2:
                error_7 = _a.sent();
                throw new Error(error_7.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
// Función para eliminar un producto por ID
exports.deleteProductById = function (productId) { return __awaiter(void 0, void 0, Promise, function () {
    var token, config, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                token = get_from_localstorage_1.getFromLocalstorage("jwt");
                config = {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                };
                // Realiza la solicitud para eliminar el producto por ID
                return [4 /*yield*/, axios_1["default"]["delete"]("/productos/" + productId, config)];
            case 1:
                // Realiza la solicitud para eliminar el producto por ID
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                throw new Error(error_8.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
/* ==========  CLIENTES ========== */
// Función para obtener la lista de clientes
exports.getAllClients = function () { return __awaiter(void 0, void 0, void 0, function () {
    var token, config, response, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                token = get_from_localstorage_1.getFromLocalstorage("jwt");
                config = {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                };
                return [4 /*yield*/, axios_1["default"].get("/clientes", config)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_9 = _a.sent();
                throw new Error(error_9.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
// Función para obtener un cliente por ID
exports.getClientById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var token, config, response, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                token = get_from_localstorage_1.getFromLocalstorage("jwt");
                config = {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                };
                return [4 /*yield*/, axios_1["default"].get("/clientes/" + id, config)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_10 = _a.sent();
                throw new Error(error_10.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
// Función para obtener un cliente por ID
exports.getClientByEmail = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var token, config, response, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                token = get_from_localstorage_1.getFromLocalstorage("jwt");
                config = {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                };
                return [4 /*yield*/, axios_1["default"].get("/clientes/email/" + email, config)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_11 = _a.sent();
                throw new Error(error_11.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
// Función para crear un nuevo cliente
exports.createClient = function (clientData) { return __awaiter(void 0, void 0, void 0, function () {
    var token, config, response, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                token = get_from_localstorage_1.getFromLocalstorage("jwt");
                config = {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                };
                return [4 /*yield*/, axios_1["default"].post("/clientes", clientData, config)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_12 = _a.sent();
                throw new Error(error_12.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
// Función para actualizar un cliente existente
exports.updateClient = function (id, clientData) { return __awaiter(void 0, void 0, void 0, function () {
    var token, config, response, error_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                token = get_from_localstorage_1.getFromLocalstorage("jwt");
                config = {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                };
                return [4 /*yield*/, axios_1["default"].put("/clientes/" + id, clientData, config)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_13 = _a.sent();
                throw new Error(error_13.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
// Función para eliminar un cliente
exports.deleteClient = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var token, config, error_14;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                token = get_from_localstorage_1.getFromLocalstorage("jwt");
                config = {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                };
                return [4 /*yield*/, axios_1["default"]["delete"]("/clientes/" + id, config)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_14 = _a.sent();
                throw new Error(error_14.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
/* ========== USUARIOS HABILITADOS PARA OPERAR POR UN CLIENTE ========== */
// Función para obtener la lista de usuarios habilitados
exports.getAllAuthorizedUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var token, config, response, error_15;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                token = get_from_localstorage_1.getFromLocalstorage("jwt");
                config = {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                };
                return [4 /*yield*/, axios_1["default"].get("/clientes/usuarios-habilitados", config)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_15 = _a.sent();
                throw new Error(error_15.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
// Función para obtener un usuario habilitado por ID
exports.getAuthorizedUserById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var token, config, response, error_16;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                token = get_from_localstorage_1.getFromLocalstorage("jwt");
                config = {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                };
                return [4 /*yield*/, axios_1["default"].get("/clientes/usuarios-habilitados/" + id, config)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_16 = _a.sent();
                throw new Error(error_16.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
// Función para crear un nuevo usuario habilitado
exports.createAuthorizedUser = function (id, userData) { return __awaiter(void 0, void 0, void 0, function () {
    var token, config, response, error_17;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                token = get_from_localstorage_1.getFromLocalstorage("jwt");
                config = {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                };
                return [4 /*yield*/, axios_1["default"].post("/clientes/" + id + "/usuarios-habilitados", userData, config)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_17 = _a.sent();
                throw new Error(error_17.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
// Función para actualizar un usuario habilitado existente
exports.updateAuthorizedUser = function (id, userData) { return __awaiter(void 0, void 0, void 0, function () {
    var token, config, response, error_18;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                token = get_from_localstorage_1.getFromLocalstorage("jwt");
                config = {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                };
                return [4 /*yield*/, axios_1["default"].put("/clientes/usuarios-habilitados/" + id, userData, config)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_18 = _a.sent();
                throw new Error(error_18.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
// Función para eliminar un usuario habilitado
exports.deleteAuthorizedUser = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var token, config, error_19;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                token = get_from_localstorage_1.getFromLocalstorage("jwt");
                config = {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                };
                return [4 /*yield*/, axios_1["default"]["delete"]("/clientes/usuarios-habilitados/" + id, config)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_19 = _a.sent();
                throw new Error(error_19.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
/* ==========  OBRAS ========== */
exports.getAllObras = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_20;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].get("/obras")];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_20 = _a.sent();
                throw new Error(error_20.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getEstadosObras = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_21;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].get("/obras/estados")];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_21 = _a.sent();
                throw new Error(error_21.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getObraById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_22;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].get("/obras/" + id)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_22 = _a.sent();
                throw new Error(error_22.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createObra = function (obraData) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_23;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].post("/obras", obraData)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_23 = _a.sent();
                throw new Error(error_23.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateObra = function (id, obraData) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_24;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].put("/obras/" + id, obraData)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_24 = _a.sent();
                throw new Error(error_24.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteObra = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var error_25;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"]["delete"]("/obras/" + id)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_25 = _a.sent();
                throw new Error(error_25.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
/* ========== Obtener latitud y longitud pasando la dirección como body ========== */
exports.getCoordinates = function (address) { return __awaiter(void 0, void 0, Promise, function () {
    var response, error_26;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].post("/obras/coordenadas", address)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_26 = _a.sent();
                throw new Error(error_26.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
/* ========== Aplicar reglas de negocio previo a asignar una obra ========== */
exports.validarObra = function (idCliente, obraData) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_27;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].post("/obras/cliente/validar-obra/" + idCliente, obraData)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_27 = _a.sent();
                throw new Error(error_27.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
/* ========== GESTION DE PEDIDOS ========== */
exports.getAllPedidos = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_28;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].get("/pedidos")];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_28 = _a.sent();
                throw new Error(error_28.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPedidoById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_29;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].get("/pedidos/" + id)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_29 = _a.sent();
                throw new Error(error_29.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createPedido = function (pedidoData) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_30;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].post("/pedidos", pedidoData)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_30 = _a.sent();
                throw new Error(error_30.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deletePedido = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var error_31;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"]["delete"]("/pedidos/" + id)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_31 = _a.sent();
                throw new Error(error_31.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addClienteToPedido = function (id, clienteData) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_32;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].post("/pedidos/" + id + "/cliente", clienteData)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_32 = _a.sent();
                throw new Error(error_32.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addProductoToDetalle = function (id, detalleData) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_33;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].post("/pedidos/" + id + "/detalle", detalleData)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_33 = _a.sent();
                throw new Error(error_33.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getClienteByPedidoId = function (pedidoId) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_34;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].get("/pedidos/clientes/" + pedidoId)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_34 = _a.sent();
                throw new Error(error_34.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getProductosByPedidoId = function (pedidoId) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_35;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].get("/pedidos/productos/" + pedidoId)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_35 = _a.sent();
                throw new Error(error_35.response.data.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
