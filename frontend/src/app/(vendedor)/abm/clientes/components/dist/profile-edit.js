"use client";
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
var badge_1 = require("@/components/ui/badge");
var use_user_1 = require("@/hooks/use-user");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var react_label_1 = require("@radix-ui/react-label");
var z = require("zod");
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("@hookform/resolvers/zod");
var lucide_react_1 = require("lucide-react");
var react_hot_toast_1 = require("react-hot-toast");
var get_from_localstorage_1 = require("@/action/get-from-localstorage");
var navigation_1 = require("next/navigation");
var ProfileEdit = function () {
    var _a, _b;
    var user = use_user_1.useUser();
    var router = navigation_1.useRouter();
    var _c = react_1.useState(false), isLoading = _c[0], setIsLoading = _c[1];
    var formSchema = z.object({
        cuit: z.string().min(13).max(13).regex(/^\d+$/, {
            message: "El formato de cuit no es válido, debe ser XX-XXXXXXXX-X"
        }),
        maximoDescubierto: z.coerce.number().int().min(0)
    });
    var _d = react_hook_form_1.useForm({
        resolver: zod_1.zodResolver(formSchema),
        defaultValues: {
            cuit: "",
            maximoDescubierto: 0
        }
    }), register = _d.register, handleSubmit = _d.handleSubmit, formState = _d.formState, setValue = _d.setValue;
    var errors = formState.errors;
    //Acá le puse cualquier valor.
    react_1.useEffect(function () {
        var _a, _b;
        setValue("cuit", (_a = user === null || user === void 0 ? void 0 : user.name) !== null && _a !== void 0 ? _a : "");
        setValue("maximoDescubierto", (_b = user === null || user === void 0 ? void 0 : user.role) !== null && _b !== void 0 ? _b : 0);
    }, [user, setValue]);
    var onSubmit = function (formData) { return __awaiter(void 0, void 0, void 0, function () {
        var userLocal, id, validationErrors;
        return __generator(this, function (_a) {
            setIsLoading(true);
            console.log(formData);
            try {
                userLocal = get_from_localstorage_1.getFromLocalstorage("user");
                id = userLocal.id;
                // Lógica para actualizar el usuario en el backend
                //const userUpdate = await updateUser(id, formDataWithoutRepeatPassword);
                react_hot_toast_1["default"].success("Perfil del Cliente actualizado correctamente", {
                    duration: 4000
                });
            }
            catch (error) {
                if (error.response && error.response.data && error.response.data.errors) {
                    validationErrors = error.response.data.errors;
                    validationErrors.forEach(function (errorMessage) {
                        react_hot_toast_1["default"].error(errorMessage, { duration: 4000 });
                    });
                }
                else {
                    react_hot_toast_1["default"].error("Error al actualizar el perfil de usuario", {
                        duration: 4000
                    });
                }
            }
            finally {
                setIsLoading(false);
            }
            return [2 /*return*/];
        });
    }); };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "flex justify-between items-center m-4 mb-8" },
            React.createElement(badge_1.Badge, { className: "mt-2 text-[14px]", variant: "outline" },
                React.createElement("h1", { className: "text-2xl ml-1" }, "Administraci\u00F3n de Clientes")),
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
                            React.createElement(input_1.Input, { id: "name", placeholder: "", type: "text", autoComplete: "name" })),
                        React.createElement("div", { className: "mb-3" },
                            React.createElement(react_label_1.Label, { htmlFor: "surname" }, "Apellido"),
                            React.createElement(input_1.Input, { id: "surname", placeholder: "", type: "text", autoComplete: "surname" })),
                        React.createElement("div", { className: "mb-3" },
                            React.createElement(react_label_1.Label, { htmlFor: "dni" }, "Documento"),
                            React.createElement(input_1.Input, { id: "dni", placeholder: "", type: "text", autoComplete: "dni" }))),
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6" },
                        React.createElement("div", { className: "mb-3" },
                            React.createElement(react_label_1.Label, { htmlFor: "email" }, "Correo Electr\u00F3nico"),
                            React.createElement(input_1.Input, { id: "email", placeholder: "", type: "email", autoComplete: "email" })),
                        React.createElement("div", { className: "mb-3" },
                            React.createElement(react_label_1.Label, { htmlFor: "cuit" }, "Cuit"),
                            React.createElement(input_1.Input, __assign({}, register("cuit"), { id: "cuit", placeholder: "xx-xxxxxxxx-x", type: "cuit" })),
                            React.createElement("p", { className: "form-error" }, (_a = errors.cuit) === null || _a === void 0 ? void 0 : _a.message)),
                        React.createElement("div", { className: "mb-3" },
                            React.createElement(react_label_1.Label, { htmlFor: "maximoDescubierto" }, "M\u00E1ximo Descubierto"),
                            React.createElement(input_1.Input, __assign({}, register("maximoDescubierto", {
                                required: "Máximo descubierto"
                            }), { id: "maximoDescubierto", placeholder: "0.00", type: "maximoDescubierto" })),
                            React.createElement("p", { className: "form-error" }, (_b = errors.maximoDescubierto) === null || _b === void 0 ? void 0 : _b.message))))))));
};
exports["default"] = ProfileEdit;
