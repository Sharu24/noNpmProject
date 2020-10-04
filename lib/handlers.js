let storage = require("./storage");

let handlers = {};

handlers.users = {};

handlers.users.get = (data, callback) => {
  const mobileNumber = data.queryObject.mobileNumber;
  let dataObj = { dir: "users", fileName: mobileNumber };
  storage.get(dataObj, (statusCode, message) => {
    return callback(statusCode, message);
  });
};

handlers.users.post = (data, callback) => {
  console.log(data.bodyObject);

  let {
    firstName,
    lastName,
    emailAddress,
    mobileNumber,
    terms
  } = data.bodyObject;

  if (
    (firstName &&
      lastName &&
      lastName &&
      emailAddress &&
      mobileNumber &&
      terms) ||
    !terms
  ) {
    let userData = {
      firstName,
      lastName,
      emailAddress,
      mobileNumber,
      terms,
      _id: Date.now()
    };
    let dataObj = { dir: "users", fileName: mobileNumber, fileData: userData };
    storage.post(dataObj, (statusCode, message) => {
      return callback(statusCode, message);
    });
  }
};

module.exports = handlers;
