import { NextFunction, Request, Response, Router } from "express";
import FatSecretAPI from "../services/fatscretAPI";

class FoodRoute {
    public router: Router;
    constructor() {
        this.router = Router();
    }
    // place new routes here
    public init() {
        this.router.get("/search", this.foodSearch);
    }
    private async foodSearch(req: Request, res: Response, next: NextFunction) {
        try {
            const fatSecretAPI = new FatSecretAPI();
            console.log(req.query.searchQuery);
            const foodSearch = await fatSecretAPI.foodSearch(req.query.searchQuery);
            return (
                res.status(200).json({
                    food: foodSearch.foods.food
                })
            );
        } catch (error) {
            return (
                res.status(400).json({
                    error
                })
            );
        }
    }
}
const foodRoute = new FoodRoute();
foodRoute.init();
export default foodRoute.router;
