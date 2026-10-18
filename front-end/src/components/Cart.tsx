import { X } from "lucide-react";
import Button from "./Button";
import CartItem from "./CartItem";
import { useContext, useEffect } from "react";
import { CartItemContext } from "../contexts/CartItemsContext";

import { API_URL } from "../config";
type CartTypeProps = {
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Cart = ({ setShowCart }: CartTypeProps) => {
  // const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const { cartItems, setCartItems } = useContext(CartItemContext);

  async function handleCreateOrder() {
    try {
      const response = await fetch(`${API_URL}/create-order`, {
        method: "POST",
        credentials: "include",
      });

      if (cartItems.length === 0) {
        console.log("Carrinho vazio");
        return;
      }

      if (!response.ok) {
        console.log("Erro ao finalizar pedido");
        return;
      }

      setCartItems([]);

      setShowCart(false);

      console.log("Pedido realizado com sucesso");
    } catch (err) {
      console.log(err);
      return;
    }
  }

  const getCartItems = async () => {
    try {
      const response = await fetch(`${API_URL}/get-cart-items`, {
        credentials: "include",
      });

      if (!response.ok) {
        console.log("Erro ao realizar a requisição");
        return;
      }

      const data = await response.json();
      console.log(data);
      setCartItems(data);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const changeQuantity = async (id: string, action: "inc" | "dec") => {
    try {
      await fetch(`${API_URL}/update-cart-item/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ action }),
      });
      getCartItems();
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id: string) => {
    try {
      await fetch(`${API_URL}/delete-cart-item/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      getCartItems();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div className="absolute right-0 z-1 flex h-screen w-[375px] flex-col bg-[#F2DAAC] p-5">
      <div className="flex justify-between">
        <X
          className="cursor-pointer"
          onClick={() => setShowCart(false)}
        />
        <p className="font-bold uppercase">Meu carrinho</p>
      </div>

      <div className="mt-10 flex flex-1 flex-col gap-2">
        {cartItems.map(
          (item: {
            id: string;
            quantity: number;
            product: {
              id: string;
              name: string;
              price: number;
              img: string;
            };
          }) => (
            <CartItem
              key={item.id}
              title={item.product.name}
              price={item.product.price}
              img={item.product.img}
              quantity={item.quantity}
              id={item.id}
              onChangeQuantity={changeQuantity}
              onRemove={removeItem}
            />
          ),
        )}
      </div>
      <Button title="Finalizar pedido" onClick={handleCreateOrder} />
    </div>
  );
};

export default Cart;
