import paymentModel from '../models/payment.model.js'
import userModel from "../models/user.model.js";
import AppError from "../utils/error.utils.js";
import { razorpay } from "../server.js";
import crypto from 'crypto';

export const getRazorPayApiKey = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: "Razorpay API Key",
            key: process.env.RAZORPAY_KEY_ID
        })
    } catch (e) {
        return next(new AppError(e.message, 500))
    }

}

export const buySubscription = async (req, res, next) => {
    try {
        const { id } = req.user;
        const user = await userModel.findById(id);

        if (!user) {
            return next(new AppError("Unauthorized, please login"));
        }

        if (user.role === "ADMIN") {
            return next(new AppError("Admin cannot purchase a subscription", 400));
        }

        const subscription = await razorpay.subscriptions.create({
            plan_id: process.env.RAZORPAY_PLAN_ID,
            customer_notify: 1,
            total_count: 12
        });

        user.subscription.id = subscription.id;
        user.subscription.status = subscription.status;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Subscribed Successfully",
            subscription_id: subscription.id,
        });
    } catch (e) {
        return next(new AppError(e.message, 500));
    }
};


export const verifySubscription = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { razorpay_payment_id, razorpay_signature, razorpay_subscription_id } = req.body;

        const user = await userModel.findById(id);
        if (!user) {
            return next(new AppError('Unauthorised, please login', 500))
        }

        const subscriptionId = user.subscription.id;

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(`${razorpay_payment_id}|${subscriptionId}`)
            .digest('hex');

        if (generatedSignature !== razorpay_signature) {
            return next(new AppError("Payment Not Verified, please try again", 500))
        }

        await paymentModel.create({
            razorpay_payment_id,
            razorpay_signature,
            razorpay_subscription_id
        })

        user.subscription.status = 'active';
        await user.save();

        res.status(200).json({
            success: true,
            message: "Payment Varified Successfully"
        })
    } catch (e) {
        return next(new AppError(e.message, 500))
    }
}

// payment.controller.js

export const cancelSubscription = async (req, res, next) => {
    const { id } = req.user;
    const user = await userModel.findById(id);

    if (user.role === 'ADMIN') {
        return next(
            new AppError('Admin does not need to cannot cancel subscription', 400)
        );
    }

    const subscriptionId = user.subscription.id;

    try {
        let subscriptionStatus = 'cancelled'; // Default to 'cancelled' if no specific Razorpay status

        try {
            // Attempt to cancel the subscription on Razorpay
            const subscription = await razorpay.subscriptions.cancel(
                subscriptionId
            );
            subscriptionStatus = subscription.status; // Get the actual status from Razorpay (e.g., 'cancelled')
        } catch (razorpayError) {
            // Check if the error is specifically because it's already in a final/non-cancellable state
            if (
                razorpayError.error &&
                razorpayError.error.code === 'BAD_REQUEST_ERROR' &&
                (
                    razorpayError.error.description.includes('Subscription is not cancellable in cancelled status') ||
                    razorpayError.error.description.includes('Subscription is not cancellable in completed status') || // ADD THIS LINE
                    razorpayError.error.description.includes('Subscription is not cancellable in expired status')   // OPTIONAL: Add if you want to handle expired too
                )
            ) {
                // If Razorpay says it's already in a final non-cancellable state,
                // we treat this as a "success" for our local sync purposes.
                console.log(`Subscription ${subscriptionId} already in final state on Razorpay. Syncing status.`);
                subscriptionStatus = 'cancelled'; // Force local status to 'cancelled' or 'completed' based on your preferred final state
            } else {
                // For any other unexpected Razorpay error, re-throw it as a real backend error
                return next(new AppError(razorpayError.error.description, razorpayError.statusCode || 500));
            }
        }

        // Update user's subscription status in your DB to reflect the actual status or the forced 'cancelled' status
        user.subscription.status = subscriptionStatus;
        await user.save(); // This will now be reached and update the DB

        // Send success response to frontend
        res.status(200).json({
            success: true,
            message: 'Subscription status updated successfully (or cancelled)', // More generic message
            status: user.subscription.status // Send the updated status
        });

    } catch (e) {
        // Catch any other unexpected errors during the process
        return next(new AppError(e.message || 'Failed to process subscription status', 500));
    }
};

export const allPayments = async (req, res, next) => {
    try {
        const { count } = req.query;

        const subscriptions = await razorpay.subscriptions.all({
            count: count || 10,
        });

        res.status(200).json({
            success: true,
            message: 'All Payments',
            allPayments: subscriptions
        });
    } catch (e) {
        return next(new AppError(e.message, 500));
    }
};
