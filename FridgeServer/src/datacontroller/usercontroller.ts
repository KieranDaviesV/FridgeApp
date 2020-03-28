import { ObjectId } from "mongodb";
import DataController, { IGetQuery } from "./datacontroller";

export default class UserController extends DataController {
  constructor() {
    super("users", "foodapp");
  }
  public getUsers = async (queryObject: IGetQuery) => {
    return await this._get(queryObject);
  }
  public insertUser = async (userObject: any) => {
    const insertUserObject = {
      firstName: userObject.firstName,
      lastName: userObject.lastName,
      email: userObject.email,
      type: this.type
    };
    return await this._insert(insertUserObject);
  }
  // public get
  public getUserById = async (userId: string) => {
    const objectId = new ObjectId(userId);
    const results = await this._get({ _id: objectId });
    if (results.length > 1) {
      throw new Error("We have multiple of the same id");
    }
    return results[0];
  }
}
