import { NextFunction, Request, Response } from "express";
import { AuthCustomRequest } from "./auth.middleware";
import { SubscriptionLevel } from "../utils/types";
import { subscriptionModel } from "../app.data";

function canConvert(updatedAt: Date, limitPerMinute: number) {
  const difference = Math.round(
    (new Date().getTime() - updatedAt.getTime()) / 60000
  );
  return difference > limitPerMinute;
}

export const subscriptionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req as AuthCustomRequest;
  if (
    user.subscription.converts > 0 ||
    user.subscription.subscription_type === SubscriptionLevel.INFINITE
  ) {
    const { limitPerMinute } =
      subscriptionModel[user.subscription.subscription_type];
    if (
      limitPerMinute > 0 &&
      !canConvert(user.subscription.updated_at, limitPerMinute)
    ) {
      return res.status(429).json({
        error: `You have requested a convertion within the last ${limitPerMinute} minute${
          limitPerMinute > 1 ? "s" : ""
        }, please wait a bit.`,
      });
    }
    next();
  } else {
    res.status(403).json({
      error:
        "You have reached your subscription limit, either wait until it resets or upgrade your subscription.",
    });
  }
};
