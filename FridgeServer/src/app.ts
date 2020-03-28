import express, { NextFunction, Request, Response } from "express";
import { MongoClient } from "mongodb";
import foodRoute from "./routes/foodRoute";
import usersRoute from "./routes/usersRoute";

const dev = true;

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    // this.setUpDatabase();
    this.routeSetter();

    this.routeNotFound();
  }
  // handles all application routes
  private routeSetter = async () => {
    console.log("Routes setting up");
    this.app.use("/api/food", foodRoute);
    this.app.use("/api/users", usersRoute);
  }
  private routeNotFound = () => {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404);
      res.send({ error: "Not found", request: req });
    });
  }
  // private setUpDatabase = () => {

  // }
}
export default new App().app;
