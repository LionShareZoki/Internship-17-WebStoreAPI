import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.create({
    data: {
      email: 'admin@store.com',
      password: 'admin123',
      name: 'Admin User',
      isAdmin: true,
    },
  });

  const user = await prisma.user.create({
    data: {
      email: 'user@store.com',
      password: 'user123',
      name: 'Regular User',
      isAdmin: false,
    },
  });

  const product1 = await prisma.product.create({
    data: {
      name: 'Gaming Laptop',
      description: 'High-end gaming laptop with powerful specs.',
      price: 1500.0,
      stock: 5,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Wireless Headphones',
      description: 'Noise-cancelling wireless headphones.',
      price: 200.0,
      stock: 10,
    },
  });

  await prisma.cart.create({
    data: {
      userId: user.id,
      items: {
        create: [{ productId: product1.id, quantity: 1 }],
      },
    },
  });

  await prisma.wishlist.create({
    data: {
      userId: user.id,
      items: {
        create: [{ productId: product2.id }],
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: user.id,
      total: product1.price,
      status: 'completed',
      items: {
        create: [
          { productId: product1.id, quantity: 1, price: product1.price },
        ],
      },
    },
  });

  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
