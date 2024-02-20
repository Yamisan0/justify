import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// import { config } from ../config.ts;

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

const TokenService = {
  createToken: (payload: { email: string }) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  },
};

export default TokenService;
