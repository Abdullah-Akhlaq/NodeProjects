var url = "dfgf";

const EventEmitter = require("events");

class LoggerMain extends EventEmitter {
  logger(message) {
    console.log(message);

    this.emit("loggerCaller", { name: "Abdullah Akhlaq", age: 20 });
  }
}

module.exports = LoggerMain;
