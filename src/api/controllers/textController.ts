import { justifyTextService } from "../services/textServices";
import * as http from "http";

export const justifyTextController = (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  let body = "";

  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if 
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
