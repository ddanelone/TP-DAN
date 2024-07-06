import { Badge } from "@/components/ui/badge";
import { Order } from "@/interfaces/order.interface";
import { formatDate } from "@/action/format-date";

interface ListHistoryOrderProps {
  order: Order;
}

export function ListHistoryOrders({ order }: ListHistoryOrderProps) {
  console.log("Order to view:", order);

  if (!order.historialEstado || order.historialEstado.length === 0) {
    console.log("No historialEstado to display");
    return (
      <div className="w-full block">
        <p>No hay historial de estados disponible.</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full block h-96 overflow-y-auto">
        <div className="flex justify-start items-center">
          <div className="ml-6">
            <h3 className="font-semibold">
              Número de Orden: {order.numeroPedido}
            </h3>

            <div className="text-sm">
              Fecha Cambio:{" "}
              {order.fecha ? formatDate(new Date(order.fecha)) : "N/A"} <br />
              Cliente Nombre: {order.cliente.nombre} <br />
              Apellido: {order.cliente.apellido} <br />
            </div>
          </div>
        </div>

        {order.historialEstado.map((historial, index) => (
          <div
            key={index}
            className="flex items-center mb-6 justify-between border border-solid border-gray-300 rounded-xl p-6"
          >
            <div className="flex justify-start items-center">
              <div className="ml-6">
                <div className="text-sm">
                  Fecha Cambio:{" "}
                  {historial.fechaCambio
                    ? formatDate(new Date(historial.fechaCambio))
                    : "N/A"}{" "}
                  <br />
                  Usuario: {historial.usuarioCambio} <br />
                  <Badge className="mt-2" variant={"outline"}>
                    Estado: {historial.estado}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
