import http from "node:http";

http
  .createServer(async (req: any, res: any) => {
    const { url, headers, method } = req;
    let body: string = "";
    console.log(method);

    switch (method) {
      case "POST":
        req.on("data", (chunk: any) => {
          body = chunk;
        });
        req.on("end", async () => {
          body = JSON.parse(body);
          console.log(body);
        });

        break;
      case "GET":
        res.writeHead(200, { "Content-Type": "text/plain" });
        console.log("GET");
        res.end("Hello GET!");
        break;

      default:
        break;
    }
  })
  .listen(5050);
