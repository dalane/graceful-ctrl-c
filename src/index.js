"use strict";

module.exports = (cb) => {
  // check that cb is a callable function
  if (typeof cb !== 'function') {
    throw new Error('graceful-ctrl-c expected a callback function');
  }
  // catch ctrl-c equivalent for windows and then emit the SIGINT event for the standard Unix SIGINT process to be handled below
  if (process.platform === "win32") {
    var rl = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.on("SIGINT", function () {
      process.emit("SIGINT");
    });
  }
  // function to call on the process SIGINT event
  process.on('SIGINT', () => {
      var rl = require('readline');
      // clear the ^C message from the command line
      rl.clearLine(process.stdout, 0);
      // reset the cursor position on the line to the start
      rl.cursorTo(process.stdout, 0);
      process.stdout.write("Shutting down application...\n");
      Promise.resolve().then(() => {
        return Promise.resolve(cb());
      }).then(() => {
        // write exiting process message
        process.stdout.write("Exiting process...\n");
      }).catch(error => {
        // if there's an error write the error message
        process.stdout.write(error);
      }).then(() => {
        // finally exit the process
        process.exit();
      });
  });
};
