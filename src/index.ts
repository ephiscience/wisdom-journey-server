import { server } from "./server";
import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("combined"));
server.applyMiddleware({ app, path: "/api" });

new Promise<void>((resolve) => {
  const server = app.listen({ port: 4000 }, () => resolve());

  process.on("SIGTERM", () => {
    server.close(() => {
      console.log("HTTP server closed");
    });
  });
}).then((server) => {
  console.log(`🚀 Server ready`);
});
