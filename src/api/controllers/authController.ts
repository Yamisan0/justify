import { IncomingMessage, ServerResponse } from "http";
import TokenService from "../services/tokenServices";
import { parseRequestBody } from "../utils/ParseRequestBody";
/**
 * Generates a token based on the email provided in the request body.
 */
export const generateToken = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  try {
    const body = await parseRequestBody(req);
    const email = body.email;
    if (!email) {
      res.writeHead(400);
      res.end(JSON.stringify({ message: "Email is required" }));
      return;
    }

    const token = TokenService.createToken({ email });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ token }));
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ message: "Internal server error" }));
  }
};
