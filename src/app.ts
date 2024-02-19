import http from "http";
import { IncomingMessage , ServerResponse} from "http";
import dotenv from "dotenv";

dotenv.config();

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url === "/") {
    res.writeHead(200);
    res.end("Hello, World!");
  }
}

const PORT = process.env.NODE_PORT;

const server = http.createServer(requestListener);

server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
