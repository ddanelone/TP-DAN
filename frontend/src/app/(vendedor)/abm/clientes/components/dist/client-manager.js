"use client";
"use strict";
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
var lucide_react_1 = require("lucide-react");
var react_hot_toast_1 = require("react-hot-toast");
var table_client_1 = require("@/components/ui/table-client");
var auth_1 = require("@/lib/auth");
var create_update_client_1 = require("./create-update-client");
var list_client_1 = require("@/components/ui/list-client");
var CustomerManager = function () {
    var user = use_user_1.useUser();
    var _a = react_1.useState([]), clients = _a[0], setClients = _a[1];
    var _b = react_1.useState(true), isLoading = _b[0], setIsLoading = _b[1];
    /* ========== Traer todos los Clientes a la Tabla  ========== */
    var getClients = function () { return __awaiter(void 0, void 0, void 0, function () {
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
    /* ========== Borrar un Cliente de la base de datos ========== */
    var deleteCostumer = function (client) { return __awaiter(void 0, void 0, void 0, function () {
        var newClients, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, auth_1.deleteClient(client === null || client === void 0 ? void 0 : client.id)];
                case 2:
                    _a.sent();
                    react_hot_toast_1["default"].success("Cliente eliminado correctamente");
                    newClients = clients.filter(function (i) { return i.id !== client.id; });
                    setClients(newClients);
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    react_hot_toast_1["default"].error("No se pudo eliminar el Cliente: " + error_2.message, {
                        duration: 4000
                    });
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        if (user)
            getClients();
    }, [user]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "flex justify-between items-center m-4 mb-8" },
            React.createElement("div", null,
                React.createElement("h1", { className: "text-2xl ml-1" }, "Administraci\u00F3n de Clientes"),
                React.createElement(badge_1.Badge, { className: "mt-2 text-[14px]", variant: "outline" }, "SECCI\u00D3N EXCLUSIVA PARA VENDEDORES")),
            React.createElement(create_update_client_1.CreateUpdateClient, { getClients: getClients },
                React.createElement(button_1.Button, { className: "px-6" },
                    "Crear",
                    React.createElement(lucide_react_1.CirclePlus, { className: "ml-2 w-[20px]" })))),
        React.createElement("div", { className: "m-4" },
            React.createElement(table_client_1.TableClient, { isLoading: isLoading, clients: clients, getClients: getClients, deleteClient: deleteCostumer }),
            React.createElement(list_client_1["default"], { isLoading: isLoading, clients: clients, getClients: getClients, deleteClient: deleteCostumer }))));
};
exports["default"] = CustomerManager;
