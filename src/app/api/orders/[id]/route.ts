import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'PUT') {
        const { status } = req.body;

        try {
            const updatedOrder = await prisma.order.update({
                where: { id: parseInt(id) },
                data: {
                    status
                }
            });
            res.status(200).json(updatedOrder);
        } catch (error) {
            res.status(500).json({ error: 'Error updating order' });
        }
    }
}
