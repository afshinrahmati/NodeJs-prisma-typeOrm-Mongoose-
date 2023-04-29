import http from "node:http";
import { DataSource, getMongoManager, createConnection } from "typeorm";
import { User } from "./entity/user.entity";
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
      console.log("\x1b[42m%s\x1b[0m", `***mongoDB***  run = ${27017}`);
    })
    .catch(() => {
      console.log("\x1b[41m%s\x1b[0m", `***mongoDB %FIELD%***  run = FIELD`);
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
          _res = await new saveTypeOrm(data as User).save();
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

class saveTypeOrm {
  private _user: User;
  private readonly manager = getMongoManager();
  constructor(user: User) {
    this._user = new User();
    this._user.firstName = user.firstName;
    this._user.email = user.email;
    this._user.phoneNumber = user.phoneNumber;
  }

  async save() {
    try {
      const user = await this.manager.save(this._user);
      console.log(user);

      return "Create";
    } catch (error) {
      throw new Error("save is problem");
    }
  }
}
