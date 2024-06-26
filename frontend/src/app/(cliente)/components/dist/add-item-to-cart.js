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
exports.__esModule = true;
exports.AddItemToCart = void 0;
var dialog_1 = require("@/components/ui/dialog");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var react_hook_form_1 = require("react-hook-form");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
exports.AddItemToCart = function (_a) {
    var children = _a.children, item = _a.item, addItem = _a.addItem;
    var _b = react_1.useState(false), open = _b[0], setOpen = _b[1];
    var _c = react_hook_form_1.useForm({
        defaultValues: {
            nombre: item.nombre,
            descripcion: item.descripcion,
            precio: item.precio,
            cantidad: 1
        }
    }), control = _c.control, handleSubmit = _c.handleSubmit, watch = _c.watch;
    var cantidad = watch("cantidad");
    var totalItem = item.precio * cantidad;
    var onSubmit = function (data) {
        addItem(__assign(__assign({}, item), { cantidad: data.cantidad }));
        console.log("Item agregado al carrito", __assign(__assign({}, item), { cantidad: data.cantidad }));
        setOpen(false);
    };
    return (React.createElement(dialog_1.Dialog, { open: open, onOpenChange: setOpen },
        React.createElement(dialog_1.DialogTrigger, { asChild: true }, children),
        React.createElement(dialog_1.DialogContent, { className: "sm:max-w-[425px]" },
            React.createElement(dialog_1.DialogHeader, null,
                React.createElement(dialog_1.DialogTitle, null,
                    "Agregar ",
                    item.nombre,
                    " al carrito"),
                React.createElement(dialog_1.DialogDescription, null, "Ajusta la cantidad y revisa el total antes de agregar al carrito.")),
            React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
                React.createElement("div", { className: "grid gap-2" },
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "nombre" }, "Nombre"),
                        React.createElement(input_1.Input, { id: "nombre", value: item.nombre, disabled: true })),
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "descripcion" }, "Descripci\u00F3n"),
                        React.createElement(input_1.Input, { id: "descripcion", value: item.descripcion, disabled: true })),
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "precio" }, "Precio"),
                        React.createElement(input_1.Input, { id: "precio", value: item.precio.toFixed(2), disabled: true })),
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "cantidad" }, "Cantidad"),
                        React.createElement(react_hook_form_1.Controller, { name: "cantidad", control: control, render: function (_a) {
                                var field = _a.field;
                                return (React.createElement(input_1.Input, __assign({ id: "cantidad", type: "number" }, field, { min: 0 })));
                            } })),
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "totalItem" }, "Total"),
                        React.createElement(input_1.Input, { id: "totalItem", value: totalItem.toFixed(2), disabled: true })),
                    React.createElement(dialog_1.DialogFooter, null,
                        React.createElement(button_1.Button, { type: "submit" }, "Agregar")))))));
};
exports["default"] = exports.AddItemToCart;
