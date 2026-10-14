import { ChevronLeft, ChevronRight, Trash } from "lucide-react";

const CartItem = () => {
  return (
    <div className="flex items-center gap-3">
      <img src="./duplo-da-casa.png" alt="" className="w-[100px] rounded-md" />

      <div className="flex-1">
        <p className="font-bold uppercase">Duplo da casa</p>
        <p className="font-bold text-[#505050]">R$28,90</p>
        <div className="mt-1 flex gap-4">
          <ChevronLeft
            className="cursor-pointer rounded-md bg-[#C92A0E] p-1 text-white"
            size={25}
          />
          <p className="font-bold">1</p>
          <ChevronRight
            className="cursor-pointer rounded-md bg-[#C92A0E] p-1 text-white"
            size={25}
          />
        </div>
      </div>

      <Trash size={18} className="cursor-pointer" />
    </div>
  );
};

export default CartItem;
