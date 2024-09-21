import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';
import { xenditCreateInvoice } from '@/lib/xendit'; // Import Xendit invoice creation function
import { sendOrderStatusUpdate } from '@/lib/websocket'; // Import WebSocket function for real-time update

export async function POST(req: Request) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { storeId, cartId, paymentMethod, address } = await req.json();
  const userId = token.id;

  // Fetch cart items along with product and options
  const cartItems = await prisma.cartItem.findMany({
    where: { cartId },
    include: {
      product: true,
      options: { include: { optionValue: true } },
    },
  });

  if (!cartItems.length) return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });

  // Calculate total price
  let totalPrice = 0;
  const orderItemsData = cartItems.map((item) => {
    // Calculate price for each item, including option values
    let itemTotalPrice = item.totalBasePrice;
    item.options.forEach((opt) => {
      itemTotalPrice += opt.optionValue.additional_price;
    });

    totalPrice += itemTotalPrice * item.quantity;

    return {
      productId: item.productId,
      quantity: item.quantity,
      price: itemTotalPrice, // Final price with options
      options: {
        create: item.options.map((opt) => ({
          optionValueId: opt.optionValueId,
        })),
      },
    };
  });

  // Create the order in the database
  const order = await prisma.order.create({
    data: {
      userId,
      storeId,
      status: 'PENDING',
      totalPrice,
      orderItems: {
        create: orderItemsData,
      },
    },
  });

  // Clear the cart after creating the order
  await prisma.cartItem.deleteMany({ where: { cartId } });

  // Create a Xendit invoice
  const invoice = await xenditCreateInvoice({
    external_id: `order-${order.id}`,
    payer_email: token.email,
    description: `Order #${order.id}`,
    amount: totalPrice,
    payment_method: paymentMethod, // Use the selected payment method
  });

  // Save the transaction data in the database
  await prisma.transaction.create({
    data: {
      orderId: order.id,
      amount: totalPrice,
      status: 'PENDING',
      paymentProvider: 'Xendit',
    },
  });

  // Trigger WebSocket event for real-time status update
  sendOrderStatusUpdate(order.id, 'PENDING');

  return NextResponse.json({
    order,
    invoice, // Return the invoice details to the client
  });
}

export async function POST(req: Request) {
  const { orderId, status } = await req.json();

  // Update order status
  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });

  // Trigger WebSocket update
  sendOrderStatusUpdate(orderId, status);

  return NextResponse.json(order);
}
