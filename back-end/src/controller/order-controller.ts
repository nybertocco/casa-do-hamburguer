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

export async function getOrders(req: Request, res: Response) {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true } },
        order: { include: { product: { select: { name: true } } } },
      },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar pedidos" });
  }
}

export async function updateOrderStatus(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pendente", "Retirado", "Cancelado"].includes(status)) {
      res.status(400).json({ message: "Status inválido" });
      return;
    }

    const order = await prisma.order.update({
      where: { id: String(id) },
      data: { status },
    });

    res.json(order);
  } catch (error: any) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "Pedido não encontrado" });
      return;
    }
    res.status(500).json({ message: "Erro ao atualizar pedido" });
  }
}
