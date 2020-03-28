import { NextFunction, Request, Response, Router } from "express";
import FollowingController from "../datacontroller/followingcontroller";
import UserController from "../datacontroller/usercontroller";

class UserRoute {
  public router: Router;
  constructor() {
    this.router = Router();
  }
  public init() {
    this.router.get("/get/:userId", this.getUserId);
    this.router.post("/create", this.createUser);
    this.router.post("/follow", this.followObject);
    this.router.get("/followers", this.getFollowers);
  }
  private async getUserId(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Getting user via ID");
      const userController = new UserController();
      const getUser = await userController.getUserById(req.params.userId);
      return res.status(200).json({
        messsage: "Retrieved User",
        user: getUser
      });
    } catch (error) {
      return res.status(200).json({
        messsage: "created user",
        error
      });
    }

  }
  private async getFollowers(req: Request, res: Response, next: NextFunction) {
    const followerController = new FollowingController();
    const getFollowers: any[] = await followerController.getFollowers("5e4041dcc88c754668ac1f3e");

    return res.status(200).json({
      messsage: "found followers",
      results: getFollowers
    });

  }
  private async followObject(req: Request, res: Response, next: NextFunction) {
    const followController = new FollowingController();
    const followed = await followController.followWithId("5e4041dcc88c754668ac1f3e", "5e4423f51f6ae539ecd7bb14", "user");
    return res.status(200).json({
      messsage: "followed user",
      followed
    });
  }
  private async createUser(req: Request, res: Response, next: NextFunction) {
    const userController = new UserController();

    const results = await userController.insertUser({
      firstName: "kieran",
      lastName: "davies",
      email: "email@email"
    });
    return res.status(200).json({
      messsage: "created user",
      results
    });
  }
}
const userRoute = new UserRoute();
userRoute.init();
export default userRoute.router;
