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
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var react_label_1 = require("@radix-ui/react-label");
var link_1 = require("next/link");
var z = require("zod");
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("@hookform/resolvers/zod");
var auth_1 = require("@/lib/auth"); // Cambiado a "@/lib/auth"
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var react_hot_toast_1 = require("react-hot-toast");
var navigation_1 = require("next/navigation");
var get_from_localstorage_1 = require("@/action/get-from-localstorage");
function SignInForm() {
    var _this = this;
    var _a, _b;
    var router = navigation_1.useRouter(); // Usa useRouter para la redirección
    var _c = react_1.useState(false), isLoading = _c[0], setIsLoading = _c[1];
    /* ========== Formulario ========== */
    var formSchema = z.object({
        email: z
            .string()
            .email("El formato del correo electrónico no es válido")
            .min(1, { message: "El correo electrónico es requerido" }),
        password: z.string().min(8, {
            message: "La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 número"
        })
    });
    var form = react_hook_form_1.useForm({
        resolver: zod_1.zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });
    var register = form.register, handleSubmit = form.handleSubmit, formState = form.formState;
    var errors = formState.errors;
    /* ========== Iniciar Sesión ========== */
    var onSubmit = function (user) { return __awaiter(_this, void 0, void 0, function () {
        var authenticatedUser, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, auth_1.signIn(user)];
                case 2:
                    _a.sent();
                    react_hot_toast_1["default"].success("Sesión iniciada correctamente", { duration: 4000 });
                    authenticatedUser = get_from_localstorage_1.getFromLocalstorage("user");
                    if (authenticatedUser.role === 1) {
                        router.push("/abm/productos");
                    }
                    else {
                        router.push("/productos");
                    }
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
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "text-center" },
            React.createElement("h1", { className: "text-2xl font-semibold" }, "Iniciar sesi\u00F3n"),
            React.createElement("p", { className: "text-sm text-muted-foreground" }, "Ingrese su usuario y contrase\u00F1a para acceder al sistema")),
        React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
            React.createElement("div", { className: "grid gap-2" },
                React.createElement("div", { className: "mb-3" },
                    React.createElement(react_label_1.Label, { htmlFor: "email" }, "Correo Electr\u00F3nico"),
                    React.createElement(input_1.Input, __assign({}, register("email"), { id: "email", placeholder: "nombre@ejemplo.com", type: "email", autoComplete: "email" })),
                    React.createElement("p", { className: "form-error" }, (_a = errors.email) === null || _a === void 0 ? void 0 : _a.message)),
                React.createElement("div", { className: "mb-3" },
                    React.createElement(react_label_1.Label, { htmlFor: "password" }, "Contrase\u00F1a"),
                    React.createElement(input_1.Input, __assign({}, register("password"), { id: "password", placeholder: "******", type: "password" })),
                    React.createElement("p", { className: "form-error" }, (_b = errors.password) === null || _b === void 0 ? void 0 : _b.message)),
                React.createElement(link_1["default"], { href: "/forgot-password", className: "underline text-muted-foreground underline-offset-4 hover:text-primary mb-6 text-sm text-end" }, " ¿Olvidaste tu contraseña? "),
                React.createElement(button_1.Button, { type: "submit", disabled: isLoading },
                    isLoading && (React.createElement(lucide_react_1.LoaderCircle, { className: "mr-2  h-4 w-4 animate-spin" })),
                    "Iniciar sesi\u00F3n"))),
        React.createElement("p", { className: "text-center text-sm text-muted-foreground" },
            "\u00BFAun no ten\u00E9s una cuenta? ",
            "",
            React.createElement(link_1["default"], { href: "/sign-up", className: "underline underline-offset-4 hover:text-primary " },
                " ",
                "Registrate"))));
}
exports["default"] = SignInForm;
