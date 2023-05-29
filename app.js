const LoggerMain = require("./loader.module");
const loggerObj = new LoggerMain();

loggerObj.on("loggerCaller", (arg) => {
  console.log("hahaahhaa", arg);
});
loggerObj.logger("message");

// log.logger('hellos gggg')

const EventEmitter = require("events");
const emittter = new EventEmitter();

emittter.on("firstHit", function () {
  console.log("Geo oye share lagya oye gidar daz daz dazz");
});

emittter.emit("firstHit");
