import { justifyTextService } from "../services/textServices";
import { DataInteractionService } from "../services/databaseServices";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import * as http from "http";

dotenv.config();

export const justifyTextController = (
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


  req.on("data", (chunk) => {
    body += chunk.toString(); //converting buffer to string
  });

  req.on("end", () => {
    const justified = justifyTextService(body);
    console.log(email);
    DataInteractionService.updateUser(email, justified.tokenLength);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ justifiedText: justified.newText }));
  });
};
