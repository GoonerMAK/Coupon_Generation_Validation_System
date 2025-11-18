import { Router } from 'express';
import * as couponController from '../controller/coupon.contoller';

export const couponRouter = Router();

couponRouter.post('/coupons', couponController.createCoupon);

couponRouter.put('/coupons/:id', couponController.updateCoupon);

couponRouter.delete('/coupons/:id', couponController.deleteCoupon);

couponRouter.get('/coupons/valid', couponController.getValidCoupons);

couponRouter.get('/coupons', couponController.getAllCoupons);

couponRouter.get('/coupons/:id', couponController.getCouponById);