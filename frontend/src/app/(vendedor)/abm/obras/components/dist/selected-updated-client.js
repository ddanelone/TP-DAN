"user client";
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
exports.CreateClientBuilding = void 0;
var dialog_1 = require("@/components/ui/dialog");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var react_hot_toast_1 = require("react-hot-toast");
var use_user_1 = require("@/hooks/use-user");
var button_1 = require("@/components/ui/button");
function CreateClientBuilding(_a) {
    var _this = this;
    var children = _a.children, buildingToUpdate = _a.buildingToUpdate, getBuildings = _a.getBuildings;
    var user = use_user_1.useUser();
    var _b = react_1.useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var _c = react_1.useState(false), open = _c[0], setOpen = _c[1];
    /* ========== Crear o actualizar una Obra ========== */
    var onSubmit = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setIsLoading(true);
            try {
                if (buildingToUpdate) {
                    //    await updateBuilding(newBuilding);
                }
                else {
                    //  await createBuilding(newBuilding);
                }
            }
            catch (error) {
                console.error("Error creating or updating building: ", error);
            }
            return [2 /*return*/];
        });
    }); };
    /* ========== Crear una nueva Obra ========== */
    var createBuilding = function (building) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                //      await createObra(building);
                react_hot_toast_1["default"].success("Obra creada correctamente");
                getBuildings();
                setOpen(false);
            }
            catch (error) {
                react_hot_toast_1["default"].error(error.message, { duration: 2000 });
            }
            finally {
                setIsLoading(false);
            }
            return [2 /*return*/];
        });
    }); };
    /* ========== Actualizar una Obra ========== */
    var updateBuilding = function (building) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setIsLoading(true);
            try {
                //    await updateObra(buildingToUpdate?.id, building);
                react_hot_toast_1["default"].success("Obra actualizada correctamente");
                getBuildings();
                setOpen(false);
            }
            catch (error) {
                react_hot_toast_1["default"].error(error.message, { duration: 2000 });
            }
            finally {
                setIsLoading(false);
            }
            return [2 /*return*/];
        });
    }); };
    return (React.createElement(dialog_1.Dialog, { open: open, onOpenChange: setOpen },
        React.createElement(dialog_1.DialogTrigger, { asChild: true }, children),
        React.createElement(dialog_1.DialogContent, { className: "sm:max-w-[425px]" },
            React.createElement(dialog_1.DialogHeader, null,
                React.createElement(dialog_1.DialogTitle, null, buildingToUpdate ? "Actualizar Obra" : "Alta de Obra"),
                React.createElement(dialog_1.DialogDescription, null, "Gestionar la Obra con la siguiente informaci\u00F3n")),
            React.createElement(dialog_1.DialogFooter, null,
                React.createElement(button_1.Button, { type: "submit", disabled: isLoading },
                    isLoading && (React.createElement(lucide_react_1.LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" })),
                    buildingToUpdate ? "Modificar Cliente" : "Asignar Cliente"),
                React.createElement(button_1.Button, { type: "submit", disabled: isLoading },
                    isLoading && (React.createElement(lucide_react_1.LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" })),
                    buildingToUpdate ? "Actualizar" : "Crear")))));
}
exports.CreateClientBuilding = CreateClientBuilding;
