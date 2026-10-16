import { ChevronLeft, ChevronRight, Trash } from "lucide-react";
import { formatterPrice } from "../utils/formatter";

type CartItemType = {
  title: string;
  price: number;
  img: string;
  quantity: number;
  id: string;
};

const CartItem = ({ title, price, img, id, quantity }: CartItemType) => {
  return (
    <div className="flex items-center gap-3">
      <img src={`./${img}`} alt="" className="w-[100px] rounded-md" />

      <div className="flex-1">
        <p className="text-sm font-bold uppercase">{title}</p>
        <p className="text-sm font-bold text-[#505050]">
          {formatterPrice(price)}
        </p>
        <div className="mt-1 flex items-center gap-4">
          <ChevronLeft
            className="cursor-pointer rounded-md bg-[#C92A0E] p-1 text-white"
            size={25}
          />
          <p className="text-sm font-bold">{quantity}</p>
          <ChevronRight
            className="cursor-pointer rounded-md bg-[#C92A0E] p-1 text-white"
            size={25}
          />
        </div>
      </div>

      <Trash size={18} className="cursor-pointer" onClick={() => alert(id)} />
    </div>
  );
};

export default CartItem;
