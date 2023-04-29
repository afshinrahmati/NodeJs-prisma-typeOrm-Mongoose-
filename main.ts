import http from "node:http";
import mongoose from "mongoose";
import { getMongoManager, createConnection } from "typeorm";
import { User } from "./entity/user.entity";
import { UserMongoose } from "./schema/user.mongoose";
import { log } from "node:console";
const base = async () => {
  const myDataSoureTyoeOrm_Mongo = await createConnection({
    type: "mongodb",
    host: "127.0.0.1",
    port: 27017,
    database: "testTypeOrm",
    entities: ["./entity/*.{ts,js}"],
  })
    .then(() => {
      console.log("\x1b[42m%s\x1b[0m", `***mongoDB TypeOrm***  run = ${27017}`);
    })
    .catch(() => {
      console.log("\x1b[41m%s\x1b[0m", `***mongoDB %FIELD%***  run = FIELD`);
    });

  await mongoose.connect("mongodb://127.0.0.1:27017/testMongo").then(() => {
    console.log("\x1b[45m%s\x1b[0m", `***mongoDB Mongoose***  run = ${27017}`);
  });
};

base();
http
  .createServer(async (req: any, res: any) => {
    const { method } = req;
    let _res: string;
    let body: string = "";
    let data: User;
    switch (method) {
      case "POST":
        req.on("data", (chunk: any) => {
          body = chunk;
        });
        req.on("end", async () => {
          data = JSON.parse(body);
          // ##### TYPEORM #####
          // _res = await new save(data as User)._TypeOrm();
          // ##### Mongoose #####
          _res = await new save(data as User)._Mongoose();

          return res.end(`${_res} successful`);
        });

        break;
      case "GET":
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Hello GET!");
        break;

      default:
        break;
    }
  })
  .listen(5050, () => {
    console.log("\x1b[33m%s\x1b[0m", `Port run = ${5050}`);
  });

class save {
  private _user: any;
  // #### TypeOrm ####
  private readonly _TypeormManage = getMongoManager();
  // #### MonGoose ###
  private readonly _MongooseManage = new UserMongoose();

  constructor(user: User) {
    this._user = new User();
    this._user.firstName = user.firstName;
    this._user.email = user.email;
    this._user.phoneNumber = user.phoneNumber;
  }

  async _TypeOrm() {
    try {
      const user = await this._TypeormManage.save(this._user);
      console.log(user);

      return "Create";
    } catch (error) {
      throw new Error("save is problem");
    }
  }

  async _Mongoose() {
    try {
      const user = await UserMongoose.create(this._user);
      console.log(user);

      return "Create";
    } catch (e: any) {
      console.log(e);

      throw new Error("save is problem");
    }
  }
}
