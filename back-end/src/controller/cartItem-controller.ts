import type { Response, Request } from "express";
import { prisma } from "../db.js";

export async function getCartItems(req: Request, res: Response) {
  try {
    const { user } = req;

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: user.id },
      include: { product: true },
    });

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
    return;
  }
}

export async function createCartItem(req: Request, res: Response) {
  try {
    const { user } = req;
    const { productId } = req.body;

    if (!productId) {
      res.status(400).json({ message: "productId é obrigatório" });
      return;
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: { productId: productId, userId: user.id },
    });

    let cartItem;

    if (existingItem) {
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: { increment: 1 } },
      });
    } else {
      cartItem = await prisma.cartItem.create({
        data: {
          product: { connect: { id: productId } },
          user: { connect: { id: user.id } },
        },
      });
    }

    const statusCode = cartItem.quantity === 1 ? 201 : 200;

    res.status(statusCode).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar item ao carrinho" });
    return;
  }
}

export async function updateCartItem(req: Request, res: Response) {
  try {
    const { user } = req;
    const { id } = req.params;
    const { action } = req.body;

    const item = await prisma.cartItem.findFirst({
      where: { id: String(id), userId: user.id },
    });

    if (!item) {
      res.status(404).json({ message: "Item não encontrado" });
      return;
    }

    const quantity = action === "dec" ? item.quantity - 1 : item.quantity + 1;

    if (quantity < 1) {
      await prisma.cartItem.delete({ where: { id: item.id } });
      res.json({ message: "Item removido" });
      return;
    }

    const updated = await prisma.cartItem.update({
      where: { id: item.id },
      data: { quantity },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar o item" });
  }
}

export async function deleteCartItem(req: Request, res: Response) {
  try {
    const { user } = req;
    const { id } = req.params;

    await prisma.cartItem.deleteMany({
      where: { id: String(id), userId: user.id },
    });

    res.json({ message: "Item removido" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover o item" });
  }
}
