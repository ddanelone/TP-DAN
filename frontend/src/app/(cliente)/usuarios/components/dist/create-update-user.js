"user client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.CreateUpdateUser = void 0;
var dialog_1 = require("@/components/ui/dialog");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var z = require("zod");
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("@hookform/resolvers/zod");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var react_hot_toast_1 = require("react-hot-toast");
var button_1 = require("@/components/ui/button");
var auth_1 = require("@/lib/auth");
var get_from_localstorage_1 = require("@/action/get-from-localstorage");
function CreateUpdateUser(_a) {
    var _this = this;
    var _b, _c, _d, _e;
    var children = _a.children, userToUpdate = _a.userToUpdate, getUsers = _a.getUsers;
    var _f = react_1.useState(false), isLoading = _f[0], setIsLoading = _f[1];
    var _g = react_1.useState(false), open = _g[0], setOpen = _g[1];
    var _h = react_1.useState([]), users = _h[0], setUsers = _h[1];
    /* ========== Formulario ========== */
    var formSchema = z.object({
        id: z.number().optional(),
        nombre: z.string().min(2, {
            message: "Nombre debe tener al menos 2 caracteres de longitud"
        }),
        apellido: z.string().min(4, {
            message: "Apellido debe tener al menos 4 caracteres de longitud"
        }),
        dni: z
            .string()
            .min(1, {
            message: "El número de documento no es válido, debe ser un número entero"
        })
            .regex(/^\d+$/, {
            message: "El número de documento debe contener solo dígitos"
        }),
        correoElectronico: z
            .string()
            .email("El formato del email no es válido, debe cumplir el RFC 5322")
    });
    var form = react_hook_form_1.useForm({
        resolver: zod_1.zodResolver(formSchema),
        defaultValues: userToUpdate
            ? userToUpdate
            : {
                id: undefined,
                nombre: "",
                apellido: "",
                dni: "",
                correoElectronico: ""
            }
    });
    var register = form.register, handleSubmit = form.handleSubmit, formState = form.formState, setValue = form.setValue;
    var errors = formState.errors;
    /* ========== Crear o actualizar un Autorizado ========== */
    var onSubmit = function (authUser) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log(authUser);
            if (userToUpdate)
                updateUser(authUser);
            else
                createUser(authUser);
            return [2 /*return*/];
        });
    }); };
    /* ========== Crear un nuevo Usuario Autorizado ========== */
    var createUser = function (authUser) { return __awaiter(_this, void 0, void 0, function () {
        var idClient, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    authUser.id = userToUpdate === null || userToUpdate === void 0 ? void 0 : userToUpdate.id;
                    idClient = get_from_localstorage_1.getFromLocalstorage("idClient");
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, auth_1.createAuthorizedUser(idClient, authUser)];
                case 2:
                    _a.sent();
                    react_hot_toast_1["default"].success("Usuario creado correctamente");
                    getUsers();
                    setOpen(false);
                    form.reset();
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    react_hot_toast_1["default"].error(error_1.message, { duration: 4000 });
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    /* ========== Actualizar un cliente ========== */
    var updateUser = function (authUser) { return __awaiter(_this, void 0, void 0, function () {
        var idClient, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idClient = get_from_localstorage_1.getFromLocalstorage("idClient");
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    //Acá tengo el usuario con un id, por lo que el método POST lo va a actualizar
                    return [4 /*yield*/, auth_1.createAuthorizedUser(idClient, authUser)];
                case 2:
                    //Acá tengo el usuario con un id, por lo que el método POST lo va a actualizar
                    _a.sent();
                    react_hot_toast_1["default"].success("Cliente actualizado correctamente");
                    getUsers();
                    setOpen(false);
                    form.reset();
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    react_hot_toast_1["default"].error(error_2.message, { duration: 4000 });
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(dialog_1.Dialog, { open: open, onOpenChange: setOpen },
        React.createElement(dialog_1.DialogTrigger, { asChild: true }, children),
        React.createElement(dialog_1.DialogContent, { className: "sm:max-w-[425px]" },
            React.createElement(dialog_1.DialogHeader, null,
                React.createElement(dialog_1.DialogTitle, null, userToUpdate ? "Actualizar Usuario" : "Alta de Usuario"),
                React.createElement(dialog_1.DialogDescription, null, "Gestiona los Usuarios Autorizados para operar en t\u00FA nombre")),
            React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
                React.createElement("div", { className: "grid gap-2" },
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "nombre" }, "Nombre"),
                        React.createElement(input_1.Input, __assign({}, register("nombre", {
                            required: "El nombre es obligatorio"
                        }), { id: "nombre", placeholder: "Juan P\u00E9rez", type: "text", autoComplete: "nombre" })),
                        React.createElement("p", { className: "form-error" }, (_b = errors.nombre) === null || _b === void 0 ? void 0 : _b.message)),
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "apellido" }, "Apellido"),
                        React.createElement(input_1.Input, __assign({}, register("apellido", {
                            required: "El apellido es obligatorio"
                        }), { id: "apellido", placeholder: "Apellido", type: "text", autoComplete: "apellido" })),
                        React.createElement("p", { className: "form-error" }, (_c = errors.apellido) === null || _c === void 0 ? void 0 : _c.message)),
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "dni" }, "Documento"),
                        React.createElement(input_1.Input, __assign({}, register("dni", {
                            required: "El documento es obligatorio"
                        }), { id: "dni", placeholder: "22222222", type: "text", autoComplete: "dni" })),
                        React.createElement("p", { className: "form-error" }, (_d = errors.dni) === null || _d === void 0 ? void 0 : _d.message)),
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "correoElectronico" }, "Correo Electr\u00F3nico"),
                        React.createElement(input_1.Input, __assign({}, register("correoElectronico", {
                            required: "El correo es obligatorio"
                        }), { id: "correoElectronico", placeholder: "nombre@ejemplo.com", type: "correoElectronico", autoComplete: "correoElectronico" })),
                        React.createElement("p", { className: "form-error" }, (_e = errors.correoElectronico) === null || _e === void 0 ? void 0 : _e.message)),
                    React.createElement(dialog_1.DialogFooter, null,
                        React.createElement(button_1.Button, { type: "submit", disabled: isLoading },
                            isLoading && (React.createElement(lucide_react_1.LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" })),
                            userToUpdate ? "Actualizar" : "Crear")))))));
}
exports.CreateUpdateUser = CreateUpdateUser;
