import express from "express";
import "dotenv/config";
import { productRouter, mainRouter, cartRouter } from "../routes/index.js";

// create class Server
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use("/api", mainRouter);
    this.app.use("/api/productos", productRouter);
    this.app.use("/api/carritos", cartRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

export default Server;
