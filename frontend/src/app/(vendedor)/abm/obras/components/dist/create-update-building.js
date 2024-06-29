"use strict";
//"user client";
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
exports.CreateUpdateBuilding = void 0;
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
var auth_1 = require("@/lib/auth");
var estado_enum_interface_1 = require("@/interfaces/estado-enum.interface");
var building_status_select_1 = require("@/components/ui/building-status-select");
var select_type_building_1 = require("@/components/ui/select-type-building");
var sheet_search_client_1 = require("@/components/ui/sheet-search-client");
function CreateUpdateBuilding(_a) {
    var _this = this;
    var _b, _c, _d, _e, _f, _g, _h;
    var children = _a.children, buildingToUpdate = _a.buildingToUpdate, getBuildings = _a.getBuildings;
    var user = use_user_1.useUser();
    var _j = react_1.useState(false), isLoading = _j[0], setIsLoading = _j[1];
    var _k = react_1.useState(false), open = _k[0], setOpen = _k[1];
    var _l = react_1.useState([]), clients = _l[0], setClients = _l[1];
    var _m = react_1.useState((buildingToUpdate === null || buildingToUpdate === void 0 ? void 0 : buildingToUpdate.cliente) || null), selectedClient = _m[0], setSelectedClient = _m[1];
    /* ========== Traer todos los Clientes para pasárselo a SheetSearch  ========== */
    var getClients = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, auth_1.getAllClients()];
                case 2:
                    res = (_a.sent());
                    console.log(res);
                    setClients(res);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        if (clients.length === 0) {
            getClients();
        }
    }, [user, clients]);
    /* ========== Formulario ========== */
    var formSchema = z.object({
        calle: z.string().min(2, {
            message: "Calle debe tener al menos 2 caracteres de longitud"
        }),
        estado: z.nativeEnum(estado_enum_interface_1.Estados),
        altura: z.string().min(1, {
            message: "La altura debe ser un número entero"
        }),
        ciudad: z.string().min(2, {
            message: "Ciudad debe tener al menos 2 caracteres de longitud"
        }),
        provincia: z.string().min(2, {
            message: "Provincia debe tener al menos 2 caracteres de longitud"
        }),
        presupuesto: z.coerce.number().min(0),
        esRemodelacion: z.boolean()
    });
    var form = react_hook_form_1.useForm({
        resolver: zod_1.zodResolver(formSchema),
        defaultValues: buildingToUpdate || {
            calle: "",
            estado: estado_enum_interface_1.Estados.HABILITADA,
            altura: "",
            ciudad: "",
            provincia: "",
            presupuesto: 0,
            esRemodelacion: false
        }
    });
    var register = form.register, handleSubmit = form.handleSubmit, formState = form.formState, setValue = form.setValue;
    var errors = formState.errors;
    /* ========== Traer las Coordenadas de la Obra ========== */
    var getCoordinatesFromAPI = function (address) { return __awaiter(_this, void 0, void 0, function () {
        var coordinates, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, auth_1.getCoordinates(address)];
                case 1:
                    coordinates = _a.sent();
                    console.log("Coordinates: ", coordinates);
                    return [2 /*return*/, coordinates];
                case 2:
                    error_2 = _a.sent();
                    console.error("Error getting coordinates: ", error_2);
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    /* ========== Crear o actualizar una Obra ========== */
    var onSubmit = function (building) { return __awaiter(_this, void 0, void 0, function () {
        var address, coordinates, newBuilding, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!selectedClient) {
                        alert("Debe seleccionar un cliente antes de guardar la obra.");
                        return [2 /*return*/];
                    }
                    setIsLoading(true);
                    address = {
                        calle: building.calle,
                        altura: building.altura,
                        ciudad: building.ciudad,
                        provincia: building.provincia,
                        pais: "Argentina"
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, getCoordinatesFromAPI(address)];
                case 2:
                    coordinates = _a.sent();
                    newBuilding = __assign(__assign({}, building), { lat: coordinates.lat, lng: coordinates.lon, pais: "Argentina", cliente: selectedClient });
                    if (!buildingToUpdate) return [3 /*break*/, 4];
                    return [4 /*yield*/, updateBuilding(newBuilding)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, createBuilding(newBuilding)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_3 = _a.sent();
                    console.error("Error creating or updating building: ", error_3);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    /* ========== Crear una nueva Obra ========== */
    var createBuilding = function (building) { return __awaiter(_this, void 0, void 0, function () {
        var error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    return [4 /*yield*/, auth_1.createObra(building)];
                case 1:
                    _a.sent();
                    react_hot_toast_1["default"].success("Obra creada correctamente");
                    getBuildings();
                    setOpen(false);
                    form.reset();
                    setSelectedClient(null);
                    return [3 /*break*/, 4];
                case 2:
                    error_4 = _a.sent();
                    react_hot_toast_1["default"].error(error_4.message, { duration: 2000 });
                    return [3 /*break*/, 4];
                case 3:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    /* ========== Actualizar una Obra ========== */
    var updateBuilding = function (building) { return __awaiter(_this, void 0, void 0, function () {
        var error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, auth_1.updateObra(buildingToUpdate === null || buildingToUpdate === void 0 ? void 0 : buildingToUpdate.id, building)];
                case 2:
                    _a.sent();
                    react_hot_toast_1["default"].success("Obra actualizada correctamente");
                    getBuildings();
                    setOpen(false);
                    form.reset();
                    setSelectedClient(null);
                    return [3 /*break*/, 5];
                case 3:
                    error_5 = _a.sent();
                    react_hot_toast_1["default"].error(error_5.message, { duration: 2000 });
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    /* ========== Manejo del select de Estados ========== */
    var handleStatusChange = function (status) {
        setValue("estado", status);
    };
    /* ========== Manejo del select de Tipo de Obra ========== */
    var handleTypeChange = function (type) {
        setValue("esRemodelacion", type);
    };
    var handleClientSelect = function (client) {
        console.log("Client en create-update-building: ", client);
        setSelectedClient(client);
    };
    return (React.createElement(dialog_1.Dialog, { open: open, onOpenChange: setOpen },
        React.createElement(dialog_1.DialogTrigger, { asChild: true }, children),
        React.createElement(dialog_1.DialogContent, { className: "sm:max-w-[425px]" },
            React.createElement(dialog_1.DialogHeader, null,
                React.createElement(dialog_1.DialogTitle, null, buildingToUpdate ? "Actualizar Obra" : "Alta de Obra"),
                React.createElement(dialog_1.DialogDescription, null, "Gestionar la Obra con la siguiente informaci\u00F3n")),
            React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
                React.createElement("div", { className: "grid gap-2" },
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "calle" }, "Calle"),
                        React.createElement(input_1.Input, __assign({}, register("calle", {
                            required: "La calle es obligatoria"
                        }), { id: "calle", placeholder: "Calle p\u00FAblica", type: "text", autoComplete: "calle" })),
                        React.createElement("p", { className: "form-error" }, (_b = errors.calle) === null || _b === void 0 ? void 0 : _b.message)),
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "altura" }, "altura"),
                        React.createElement(input_1.Input, __assign({}, register("altura", {
                            required: "La altura es obligatoria"
                        }), { id: "altura", placeholder: "1234", type: "text", autoComplete: "altura" })),
                        React.createElement("p", { className: "form-error" }, (_c = errors.altura) === null || _c === void 0 ? void 0 : _c.message)),
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "dni" }, "Ciudad"),
                        React.createElement(input_1.Input, __assign({}, register("ciudad", {
                            required: "La ciudad es obligatoria"
                        }), { id: "ciudad", placeholder: "Ascochinga", type: "text", autoComplete: "ciudad" })),
                        React.createElement("p", { className: "form-error" }, (_d = errors.ciudad) === null || _d === void 0 ? void 0 : _d.message)),
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "provincia" }, "Provincia"),
                        React.createElement(input_1.Input, __assign({}, register("provincia", {
                            required: "La provincia es obligatoria"
                        }), { id: "provincia", placeholder: "C\u00F3rdoba", type: "text", autoComplete: "provincia" })),
                        React.createElement("p", { className: "form-error" }, (_e = errors.provincia) === null || _e === void 0 ? void 0 : _e.message)),
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "presupuesto" }, "Presupuesto"),
                        React.createElement(input_1.Input, __assign({}, register("presupuesto", {
                            required: "presupuesto"
                        }), { id: "presupuesto", placeholder: "0.00", step: "0.01", type: "number" })),
                        React.createElement("p", { className: "form-error" }, (_f = errors.presupuesto) === null || _f === void 0 ? void 0 : _f.message)),
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "estado" }, "Estado"),
                        React.createElement(building_status_select_1.SelectStatus, { selectedStatus: form.watch("estado") || null, onStatusChange: handleStatusChange }),
                        React.createElement("p", { className: "form-error" }, (_g = errors.estado) === null || _g === void 0 ? void 0 : _g.message)),
                    React.createElement("div", { className: "mb-3" },
                        React.createElement(label_1.Label, { htmlFor: "esRemodelacion" }, "Tipo de Obra"),
                        React.createElement(select_type_building_1.SelectType, { selectedType: form.watch("esRemodelacion"), onTypeChange: handleTypeChange }),
                        React.createElement("p", { className: "form-error" }, (_h = errors.esRemodelacion) === null || _h === void 0 ? void 0 : _h.message)),
                    React.createElement(dialog_1.DialogFooter, null,
                        React.createElement(sheet_search_client_1.SheetSearchClient, { buildingToUpdate: buildingToUpdate, isLoading: isLoading, clients: clients, onSelectClient: handleClientSelect }),
                        React.createElement(button_1.Button, { type: "submit", disabled: isLoading },
                            isLoading && (React.createElement(lucide_react_1.LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" })),
                            buildingToUpdate ? "Actualizar" : "Crear")))))));
}
exports.CreateUpdateBuilding = CreateUpdateBuilding;
