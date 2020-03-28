import DataController from "./datacontroller";

export default class FollowingController extends DataController {
  constructor() {
    super("following", "foodapp");
  }
  public followWithId = async (
    followerId: string,
    followeeId: string,
    type: string
  ) => {
    const followObject = {
      followerId: this.getObjectId(followerId),
      followeeId: this.getObjectId(followeeId),
      followeeType: type,
      type: "following"
    };
    return await this._insert(followObject);
  }
  public getFollowers = async (userId: string, followType?: string) => {
    const findObject: any = {
      followerId: userId
    };
    if (followType) {
      findObject.followeeType = followType;
    }
    await this._connect();
    const followers = await this.collection
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "followerId",
            foreignField: "_id",
            as: "followedUsers"
          }
        },
        {
          $match : {followerId: this.getObjectId("5e4041dcc88c754668ac1f3e")}
        }
      ])
      .toArray();

    await this._close();
    return followers;
    //  return await this._get(findObject);
  }
}
