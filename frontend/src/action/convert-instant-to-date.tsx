import { Order } from "@/interfaces/order.interface";
import { useEffect, useState } from "react";

interface Props {
  order: Order;
}

const DateConverter: React.FC<Props> = ({ order }) => {
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    if (order.fecha) {
      const date = new Date(order.fecha);
      const formatted = date.toLocaleDateString("es-AR");
      setFormattedDate(formatted);
    }
  }, [order.fecha]);

  return (
    <div>
      <p>{formattedDate}</p>
    </div>
  );
};

export default DateConverter;
