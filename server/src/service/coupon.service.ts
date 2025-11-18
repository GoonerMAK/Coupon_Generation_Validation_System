import prisma from '../db.js';
import { CouponType } from '@prisma/client';

export const createCoupon = async (
    type: CouponType,
    max_usage?: number,
    max_uses_per_user?: number,
    valid_from?: Date,
    valid_until?: Date
) => {
    return await prisma.coupon.create({
        data: {
            type,
            max_usage,
            max_uses_per_user,
            valid_from,
            valid_until,
        },
    });
};

export const updateCoupon = async (
    id: string,
    data: {
        type?: CouponType,
        max_usage?: number,
        max_uses_per_user?: number,
        valid_from?: Date,
        valid_until?: Date,
        total_uses?: number,
        is_valid?: boolean
    }
) => {
    return await prisma.coupon.update({
        where: { id },
        data,
    });
};

export const deleteCoupon = async (id: string) => {
    return await prisma.coupon.delete({
        where: { id },
    });
};

export const getAllCoupons = async () => {
    return await prisma.coupon.findMany();
};

export const getCouponById = async (id: string) => {
    return await prisma.coupon.findUnique({
        where: { id },
    });
};

export const getValidCoupons = async () => {
    return await prisma.coupon.findMany({
        where: {
            is_valid: true,
        },
    });
};