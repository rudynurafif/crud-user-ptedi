import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        userid: 'asc',
      },
    });
    if (!users) return new Response('Users not found', { status: 404 });

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch users', { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    const { namalengkap, username, password, status } = await req.json();

    const newUser = await prisma.user.create({
      data: {
        namalengkap,
        username,
        password,
        status,
      },
    });

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response('Failed to create user', { status: 500 });
  }
};
