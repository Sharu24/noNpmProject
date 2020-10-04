const fs = require("fs");
const path = require("path");
let storage = {};

storage.get = (data, callback) => {
  const dir = path.join(__dirname, "../storage/", data.dir, "/");
  const fileName = dir + data.fileName + ".JSON";
  console.log(fileName);
  fs.readFile(fileName, "utf-8", (error, userData) => {
    if (!error && userData) callback(200, { message: JSON.parse(userData) });
    else callback(400, { message: "User Does not Exists" });
  });
};

storage.post = (data, callback) => {
  const dir = path.join(__dirname, "../storage/", data.dir, "/");
  const fileName = dir + data.fileName + ".JSON";

  fs.readFile(fileName, "utf-8", (error, userData) => {
    console.log("ReadFile");
    console.log(userData, error);
    if (!error && userData)
      return callback(400, { message: "User Already Exists" });

    const fileData = JSON.stringify(data.fileData);
    fs.writeFile(fileName, fileData, error => {
      if (error) callback(500, { message: "Unable to Save the data #Admin" });
      callback(200, { message: "Data Uploaded Successfully" });
    });
  });
};

module.exports = storage;
