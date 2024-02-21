import { IncomingMessage } from "http";

/**
 * Parses the request body of an IncomingMessage object and returns it as a Promise.
 */
export const parseRequestBody = (req: IncomingMessage): Promise<any> => {
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