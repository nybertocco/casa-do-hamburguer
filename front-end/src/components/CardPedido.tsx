import { CalendarFold, User, Watch } from "lucide-react";
import { formatterPrice } from "../utils/formatter";

type CardPedidoType = {
  id: string;
  name: string;
  date: string;
  orderTime: string;
  status: string;
  items: { name: string; quantity: number }[];
  total: number;
  onChangeStatus: (status: string) => void;
};

const CardPedido = ({
  id,
  name,
  date,
  orderTime,
  status,
  items,
  total,
  onChangeStatus,
}: CardPedidoType) => {
  return (
    <div className="rounded-md bg-[#F2DAAC] p-2 text-[#32343E]">
      <div className="flex justify-between">
        <p className="font-bold">#{id.slice(0, 6).toUpperCase()}</p>
        <select
          className="font-bold"
          value={status}
          onChange={(e) => onChangeStatus(e.target.value)}
        >
          <option value="Pendente">Pendente</option>
          <option value="Retirado">Retirado</option>
          <option value="Cancelado">Cancelado</option>
        </select>
      </div>

      <div className="mt-2 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <User size={16} />
          <p className="text-xs">{name}</p>
        </div>
        <div className="flex items-center gap-2">
          <CalendarFold size={16} />
          <p className="text-xs">{date}</p>
        </div>
        <div className="flex items-center gap-2">
          <Watch size={16} />
          <p className="text-xs">{orderTime}</p>
        </div>

        <ul className="text-xs">
          {items.map((item, index) => (
            <li key={index}>
              {item.quantity}x {item.name}
            </li>
          ))}
        </ul>

        <div className="mt-1 h-[2px] w-full bg-[#32343E]"></div>

        <p className="text-right text-lg font-bold">{formatterPrice(total)}</p>
      </div>
    </div>
  );
};

export default CardPedido;
