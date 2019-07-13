import express, { NextFunction, Request, Response } from "express";

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.routeSetter();

        this.routeNotFound();
    }
    // handles all application routes
    private routeSetter = () => {
        this.app.get("/1", (req: Request, res: Response) => {
            res.send("Fridge app!");
        });
    }
    private routeNotFound = () => {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.status(404);
            res.send({ error: "Not found" });
        });
    }
}
export default new App().app;
