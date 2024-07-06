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
exports.UpdateStatusOrder = void 0;
var dialog_1 = require("@/components/ui/dialog");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var react_hot_toast_1 = require("react-hot-toast");
var use_user_1 = require("@/hooks/use-user");
var button_1 = require("@/components/ui/button");
var status_select_1 = require("./status-select");
var auth_1 = require("@/lib/auth");
var react_hook_form_1 = require("react-hook-form");
function UpdateStatusOrder(_a) {
    var _this = this;
    var _b, _c;
    var children = _a.children, orderToUpdate = _a.orderToUpdate, getOrders = _a.getOrders;
    var _d = react_hook_form_1.useForm({
        defaultValues: orderToUpdate
    }), register = _d.register, handleSubmit = _d.handleSubmit, setValue = _d.setValue, watch = _d.watch;
    var user = use_user_1.useUser();
    var _e = react_1.useState(false), isLoading = _e[0], setIsLoading = _e[1];
    var _f = react_1.useState(false), open = _f[0], setOpen = _f[1];
    /* ========== Actualizar Estado ========== */
    var onSubmit = function (data) { return __awaiter(_this, void 0, void 0, function () {
        var newStatus;
        return __generator(this, function (_a) {
            newStatus = watch("estado");
            if (orderToUpdate && newStatus) {
                updateStatus(orderToUpdate.id, newStatus, user === null || user === void 0 ? void 0 : user.name);
            }
            return [2 /*return*/];
        });
    }); };
    /* ========== Actualizar un item en la base de datos ========== */
    var updateStatus = function (pedidoId, nuevoEstado, usuarioCambio) { return __awaiter(_this, void 0, void 0, function () {
        var orderHistory, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    orderHistory = { nuevoEstado: nuevoEstado, usuarioCambio: usuarioCambio };
                    return [4 /*yield*/, auth_1.newStatusOrder(pedidoId, orderHistory)];
                case 2:
                    _a.sent();
                    react_hot_toast_1["default"].success("Item actualizado correctamente");
                    getOrders();
                    setOpen(false);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    react_hot_toast_1["default"].error(error_1.message, { duration: 2500 });
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    /* ========== Manejo del select de Estado ========== */
    var handleStatusChange = function (status) {
        setValue("estado", status);
    };
    return (React.createElement(dialog_1.Dialog, { open: open, onOpenChange: setOpen },
        React.createElement(dialog_1.DialogTrigger, { asChild: true }, children),
        React.createElement(dialog_1.DialogContent, { className: "sm:max-w-[425px]" },
            React.createElement(dialog_1.DialogHeader, null,
                React.createElement(dialog_1.DialogTitle, null, "Cambiar Estado"),
                React.createElement(dialog_1.DialogDescription, null, "Gestiona el Estado del Pedido")),
            React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
                React.createElement("div", { className: "grid gap-2" },
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "numeroPedido" }, "Nro. Pedido"),
                        React.createElement(input_1.Input, __assign({ id: "numeroPedido", type: "text", autoComplete: "numeroPedido", disabled: true }, register("numeroPedido")))),
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "fecha" }, "Fecha"),
                        React.createElement(input_1.Input, __assign({ id: "fecha", type: "text", autoComplete: "fecha", disabled: true }, register("fecha")))),
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "clienteNombre" }, "Nombre"),
                        React.createElement(input_1.Input, { id: "clienteNombre", type: "text", disabled: true, value: ((_b = orderToUpdate === null || orderToUpdate === void 0 ? void 0 : orderToUpdate.cliente) === null || _b === void 0 ? void 0 : _b.nombre) || "" })),
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "clienteApellido" }, "Apellido"),
                        React.createElement(input_1.Input, { id: "clienteApellido", type: "text", disabled: true, value: ((_c = orderToUpdate === null || orderToUpdate === void 0 ? void 0 : orderToUpdate.cliente) === null || _c === void 0 ? void 0 : _c.apellido) || "" })),
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "observaciones" }, "Observaciones"),
                        React.createElement(input_1.Input, __assign({ id: "observaciones", type: "text", disabled: true }, register("observaciones")))),
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "estado" }, "Estado"),
                        React.createElement(status_select_1.SelectStatus, { selectedStatus: watch("estado") || null, onStatusChange: handleStatusChange })),
                    React.createElement(dialog_1.DialogFooter, null,
                        React.createElement(button_1.Button, { type: "submit", disabled: isLoading },
                            isLoading && (React.createElement(lucide_react_1.LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" })),
                            "Actualizar Estado")))))));
}
exports.UpdateStatusOrder = UpdateStatusOrder;
