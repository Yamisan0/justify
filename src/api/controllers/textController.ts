import { justifyTextService } from "../services/textServices";
import { DataInteractionService } from "../services/databaseServices";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import * as http from "http";

dotenv.config();

export const justifyTextController = async (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  let body = "";
  let email = "";

  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ");
    const JWT_SECRET = process.env.JWT_SECRET;
    if (token[0] !== "Bearer" || token.length !== 2) {
      res.writeHead(401);
      res.end(JSON.stringify({ message: "Invalid Token" }));
      return;
    }

    try {
      const decoded = jwt.verify(token[1], JWT_SECRET || "secretagarder"); // Verify the token
      email = (decoded as { email: string }).email; // Extract the email by typeasserting the decoded token
      // console.log(email);
    } catch (error) {
      res.writeHead(401);
      res.end(JSON.stringify({ message: "Invalid Token" }));
      return;
    }
  }

  const tokenLength = await DataInteractionService.getTokens(email);
  const RATE_LIMIT = process.env.RATE_LIMIT || 80000;
  if (tokenLength > Number(RATE_LIMIT)) {
    res.writeHead(402);
    res.end(JSON.stringify({ message: "Payment Required" }));
    return;
  }

  req.on("data", (chunk) => {
    body += chunk.toString(); //converting buffer to string
  });

  req.on("end", () => {
    const justified = justifyTextService(body, 80);
    DataInteractionService.updateUser(email, justified.tokenLength);

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(JSON.stringify({ justifiedText: justified.newText }));
  });
};
