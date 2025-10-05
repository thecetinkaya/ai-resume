import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const generateToken = (userId: string | number): string => {
    return jwt.sign({ userId: userId.toString() }, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};

export const getTokenFromHeader = (header: string): string | null => {
    if (header && header.startsWith("Bearer ")) {
        return header.split(" ")[1];
    }
    return null;
};