const http = require("http");
const port = process.env.port || 3000;
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const decoder = new StringDecoder("utf-8");
const { statusObject } = require("./lib/helpers");

const route = require("./lib/routes");

const server = http.createServer((request, response) => {
  let bodyObject = "";
  request.on("data", chunk => {
    bodyObject += decoder.write(chunk);
  });
  request.on("end", () => {
    bodyObject += decoder.end();
    reqObject = {
      urlMethod: request.method.toLowerCase(),
      parsedUrl: url.parse(request.url).pathname.replace(/^\/+|\/+$/g, ""),
      queryObject: url.parse(request.url, true).query,
      bodyObject: bodyObject ? JSON.parse(bodyObject) : {}
    };

    route(reqObject, (statusCode, result) => {
      let resultObject = {
        status: statusObject[statusCode],
        message: result.message
      };
      response.writeHead(statusCode, {
        "Content-Type": "application/json"
      });

      response.end(JSON.stringify(resultObject));
    });
  });
});

server.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
