"use strict";
exports.__esModule = true;
exports.ConfirmNavigationClient = void 0;
var alert_dialog_1 = require("@/components/ui/alert-dialog");
function ConfirmNavigationClient(_a) {
    var children = _a.children, viewBuildingsClients = _a.viewBuildingsClients, client = _a.client;
    return (React.createElement(alert_dialog_1.AlertDialog, null,
        React.createElement(alert_dialog_1.AlertDialogTrigger, { asChild: true }, children),
        React.createElement(alert_dialog_1.AlertDialogContent, null,
            React.createElement(alert_dialog_1.AlertDialogHeader, null,
                React.createElement(alert_dialog_1.AlertDialogTitle, null, "\u00BFNavegar hacia el ABM de Obras?"),
                React.createElement(alert_dialog_1.AlertDialogDescription, null, "Listar\u00E1 las obras asignadas a este cliente \u00FAnicamente.")),
            React.createElement(alert_dialog_1.AlertDialogFooter, null,
                React.createElement(alert_dialog_1.AlertDialogCancel, null, "Cancelar"),
                React.createElement(alert_dialog_1.AlertDialogAction, { onClick: function () { return viewBuildingsClients(client); } }, "Navegar")))));
}
exports.ConfirmNavigationClient = ConfirmNavigationClient;
