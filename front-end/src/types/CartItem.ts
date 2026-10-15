import type { JSX } from "react/jsx-runtime";
import type { ProductType } from "./Product";

export type CartItemType = {
    map(arg0: (item: { product: { name: string; price: number; img: string; }; }) => JSX.Element): import("react").ReactNode;
    id: string;
    userId: string;
    productId: string;
    product: ProductType;
};

export type CartItemsContextType = {
    cartItems: CartItemType[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>;
};