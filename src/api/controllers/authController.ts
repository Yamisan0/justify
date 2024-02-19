import { IncomingMessage, ServerResponse } from "http";
import TokenService from "../services/tokenServices";

/**
 * Parses the request body of an IncomingMessage object and returns it as a Promise.
 */
const parseRequestBody = (req: IncomingMessage): Promise<any> => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString(); // Convert binary data to string and append it
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body)); // Attempt to parse the accumulated string as JSON
      } catch (error) {
        reject(error);
      }
    });
  });
};

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
