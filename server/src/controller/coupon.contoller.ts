import { Request, Response } from 'express';
import * as couponService from '../service/coupon.service.js';
import { CouponType } from '@prisma/client';

interface CouponParams {
    id: string;
}

interface CouponCreate {
    type: CouponType;
    max_usage?: number;
    max_uses_per_user?: number;
    valid_from?: Date;
    valid_until?: Date;
}

interface CouponUpdate {
    data: {
        type?: CouponType;
        max_usage?: number;
        max_uses_per_user?: number;
        valid_from?: Date;
        valid_until?: Date;
        total_uses?: number;
        is_valid?: boolean;
    };
}

export const createCoupon = async (req: Request<unknown, unknown, CouponCreate, unknown>, res: Response) => {
    const { type, max_usage, max_uses_per_user, valid_from, valid_until } = req.body;
    try {
        const newCoupon = await couponService.createCoupon(
            type,
            max_usage,
            max_uses_per_user,
            valid_from,
            valid_until
        );
        res.status(201).json(newCoupon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateCoupon = async (req: Request<CouponParams, unknown, CouponUpdate, unknown>, res: Response) => {
    const { id } = req.params;
    const data = req.body.data;
    try {
        const updatedCoupon = await couponService.updateCoupon(id, data);
        if (!updatedCoupon) {
            res.status(404).json({ error: `Coupon with id ${id} not found` });
        } else {
            res.status(200).json(updatedCoupon);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCoupon = async (req: Request<CouponParams, unknown, unknown, unknown>, res: Response) => {
    const { id } = req.params;
    try {
        const deletedCoupon = await couponService.deleteCoupon(id);
        if (!deletedCoupon) {
            res.status(404).json({ error: `Coupon with id ${id} not found` });
        } else {
            res.status(200).json(deletedCoupon);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllCoupons = async (_req: Request<unknown, unknown, unknown, unknown>, res: Response) => {
    try {
        const coupons = await couponService.getAllCoupons();
        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCouponById = async (req: Request<CouponParams, unknown, unknown, unknown>, res: Response) => {
    const { id } = req.params;
    try {
        const coupon = await couponService.getCouponById(id);
        if (!coupon) {
            res.status(404).json({ error: `Coupon with id ${id} not found` });
        } else {
            res.status(200).json(coupon);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getValidCoupons = async (_req: Request<unknown, unknown, unknown, unknown>, res: Response) => {
    try {
        const validCoupons = await couponService.getValidCoupons();
        res.status(200).json(validCoupons);
    } catch (error) {
        console.error('Error fetching valid coupons:', error);
        res.status(500).json({ error: 'Failed to fetch valid coupons' });
    }
};