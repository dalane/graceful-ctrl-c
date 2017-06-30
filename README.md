# Intercept Ctrl-C from the command line

For when you need to use Ctrl-C to shutdown your app but need a way to do it
gracefully (for example, closing database connections, saving temporary files,
clearing caches, etc).

## Installing

Installation via [NPM](https://www.npmjs.com) is recommended as follows.

```shell
npm install @dalane/graceful-ctrl-c --save
```

You can run the unit tests

```shell
npm test
```

## Usage

Simply import the module and register your callback function.

```javascript
// import the library
const gracefulCtrlC = require('@dalane/graceful-ctrl-c');

// define your callback to be called when Ctrl-C is intercepted
const shutdownCallback = () => {
  // do my shutdown stuff
  // supports promises if necessary
};

// register the callback
gracefulCtrlC(shutdownCallback);
```

Now, when you press Ctrl-C in the terminal it will be intercepted and your
callback function will be run.
