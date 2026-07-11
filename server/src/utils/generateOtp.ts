import { randomInt } from "node:crypto";

const generateOtp = (): string => {
  return randomInt(100000, 1000000).toString();
};

export default generateOtp;