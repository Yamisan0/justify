import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secretagarder";

const TokenService = {
  createToken: (payload: { email: string }) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  },
};

export default TokenService;
