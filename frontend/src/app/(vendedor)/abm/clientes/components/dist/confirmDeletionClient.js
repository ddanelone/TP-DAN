"use strict";
exports.__esModule = true;
exports.ConfirmDeletionClient = void 0;
var alert_dialog_1 = require("@/components/ui/alert-dialog");
function ConfirmDeletionClient(_a) {
    var children = _a.children, deleteClient = _a.deleteClient, client = _a.client;
    return (React.createElement(alert_dialog_1.AlertDialog, null,
        React.createElement(alert_dialog_1.AlertDialogTrigger, { asChild: true }, children),
        React.createElement(alert_dialog_1.AlertDialogContent, null,
            React.createElement(alert_dialog_1.AlertDialogHeader, null,
                React.createElement(alert_dialog_1.AlertDialogTitle, null, "\u00BFEst\u00E1s seguro de querer eliminar el Cliente?"),
                React.createElement(alert_dialog_1.AlertDialogDescription, null, "Esta acci\u00F3n es permamente y no podr\u00E1s deshacerla luego.")),
            React.createElement(alert_dialog_1.AlertDialogFooter, null,
                React.createElement(alert_dialog_1.AlertDialogCancel, null, "Cancelar"),
                React.createElement(alert_dialog_1.AlertDialogAction, { onClick: function () { return deleteClient(client); } }, "Eliminar")))));
}
exports.ConfirmDeletionClient = ConfirmDeletionClient;
