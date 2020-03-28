import { Collection, Db, MongoClient, ObjectID } from "mongodb";
import IKeyValue from "../interfaces/IKeyValue";

export interface IGetQuery {
  [key: string]: any;
  $or?: any[];
  //   key: string;
  //   value: any;
}
export default class DataController {
  public type: string;
  protected collection: Collection;
  private MongoClient: MongoClient;
  private db: Db;
  private dbName: string;

  constructor(type: string, db: string) {
    this.dbName = db;
    const url = "mongodb://localhost:27017/";
    this.type = type;
    this.MongoClient = new MongoClient(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
  }
  public getObjectId = (id: string) => {
    return new ObjectID(id);
  }

  protected _get = async <T>(queryParameters: IGetQuery): Promise<T[]> => {
    try {
      await this._connect();
      console.log(queryParameters);
      const results = await this.collection.find(queryParameters).toArray();
      this._close();
      return results;
    } catch (error) {
      console.log({ error });
    }
  }

  protected _insert = async <T>(insertObject: T) => {
    await this._connect();
    const insertResults = await this.collection.insertOne(insertObject);
    await this._close();
    return insertResults;
  }

  protected _connect = async () => {
    this.MongoClient = await this.MongoClient.connect();
    this.db = await this.MongoClient.db(this.dbName);
    this.collection = this.db.collection(this.type);
  }
  protected _close = async () => {
    //   if(this.)
    await this.MongoClient.close();
  }

  private createParameters = (parameters: IKeyValue) => {
    const parameterObject: any = {};
    for (const [key, value] of Object.entries(parameters)) {
      parameterObject[key] = value;
    }
    return parameterObject;
  }
}
