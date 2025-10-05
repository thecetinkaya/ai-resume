import { getAllUsers } from "../models/user.model";

export const fetchUsers = async () => {
    const users = await getAllUsers();
    return users;
};