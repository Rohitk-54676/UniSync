import jwt, { SignOptions } from "jsonwebtoken";

interface TokenPayload {
  userId: string;
  role: "student" | "admin";
}

const generateToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN ||
      "7d") as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, secret, options);
};

export default generateToken;