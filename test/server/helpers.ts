import { basename } from "../unit/helpers";
import http from "http";

export const serverAddress = `http://localhost:${
  Number(process.env.PORT) || 3000
}${basename}`;

export const getServerPath = (path: string, withBug: boolean = false) => {
  return `${serverAddress}${path}${
    withBug && process.env.BUG_ID ? `?bug_id=${process.env.BUG_ID}` : ""
  }`;
};

export const makeJsonRequest = (url: string) =>
  new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        const { statusCode } = res;

        res.setEncoding("utf8");

        let rawData = "";
        res.on("data", (chunk) => {
          rawData += chunk;
        });
        res.on("end", () => {
          const data = JSON.parse(rawData);
          resolve({ statusCode, data });
        });
      })
      .on("error", (err) => reject("Error occured | " + err));
  }) as Promise<{ statusCode: number | undefined; data: any }>;
