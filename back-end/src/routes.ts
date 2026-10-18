import { Router } from "express";
import { auth, login, logout, register } from './controller/user-controller.js';
import { adminMiddleware, authMiddleware } from "./middlewares/auth.js";
import { deleteProduct, getProducts } from "./controller/product-controller.js";
import { getCartItems, createCartItem, updateCartItem, deleteCartItem } from "./controller/cartItem-controller.js";
import { createOrder, getOrders, updateOrderStatus } from "./controller/order-controller.js";

export const router = Router();

// Rotas de usuário
router.post("/login", login);
router.post("/register", register);
router.get("/me", authMiddleware, auth);
router.post("/logout", authMiddleware, logout);

// Rota de produto
router.get("/get-products", getProducts)
router.delete("/delete-product/:id", authMiddleware, deleteProduct);

// Cart
router.get("/get-cart-items", authMiddleware, getCartItems);
router.post("/create-cart-item", authMiddleware, createCartItem);
router.patch("/update-cart-item/:id", authMiddleware, updateCartItem);
router.delete("/delete-cart-item/:id", authMiddleware, deleteCartItem);

// Orders
router.post("/create-order", authMiddleware, createOrder);
router.get("/get-orders", authMiddleware, adminMiddleware, getOrders);
router.patch("/update-order-status/:id", authMiddleware, adminMiddleware, updateOrderStatus);
