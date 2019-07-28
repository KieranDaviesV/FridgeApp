import express, { NextFunction, Request, Response } from "express";
import foodRoute from "./routes/foodRoute";
class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.routeSetter();

        this.routeNotFound();
    }
    // handles all application routes
    private routeSetter = async () => {
        this.app.use("/api/food", foodRoute);
    }
    private routeNotFound = () => {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.status(404);
            res.send({ error: "Not found" });
        });
    }
}
export default new App().app;
