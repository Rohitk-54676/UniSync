import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthTokenPayload extends JwtPayload {
  userId: string;
  role: "student" | "admin";
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: "student" | "admin";
      };
    }
  }
}

const protect = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authorization = req.headers.authorization;

    if (
      !authorization ||
      !authorization.startsWith("Bearer ")
    ) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });

      return;
    }

    const token = authorization.split(" ")[1];

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(
      token,
      secret
    ) as AuthTokenPayload;

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        success: false,
        message: "Session expired",
      });

      return;
    }

    res.status(401).json({
      success: false,
      message: "Invalid authentication token",
    });
  }
};

export default protect;