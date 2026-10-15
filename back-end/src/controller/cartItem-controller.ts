import type { Response, Request } from "express";
import { prisma } from "../db.js";

export async function getCartItems(req: Request, res: Response) {
    try {
        const {user} = req;

        const cartItems = await prisma.cartItem.findMany({
        where: {userId: user.id},
        include: {product: true},
    });

    res.json(cartItems);
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor" });
        return;
    }
}