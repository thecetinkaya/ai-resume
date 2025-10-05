import { hashPassword, comparePassword } from "../utils/bcrypt.utils";
import { generateToken } from "../utils/jwt.utils";
import prisma from "../config/prismaClient";

export const registerUser = async (email: string, password: string, name: string) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: { email, password: hashedPassword, name },
    });

    const token = generateToken(user.id); // email değil user.id

    return { user, token };
};

export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error("Invalid credentials");
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }

    const token = generateToken(user.id); // email değil user.id

    return { user, token };
}