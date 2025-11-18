import { Request, Response } from 'express';
import * as userService from '../service/user.service.js';

interface UserParams {
    id: string;
}

interface UserCreate {
    username: string;
    password: string;
    email: string;
    name?: string;
    age?: number;
    gender?: string;
    nationality?: string;
}

interface UserUpdate {
    data: {
        username?: string;
        password?: string;
        email?: string;
        name?: string;
        age?: number;
        gender?: string;
        nationality?: string;
    };
}

export const createUser = async (req: Request<unknown, unknown, UserCreate, unknown>, res: Response) => {
    const { username, password, email, name, age, gender, nationality } = req.body;
    try {
        const newUser = await userService.createUser(username, password, email, name, age, gender, nationality);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUser = async (req: Request<UserParams, unknown, UserUpdate, unknown>, res: Response) => {
    const { id } = req.params;
    const data = req.body.data;
    try {
        const updatedUser = await userService.updateUser(id, data);
        if (!updatedUser) {
            res.status(404).json({ error: `User with id ${id} not found` });
        } else {
            res.status(200).json(updatedUser);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteUser = async (req: Request<UserParams, unknown, unknown, unknown>, res: Response) => {
    const { id } = req.params;
    try {
        const deletedUser = await userService.deleteUser(id);
        if (!deletedUser) {
            res.status(404).json({ error: `User with id ${id} not found` });
        } else {
            res.status(200).json(deletedUser);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllUsers = async (_req: Request<unknown, unknown, unknown, unknown>, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserById = async (req: Request<UserParams, unknown, unknown, unknown>, res: Response) => {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(id);
        if (!user) {
            res.status(404).json({ error: `User with id ${id} not found` });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserByUsername = async (req: Request<{ username: string }, unknown, unknown, unknown>, res: Response) => {
    const { username } = req.params;
    try {
        const user = await userService.getUserByUsername(username);
        if (!user) {
            res.status(404).json({ error: `User with username ${username} not found` });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserByEmail = async (req: Request<{ email: string }, unknown, unknown, unknown>, res: Response) => {
    const { email } = req.params;
    try {
        const user = await userService.getUserByEmail(email);
        if (!user) {
            res.status(404).json({ error: `User with email ${email} not found` });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllUsernames = async (_req: Request<unknown, unknown, unknown, unknown>, res: Response) => {
    try {
        const usernames = await userService.getAllUsernames();
        res.status(200).json(usernames);
    } catch (error) {
        console.error('Error fetching usernames:', error);
        res.status(500).json({ error: 'Failed to fetch usernames' });
    }
};