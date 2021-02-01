const { PromiseProvider } = require("mongoose");

class ErrorHandler extends Error {
  constructor(argus) {
    super(argus, code, message);
    this.code = this.code;
    this.message = message;
  }
}

module.exports = ErrorHandler;
