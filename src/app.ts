import http from "http";
import dotenv from "dotenv";

dotenv.config();

// Create a basic server
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, World!\n");
});

const PORT = process.env.NODE_PORT;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
