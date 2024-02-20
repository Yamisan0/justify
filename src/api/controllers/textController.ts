import { justifyTextService } from "../services/textServices";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import * as http from "http";

dotenv.config();

export const justifyTextController = (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  let body = "";

  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ");
    const JWT_SECRET = process.env.JWT_SECRET;
    if (token[0] !== "Bearer" || token.length !== 2) {
      res.writeHead(401);
      res.end(JSON.stringify({ message: "Invalid Token" }));
      return;
    }

    try {
      jwt.verify(token[1], JWT_SECRET || "secretagarder"); // Verify the token
    } catch (error) {
      res.writeHead(401);
      res.end(JSON.stringify({ message: "Invalid Token" }));
      return;
    }
  }

  req.on("data", (chunk) => {
    body += chunk.toString(); //converting buffer to string
  });

  req.on("end", () => {
    const justifiedText = justifyTextService(body);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ justifiedText }));
  });
};
