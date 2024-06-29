"use strict";
exports.__esModule = true;
exports.SheetSearchClient = void 0;
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var sheet_1 = require("@/components/ui/sheet");
var list_client_building_1 = require("@/app/(vendedor)/abm/obras/components/list-client-building");
function SheetSearchClient(_a) {
    var isLoading = _a.isLoading, buildingToUpdate = _a.buildingToUpdate, clients = _a.clients, onSelectClient = _a.onSelectClient;
    var _b = react_1.useState(""), apellido = _b[0], setApellido = _b[1];
    var _c = react_1.useState(""), nombre = _c[0], setNombre = _c[1];
    var _d = react_1.useState(""), dni = _d[0], setDni = _d[1];
    var _e = react_1.useState(clients), filteredClients = _e[0], setFilteredClients = _e[1];
    var _f = react_1.useState(false), isSheetOpen = _f[0], setIsSheetOpen = _f[1];
    react_1.useEffect(function () {
        var filtered = clients.filter(function (client) {
            return ((!apellido ||
                client.apellido.toLowerCase().includes(apellido.toLowerCase())) &&
                (!nombre ||
                    client.nombre.toLowerCase().includes(nombre.toLowerCase())) &&
                (!dni || client.dni.includes(dni)));
        });
        setFilteredClients(filtered);
    }, [apellido, nombre, dni, clients]);
    var handleSelectClient = function (client) {
        onSelectClient(client);
        console.log("Client en sheet-search-client ", client);
        setIsSheetOpen(false); // Cerrar el Sheet al seleccionar un cliente
    };
    return (React.createElement(sheet_1.Sheet, { open: isSheetOpen, onOpenChange: setIsSheetOpen },
        React.createElement(sheet_1.SheetTrigger, { asChild: true },
            React.createElement(button_1.Button, { variant: "outline", onClick: function () { return setIsSheetOpen(true); } }, buildingToUpdate ? "Actualizar Cliente" : "Asignar a Cliente")),
        React.createElement(sheet_1.SheetContent, null,
            React.createElement(sheet_1.SheetHeader, null,
                React.createElement(sheet_1.SheetTitle, null, "Buscar Cliente"),
                React.createElement(sheet_1.SheetDescription, null, "Ingrese al menos UN criterio de b\u00FAsqueda")),
            React.createElement("div", { className: "grid gap-4 py-4" },
                React.createElement("div", { className: "grid grid-cols-4 items-center gap-4" },
                    React.createElement(label_1.Label, { htmlFor: "apellido", className: "text-right" }, "Apellido"),
                    React.createElement(input_1.Input, { id: "apellido", placeholder: "P\u00E9rez", className: "col-span-3", value: apellido, onChange: function (e) { return setApellido(e.target.value); } })),
                React.createElement("div", { className: "grid grid-cols-4 items-center gap-4" },
                    React.createElement(label_1.Label, { htmlFor: "nombre", className: "text-right" }, "Nombre"),
                    React.createElement(input_1.Input, { id: "nombre", placeholder: "Juan", className: "col-span-3", value: nombre, onChange: function (e) { return setNombre(e.target.value); } })),
                React.createElement("div", { className: "grid grid-cols-4 items-center gap-4" },
                    React.createElement(label_1.Label, { htmlFor: "documento", className: "text-right" }, "D.N.I."),
                    React.createElement(input_1.Input, { id: "documento", placeholder: "12345678", className: "col-span-3", value: dni, onChange: function (e) { return setDni(e.target.value); } }))),
            React.createElement(sheet_1.SheetFooter, null,
                React.createElement(button_1.Button, { type: "button", onClick: function () { return setIsSheetOpen(false); } }, "Cancelar")),
            React.createElement("br", null),
            React.createElement(list_client_building_1["default"], { isLoading: isLoading, clients: filteredClients, onSelectClient: handleSelectClient }))));
}
exports.SheetSearchClient = SheetSearchClient;
