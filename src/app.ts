import http, { IncomingMessage, ServerResponse } from "http";
import dotenv from "dotenv";

// Assuming these are implemented elsewhere in your project
import { justifyTextController } from "./api/controllers/textController";
import { generateToken } from "./api/controllers/authController";

dotenv.config();

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

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url === "/api/token" && req.method === "POST") {
    generateToken(req, res);
  } else if (req.url === "/api/justify" && req.method === "POST") {
    justifyTextController(req, res);
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
};

const PORT = process.env.PORT || 3000; // Updated to use PORT instead of NODE_PORT for convention

const server = http.createServer(requestListener);

server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
