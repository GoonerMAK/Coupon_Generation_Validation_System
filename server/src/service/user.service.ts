import prisma from '../db.js';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';

const salt = bcrypt.genSalt();

export const createUser = async (
    username: string,
    password: string,
    email: string,
    name?: string,
    age?: number,
    gender?: string,
    nationality?: string
) => {
    const existingUserByUsername = await prisma.user.findUnique({
        where: { username },
    });

    const existingUserByEmail = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUserByUsername) {
        throw new Error('Username already exists');
    }

    if (existingUserByEmail) {
        throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, salt);

    return await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
            email,
            name,
            age,
            gender,
            nationality,
        },
    });
};

export const updateUser = async (
    id: string,
    data: {
        username?: string,
        password?: string,
        email?: string,
        name?: string,
        age?: number,
        gender?: string,
        nationality?: string
    }
) => {
    if (data.password) {
        data.password = await bcrypt.hash(data.password, salt);
    }

    return await prisma.user.update({
        where: { id },
        data,
    });
};

export const deleteUser = async (id: string) => {
    return await prisma.user.delete({
        where: { id },
    });
};

export const getAllUsers = async () => {
    return await prisma.user.findMany();
};

export const getUserById = async (id: string) => {
    return await prisma.user.findUnique({
        where: { id },
    });
};

export const getUserByUsername = async (username: string) => {
    return await prisma.user.findUnique({
        where: { username },
    });
};

export const getUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: { email },
    });
};

export const getAllUsernames = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
        },
    });

    return users.map(user => ({
        id: user.id,
        username: user.username,
    }));
};