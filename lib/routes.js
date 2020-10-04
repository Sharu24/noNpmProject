const handlers = require("./handlers");

let routePath = {};

const route = (data, callback) => {
  let _routes = {
    users: routePath.users,
    admin: routePath.admin
  };

  let routeUrl =
    _routes[data.parsedUrl] !== "undefined"
      ? _routes[data.parsedUrl]
      : routeMethod.notfound;

  routeUrl(data, callback);
};

routePath.users = (data, callback) => {
  const acceptableMethods = ["get", "post", "put"];
  if (acceptableMethods.indexOf(data.urlMethod) !== -1) {
    return handlers.users[data.urlMethod](data, callback);
  } else {
    callback(400, { message: "Not a valid Http Method" });
  }
};

routePath.notfound = (data, callback) => {
  callback(404, { message: "Page Not found" });
};

routePath.admin = (data, callback) => {
  const acceptableMethods = ["get", "post", "put", "delete"];
  callback(400, { message: "Method not Handled Yet" });
};

module.exports = route;
