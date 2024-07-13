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
exports.CreateUpdateItem = void 0;
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
var products_category_select_1 = require("@/components/ui/products-category-select");
var auth_1 = require("@/lib/auth");
function CreateUpdateItem(_a) {
    var _this = this;
    var _b, _c, _d, _e, _f, _g, _h;
    var children = _a.children, itemToUpdate = _a.itemToUpdate, getItems = _a.getItems;
    var user = use_user_1.useUser();
    var _j = react_1.useState(false), isLoading = _j[0], setIsLoading = _j[1];
    var _k = react_1.useState(false), open = _k[0], setOpen = _k[1];
    /* ========== Formulario ========== */
    var formSchema = z.object({
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
        descuento: z.coerce.number().gte(0, "El precio debe ser mayor a 0")
    });
    var form = react_hook_form_1.useForm({
        resolver: zod_1.zodResolver(formSchema),
        defaultValues: itemToUpdate
            ? itemToUpdate
            : {
                nombre: "",
                descripcion: "",
                categoria: product_category_interface_1.Category.CEMENTOS,
                precio: undefined,
                stockActual: undefined,
                stockMinimo: undefined,
                descuento: undefined
            }
    });
    var register = form.register, handleSubmit = form.handleSubmit, formState = form.formState, setValue = form.setValue;
    var errors = formState.errors;
    /* ========== Crear o actualizar un Producto ========== */
    var onSubmit = function (item) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (itemToUpdate && itemToUpdate.id) {
                // Si itemToUpdate tiene un id, es una actualización
                updateItem(__assign(__assign({}, item), { id: itemToUpdate.id }));
            }
            else {
                // De lo contrario, es una creación
                createItem(item);
            }
            return [2 /*return*/];
        });
    }); };
    /* ========== Crear un item en la base de datos ========== */
    var createItem = function (item) { return __awaiter(_this, void 0, void 0, function () {
        var createdProduct, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, auth_1.saveProduct(item)];
                case 2:
                    createdProduct = _a.sent();
                    react_hot_toast_1["default"].success("Item creado correctamente");
                    getItems();
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
    /* ========== Actualizar un item en la base de datos ========== */
    var updateItem = function (item) { return __awaiter(_this, void 0, void 0, function () {
        var updatedProduct, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, auth_1.saveProduct(item)];
                case 2:
                    updatedProduct = _a.sent();
                    react_hot_toast_1["default"].success("Item actualizado correctamente");
                    getItems();
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
    /* ========== Manejo del select de categorias ========== */
    var handleCategoryChange = function (category) {
        setValue("categoria", category);
    };
    return (React.createElement(dialog_1.Dialog, { open: open, onOpenChange: setOpen },
        React.createElement(dialog_1.DialogTrigger, { asChild: true }, children),
        React.createElement(dialog_1.DialogContent, { className: "sm:max-w-[425px]" },
            React.createElement(dialog_1.DialogHeader, null,
                React.createElement(dialog_1.DialogTitle, null, itemToUpdate ? "Actualizar Producto" : "Crear Producto"),
                React.createElement(dialog_1.DialogDescription, null, "Gestiona tus productos con la siguiente informaci\u00F3n")),
            React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
                React.createElement("div", { className: "grid gap-2" },
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "nombre" }, "Nombre"),
                        React.createElement(input_1.Input, __assign({}, register("nombre"), { id: "nombre", placeholder: "Nombre del producto", type: "text", autoComplete: "nombre" })),
                        React.createElement("p", { className: "form-error" }, (_b = errors.nombre) === null || _b === void 0 ? void 0 : _b.message)),
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "descripcion" }, "Descripci\u00F3n"),
                        React.createElement(input_1.Input, __assign({}, register("descripcion"), { id: "descripcion", placeholder: "Descripci\u00F3n del producto", type: "text", autoComplete: "descripcion" })),
                        React.createElement("p", { className: "form-error" }, (_c = errors.descripcion) === null || _c === void 0 ? void 0 : _c.message)),
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "categoria" }, "Categor\u00EDa"),
                        React.createElement(products_category_select_1.SelectCategoryes, { selectedCategory: form.watch("categoria") || null, onCategoryChange: handleCategoryChange }),
                        React.createElement("p", { className: "form-error" }, (_d = errors.categoria) === null || _d === void 0 ? void 0 : _d.message)),
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "Precio" }, "Precio"),
                        React.createElement(input_1.Input, __assign({}, register("precio"), { id: "precio", placeholder: "0.00", step: "0.01", type: "number" })),
                        React.createElement("p", { className: "form-error" }, (_e = errors.precio) === null || _e === void 0 ? void 0 : _e.message)),
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "Descuento" }, "Descuento"),
                        React.createElement(input_1.Input, __assign({}, register("descuento"), { id: "descuento", placeholder: "0.00", step: "0.01", type: "number" })),
                        React.createElement("p", { className: "form-error" }, (_f = errors.descuento) === null || _f === void 0 ? void 0 : _f.message)),
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "stockActual" }, "Stock Actual"),
                        React.createElement(input_1.Input, __assign({}, register("stockActual"), { id: "stockActual", placeholder: "0", step: "1", type: "number", min: "0" })),
                        React.createElement("p", { className: "form-error" }, (_g = errors.stockActual) === null || _g === void 0 ? void 0 :
                            _g.message,
                            " ")),
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "stockMinimo" }, "Stock M\u00EDnimo"),
                        React.createElement(input_1.Input, __assign({}, register("stockMinimo"), { id: "stockMinimo", placeholder: "0", step: "1", type: "number", min: "0" })),
                        React.createElement("p", { className: "form-error" }, (_h = errors.stockMinimo) === null || _h === void 0 ? void 0 : _h.message)),
                    React.createElement(dialog_1.DialogFooter, null,
                        React.createElement(button_1.Button, { type: "submit", disabled: isLoading },
                            isLoading && (React.createElement(lucide_react_1.LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" })),
                            itemToUpdate ? "Actualizar" : "Crear")))))));
}
exports.CreateUpdateItem = CreateUpdateItem;
