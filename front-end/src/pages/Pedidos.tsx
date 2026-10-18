import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CardPedido from "../components/CardPedido";
import { API_URL } from "../config";

type OrderType = {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  user: { name: string };
  order: { quantity: number; product: { name: string } }[];
};

const Pedidos = () => {
  const [category, setCategory] = useState("Pendente");
  const [orders, setOrders] = useState<OrderType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/get-orders`, {
          credentials: "include",
        });

        if (!response.ok) {
          navigate("/", { replace: true });
          return;
        }

        setOrders(await response.json());
      } catch (error) {
        console.log(error);
      }
    };

    getOrders();
  }, [navigate]);

  const handleChangeStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`${API_URL}/update-order-status/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      if (!response.ok) return;

      setOrders((prev) =>
        prev.map((order) => (order.id === id ? { ...order, status } : order)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeCategory = (newCategory: string) => {
    setCategory(newCategory);
  };

  const getCategoryClass = (categoryName: string) => {
    const elementoSelecionado =
      "md:text-md flex h-7 w-24 cursor-pointer items-center justify-center rounded-md border-1 border-[#F2DAAC] bg-[#F2DAAC] text-sm font-bold text-[#161410] md:h-9";
    const elementoNaoSelecionado =
      "md:text-md flex h-7 w-24 cursor-pointer items-center justify-center rounded-md border-1 border-[#F2DAAC] bg-[#161410] text-sm font-bold text-[#F2DAAC] hover:bg-[#F2DAAC] hover:text-[#161410] md:h-9";

    if (category === categoryName) {
      return elementoSelecionado;
    } else {
      return elementoNaoSelecionado;
    }
  };

  return (
    <div className="mx-auto w-full px-3 text-white md:w-[737px] md:px-0">
      {/* Categorias */}
      <div className="mt-1 mb-3 flex gap-2 md:my-3">
        <div
          className={getCategoryClass("Pendente")}
          onClick={() => handleChangeCategory("Pendente")}
        >
          Pendente
        </div>
        <div
          className={getCategoryClass("Retirado")}
          onClick={() => handleChangeCategory("Retirado")}
        >
          Retirado
        </div>
        <div
          className={getCategoryClass("Cancelado")}
          onClick={() => handleChangeCategory("Cancelado")}
        >
          Cancelado
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {orders
          .filter((order) => order.status === category)
          .map((order) => (
            <CardPedido
              key={order.id}
              id={order.id}
              name={order.user.name}
              date={new Date(order.createdAt).toLocaleDateString("pt-BR")}
              orderTime={new Date(order.createdAt).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
              status={order.status}
              items={order.order.map((item) => ({
                name: item.product.name,
                quantity: item.quantity,
              }))}
              total={order.total}
              onChangeStatus={(status) => handleChangeStatus(order.id, status)}
            />
          ))}
      </div>
    </div>
  );
};

export default Pedidos;
