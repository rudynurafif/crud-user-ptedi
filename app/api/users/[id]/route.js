import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async (req, { params }) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        userid: parseInt(params.id),
      },
    });
    if (!user) return new Response('User not found', { status: 404 });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch user');
  }
};

export const PUT = async (req, { params }) => {
  try {
    const { namalengkap, username, password, status } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { userid: parseInt(params.id) },
      data: {
        namalengkap,
        username,
        password,
        status,
      },
    });

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.log(error)
    return new Response('Failed to update user', { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await prisma.user.delete({
      where: { userid: parseInt(params.id) },
    });

    return new Response('User deleted successfully', { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to delete user', { status: 500 });
  }
};
