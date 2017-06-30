"use strict";

const gracefulCtrlC = require('../src');
const assert = require('assert');

describe('graceful-ctrl-c', function () {
  describe('non-async tests', function () {
    it('throw an error if no callback provided', function () {
      try {
        // expect a callback to be provided so not providing the callback should
        // throw an error...
        gracefulCtrlC();
      } catch (error) {
        assert.equal(error.message, 'graceful-ctrl-c expected a callback function');
      }
    });
  });
  describe('async tests', function () {
    xit('sends ctrl-c to the terminal which triggers the callback');
  });
});
