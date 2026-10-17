import type { Request, Response } from "express";
import { prisma } from "../db.js";

export async function createOrder(req: Request, res: Response) {
   try {
    const { user } = req;

    const cartItems = await prisma.cartItem.findMany({
        where: { userId: user.id },
        include: { product: true },
    });

    if (cartItems.length === 0) {
        return res.status(400).json({ message: "Carrinho vazio" });
    }

    let total = 0;

    for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        if (!item) continue;
        total += item.product.price * item.quantity;
    }

    console.log(cartItems);

    const order = await prisma.order.create({
        data: {
            total,
            userId: user.id,
            order: {
                create: cartItems.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.product.price,
                })),
            },
        },
        include: { order: true },
    });

    await prisma.cartItem.deleteMany({where: { userId: user.id }})

    res.status(201).json(order);
   } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro ao criar pedido" });
   }
}
