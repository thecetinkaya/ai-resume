import { Request, Response } from "express";
import { fetchUsers } from "../services/user.services";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await fetchUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Kullanıcılar alınamadı", error });
    }
};