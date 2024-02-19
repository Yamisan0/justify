import http, { IncomingMessage, ServerResponse } from "http";
import { justifyTextController } from "./api/controllers/textController";
import dotenv from "dotenv";

dotenv.config();

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url === "/api/token" && req.method === "POST") {
    justifyTextController(req, res);
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
};

const PORT = process.env.NODE_PORT;

const server = http.createServer(requestListener);

server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
