import prisma from "../config/prismaClient";

export const getAllUsers = async () => {
    return await prisma.user.findMany();
};
