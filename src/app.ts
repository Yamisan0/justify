import http, { IncomingMessage, ServerResponse } from "http";
import { DataInteractionService } from "./api/services/databaseServices";
import cron from "node-cron";
import dotenv from "dotenv";
import { justifyTextController } from "./api/controllers/textController";
import { generateToken } from "./api/controllers/authController";

dotenv.config();

/**
 * Handles incoming HTTP requests and routes them to the appropriate controller functions.
 */
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

/**
 * Schedule a task to reset the daily counter at midnight.
 */
cron.schedule(
  "0 0 * * *",
  async () => {
    await DataInteractionService.resetDailyCounter();
    console.log("Reset daily counter task executed.");
  },
  {
    scheduled: true,
    timezone: "Europe/Paris",
  }
);

const PORT = process.env.NODE_PORT || 3000; // Updated to use PORT instead of NODE_PORT for convention

const server = http.createServer(requestListener);

server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

export { server }