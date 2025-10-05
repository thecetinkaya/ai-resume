import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.services";

export const register = async (req: Request, res: Response) => {
    console.log("Register endpoint hit!"); // Debug
    console.log("Request body:", req.body);
    try {
        const { email, password, name, role = "user" } = req.body;

        // Validation ekleyin
        if (!email || !password || !name) {
            return res.status(400).json({
                message: 'Email, password and name are required'
            });
        }
        console.log("Calling registerUser...");

        const result = await registerUser(email, password, name);
        console.log("Calling registerUser...");

        const { password: _, ...userWithoutPassword } = result.user;
        res.status(201).json({
            message: 'User registered successfully',
            user: userWithoutPassword,
            token: result.token
        });
    } catch (error) {
        console.error("Register error:", error); // Debug
        res.status(400).json({
            message: 'Registration failed',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Validation ekleyin
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        const result = await loginUser(email, password);

        const { password: _, ...userWithoutPassword } = result.user;
        res.status(200).json({
            message: 'Login successful',
            user: userWithoutPassword,
            token: result.token
        });
    } catch (error) {
        res.status(401).json({ // Login için 401 daha uygun
            message: 'Invalid credentials',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};