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
exports.UpdateStockPriceDiscount = void 0;
var dialog_1 = require("@/components/ui/dialog");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var z = require("zod");
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("@hookform/resolvers/zod");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var react_hot_toast_1 = require("react-hot-toast");
var use_user_1 = require("@/hooks/use-user");
var button_1 = require("@/components/ui/button");
var product_category_interface_1 = require("@/interfaces/product-category-interface");
var auth_1 = require("@/lib/auth");
function UpdateStockPriceDiscount(_a) {
    var _this = this;
    var _b, _c, _d;
    var children = _a.children, itemToUpdate = _a.itemToUpdate, getItems = _a.getItems;
    var user = use_user_1.useUser();
    var _e = react_1.useState(false), isLoading = _e[0], setIsLoading = _e[1];
    var _f = react_1.useState(false), open = _f[0], setOpen = _f[1];
    /* ========== Formulario ========== */
    // Schema para la visualización de detalles del producto
    var formSchemaView = z.object({
        nombre: z.string().min(4, { message: "El nombre es requerido" }),
        descripcion: z.string().min(4, { message: "La descripción es requerida" }),
        categoria: z.nativeEnum(product_category_interface_1.Category),
        precio: z.coerce.number().gte(0, "El precio debe ser mayor a 0"),
        stockActual: z.coerce
            .number()
            .gte(0, "El stock debe ser mayor o igual a 0"),
        stockMinimo: z.coerce
            .number()
            .gte(0, "El stock mínimo debe ser mayor o igual a 0"),
        descuento: z.coerce
            .number()
            .gte(0, "El descuento debe ser mayor o igual a 0")
    });
    // Schema para la actualización de precio, stock recibido y descuento
    var formSchemaUpdate = z.object({
        precio: z.coerce.number().gte(0, "El precio debe ser mayor a 0"),
        stockRecibido: z.coerce
            .number()
            .gte(0, "El stock recibido debe ser mayor o igual a 0"),
        descuento: z.coerce
            .number()
            .gte(0, "El descuento debe ser mayor o igual a 0")
    });
    var formView = react_hook_form_1.useForm({
        resolver: zod_1.zodResolver(formSchemaView),
        defaultValues: itemToUpdate
    });
    var formUpdate = react_hook_form_1.useForm({
        resolver: zod_1.zodResolver(formSchemaUpdate),
        defaultValues: {
            precio: itemToUpdate.precio,
            stockRecibido: 0,
            descuento: itemToUpdate.descuento
        }
    });
    var handleSubmitUpdate = formUpdate.handleSubmit, formStateUpdate = formUpdate.formState, setValueUpdate = formUpdate.setValue;
    var errorsUpdate = formStateUpdate.errors;
    /* ========== Actualizar el stock, precio y descuento ========== */
    var onSubmitUpdate = function (formData) { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, 9, 10]);
                    if (!(formData.stockRecibido !== 0 ||
                        formData.precio !== itemToUpdate.precio)) return [3 /*break*/, 3];
                    return [4 /*yield*/, auth_1.updateOrderProvision(itemToUpdate.id, formData.stockRecibido, formData.precio)];
                case 2:
                    _a.sent();
                    react_hot_toast_1["default"].success("Precios y Stock actualizados correctamente");
                    return [3 /*break*/, 4];
                case 3:
                    react_hot_toast_1["default"].error("No se realizaron cambios en stock y precio", {
                        duration: 2500
                    });
                    _a.label = 4;
                case 4:
                    if (!(formData.descuento !== itemToUpdate.descuento)) return [3 /*break*/, 6];
                    return [4 /*yield*/, auth_1.updatePromotionalDiscount(itemToUpdate.id, formData.descuento)];
                case 5:
                    _a.sent();
                    react_hot_toast_1["default"].success("Actualización de descuentos realizada correctamente");
                    return [3 /*break*/, 7];
                case 6:
                    react_hot_toast_1["default"].error("No se realizaron cambios en descuentos", {
                        duration: 2500
                    });
                    _a.label = 7;
                case 7:
                    getItems();
                    setOpen(false);
                    formView.reset();
                    formUpdate.reset();
                    return [3 /*break*/, 10];
                case 8:
                    error_1 = _a.sent();
                    react_hot_toast_1["default"].error(error_1.message, { duration: 2500 });
                    return [3 /*break*/, 10];
                case 9:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    }); };
    /* ========== Renderizado del componente ========== */
    return (React.createElement(dialog_1.Dialog, { open: open, onOpenChange: setOpen },
        React.createElement(dialog_1.DialogTrigger, { asChild: true }, children),
        React.createElement(dialog_1.DialogContent, { className: "sm:max-w-[425px]" },
            React.createElement(dialog_1.DialogHeader, null,
                React.createElement(dialog_1.DialogTitle, null, "Actualizar: stock / precio / descuento"),
                React.createElement(dialog_1.DialogDescription, null, "Gestionar productos con la siguiente informaci\u00F3n:")),
            React.createElement("div", { className: "grid gap-2" },
                React.createElement("div", { className: "mb-3" },
                    React.createElement(label_1.Label, { htmlFor: "nombre" }, "Nombre"),
                    React.createElement(input_1.Input, { id: "nombre", type: "text", value: itemToUpdate.nombre, readOnly: true })),
                React.createElement("div", { className: "mb-3" },
                    React.createElement(label_1.Label, { htmlFor: "descripcion" }, "Descripci\u00F3n"),
                    React.createElement(input_1.Input, { id: "descripcion", type: "text", value: itemToUpdate.descripcion, readOnly: true })),
                React.createElement("div", { className: "mb-3" },
                    React.createElement(label_1.Label, { htmlFor: "categoria" }, "Categor\u00EDa"),
                    React.createElement(input_1.Input, { id: "categoria", type: "text", value: itemToUpdate.categoria, readOnly: true }))),
            React.createElement("form", { onSubmit: handleSubmitUpdate(onSubmitUpdate) },
                React.createElement("div", { className: "grid gap-2" },
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "precio" }, "Precio"),
                        React.createElement(input_1.Input, __assign({}, formUpdate.register("precio"), { autoComplete: "precio", id: "precio", type: "number", step: "0.01", placeholder: "0.00" })),
                        React.createElement("p", { className: "form-error" }, (_b = errorsUpdate.precio) === null || _b === void 0 ? void 0 : _b.message)),
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "descuento" }, "Descuento"),
                        React.createElement(input_1.Input, __assign({}, formUpdate.register("descuento"), { autoComplete: "descuento", id: "descuento", type: "number", step: "0.01", placeholder: "0.00" })),
                        React.createElement("p", { className: "form-error" }, (_c = errorsUpdate.descuento) === null || _c === void 0 ? void 0 : _c.message)),
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "stockRecibido" }, "Stock Recibido"),
                        React.createElement(input_1.Input, __assign({}, formUpdate.register("stockRecibido"), { autoComplete: "stockRecibido", id: "stockRecibido", type: "number", step: "1", placeholder: "0" })),
                        React.createElement("p", { className: "form-error" }, (_d = errorsUpdate.stockRecibido) === null || _d === void 0 ? void 0 : _d.message))),
                React.createElement(dialog_1.DialogFooter, null,
                    React.createElement(button_1.Button, { type: "submit", disabled: isLoading },
                        isLoading && (React.createElement(lucide_react_1.LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" })),
                        "Actualizar"))))));
}
exports.UpdateStockPriceDiscount = UpdateStockPriceDiscount;
