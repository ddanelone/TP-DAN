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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var badge_1 = require("@/components/ui/badge");
var use_user_1 = require("@/hooks/use-user");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var react_label_1 = require("@radix-ui/react-label");
var z = require("zod");
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("@hookform/resolvers/zod");
var auth_1 = require("@/lib/auth");
var lucide_react_1 = require("lucide-react");
var react_hot_toast_1 = require("react-hot-toast");
var get_from_localstorage_1 = require("@/action/get-from-localstorage");
var set_in_localstorage_1 = require("@/action/set-in-localstorage");
var navigation_1 = require("next/navigation");
function ProfileEdit() {
    var _this = this;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    var user = use_user_1.useUser(); // Asumiendo que useUser() proporciona los datos del usuario
    var router = navigation_1.useRouter();
    var _m = react_1.useState(false), isLoading = _m[0], setIsLoading = _m[1];
    var formSchema = z.object({
        name: z.string().min(2, {
            message: "Nombre debe tener al menos 2 caracteres de longitud"
        }),
        surname: z.string().min(4, {
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
        email: z
            .string()
            .email("El formato del email no es válido, debe cumplir el RFC 5322"),
        password: z.string().min(8, {
            message: "El formato de la contraseña no es válido, debe contener al menos 8 caracteres"
        }),
        repeatPassword: z.string(),
        role: z.number().int()
    });
    var _o = react_hook_form_1.useForm({
        resolver: zod_1.zodResolver(formSchema),
        defaultValues: {
            name: (_a = user === null || user === void 0 ? void 0 : user.name) !== null && _a !== void 0 ? _a : "",
            surname: (_b = user === null || user === void 0 ? void 0 : user.surname) !== null && _b !== void 0 ? _b : "",
            dni: (_c = user === null || user === void 0 ? void 0 : user.dni) !== null && _c !== void 0 ? _c : "",
            email: (_d = user === null || user === void 0 ? void 0 : user.email) !== null && _d !== void 0 ? _d : "",
            password: "",
            repeatPassword: "",
            role: (_e = user === null || user === void 0 ? void 0 : user.role) !== null && _e !== void 0 ? _e : 0
        }
    }), register = _o.register, handleSubmit = _o.handleSubmit, formState = _o.formState, setValue = _o.setValue;
    var errors = formState.errors;
    react_1.useEffect(function () {
        var _a, _b, _c, _d, _e, _f;
        setValue("name", (_a = user === null || user === void 0 ? void 0 : user.name) !== null && _a !== void 0 ? _a : "");
        setValue("surname", (_b = user === null || user === void 0 ? void 0 : user.surname) !== null && _b !== void 0 ? _b : "");
        setValue("dni", (_c = user === null || user === void 0 ? void 0 : user.dni) !== null && _c !== void 0 ? _c : "");
        setValue("email", (_d = user === null || user === void 0 ? void 0 : user.email) !== null && _d !== void 0 ? _d : "");
        setValue("role", (_e = user === null || user === void 0 ? void 0 : user.role) !== null && _e !== void 0 ? _e : 0);
        setValue("password", (_f = user === null || user === void 0 ? void 0 : user.password) !== null && _f !== void 0 ? _f : "");
    }, [user, setValue]);
    var onSubmit = function (formData) { return __awaiter(_this, void 0, void 0, function () {
        var repeatPassword, formDataWithoutRepeatPassword, userLocal, id, userUpdate, error_1, validationErrors;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (formData.password !== formData.repeatPassword) {
                        react_hot_toast_1["default"].error("Las contraseñas no coinciden", { duration: 4000 });
                        return [2 /*return*/];
                    }
                    repeatPassword = formData.repeatPassword, formDataWithoutRepeatPassword = __rest(formData, ["repeatPassword"]);
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    userLocal = get_from_localstorage_1.getFromLocalstorage("user");
                    id = userLocal.id;
                    return [4 /*yield*/, auth_1.updateUser(id, formDataWithoutRepeatPassword)];
                case 2:
                    userUpdate = _a.sent();
                    //Asignar el usuario actualizado al localStorage
                    set_in_localstorage_1.setInLocalstorage("user", userUpdate);
                    if (userUpdate.role === 1)
                        router.push("/abm/productos");
                    else
                        router.push("/productos");
                    react_hot_toast_1["default"].success("Perfil de usuario actualizado correctamente", {
                        duration: 4000
                    });
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    if (error_1.response && error_1.response.data && error_1.response.data.errors) {
                        validationErrors = error_1.response.data.errors;
                        validationErrors.forEach(function (errorMessage) {
                            react_hot_toast_1["default"].error(errorMessage, { duration: 4000 });
                        });
                    }
                    else {
                        react_hot_toast_1["default"].error("Error al actualizar el perfil de usuario", {
                            duration: 4000
                        });
                    }
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "flex justify-between items-center m-4 mb-8" },
            React.createElement(badge_1.Badge, { className: "mt-2 text-[14px]", variant: "outline" },
                React.createElement("h1", { className: "text-2xl ml-1" }, "Editar perfil")),
            React.createElement(button_1.Button, { className: "px-6", type: "button", disabled: isLoading, onClick: function () {
                    handleSubmit(onSubmit)();
                } },
                isLoading && React.createElement(lucide_react_1.LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                "Actualizar",
                React.createElement(lucide_react_1.CircleUser, { className: "ml-2 w-[20px]" }))),
        React.createElement("div", { className: "m-4" },
            React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
                " ",
                React.createElement("div", { className: "grid gap-6" },
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6" },
                        React.createElement("div", { className: "mb-3" },
                            React.createElement(react_label_1.Label, { htmlFor: "name" }, "Nombre"),
                            React.createElement(input_1.Input, __assign({}, register("name", {
                                required: "El nombre es obligatorio"
                            }), { id: "name", placeholder: "Juan P\u00E9rez", type: "text", autoComplete: "name" })),
                            React.createElement("p", { className: "form-error" }, (_f = errors.name) === null || _f === void 0 ? void 0 : _f.message)),
                        React.createElement("div", { className: "mb-3" },
                            React.createElement(react_label_1.Label, { htmlFor: "surname" }, "Apellido"),
                            React.createElement(input_1.Input, __assign({}, register("surname", {
                                required: "El apellido es obligatorio"
                            }), { id: "surname", placeholder: "Apellido", type: "text", autoComplete: "surname" })),
                            React.createElement("p", { className: "form-error" }, (_g = errors.surname) === null || _g === void 0 ? void 0 : _g.message)),
                        React.createElement("div", { className: "mb-3" },
                            React.createElement(react_label_1.Label, { htmlFor: "dni" }, "Documento"),
                            React.createElement(input_1.Input, __assign({}, register("dni", {
                                required: "El documento es obligatorio"
                            }), { id: "dni", placeholder: "22222222", type: "text", autoComplete: "dni" })),
                            React.createElement("p", { className: "form-error" }, (_h = errors.dni) === null || _h === void 0 ? void 0 : _h.message))),
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6" },
                        React.createElement("div", { className: "mb-3" },
                            React.createElement(react_label_1.Label, { htmlFor: "email" }, "Correo Electr\u00F3nico"),
                            React.createElement(input_1.Input, __assign({}, register("email", {
                                required: "El correo es obligatorio"
                            }), { id: "email", placeholder: "nombre@ejemplo.com", type: "email", autoComplete: "email" })),
                            React.createElement("p", { className: "form-error" }, (_j = errors.email) === null || _j === void 0 ? void 0 : _j.message)),
                        React.createElement("div", { className: "mb-3" },
                            React.createElement(react_label_1.Label, { htmlFor: "password" }, "Contrase\u00F1a"),
                            React.createElement(input_1.Input, __assign({}, register("password"), { id: "password", placeholder: "******", type: "password" })),
                            React.createElement("p", { className: "form-error" }, (_k = errors.password) === null || _k === void 0 ? void 0 : _k.message)),
                        React.createElement("div", { className: "mb-3" },
                            React.createElement(react_label_1.Label, { htmlFor: "repeatPassword" }, "Repetir Contrase\u00F1a"),
                            React.createElement(input_1.Input, __assign({}, register("repeatPassword", {
                                required: "Repita su contraseña"
                            }), { id: "repeatPassword", placeholder: "******", type: "password" })),
                            React.createElement("p", { className: "form-error" }, (_l = errors.repeatPassword) === null || _l === void 0 ? void 0 : _l.message))))))));
}
exports["default"] = ProfileEdit;
