/* jshint node: true */
/* jshint esnext: true */
"use strict";
var express = require("express"),
  app = express(),
  // addRequestId = require('express-request-id')(),
  compression = require("compression"),
  bodyParser = require("body-parser"),
  helmet = require("helmet"),
  winston = require("winston"),
  morgan = require("morgan"),
  fs = require("fs"),
  moment = require("moment"),
  session = require("express-session");
global.envConfig = require("./envConfig");
global.mysql = require("mysql"); 
global.async = require("async");
global.config = require("./config/app_config");
global.validator = require("validator");
global._ = require("underscore");
const httpProtocol = require("http");
const axios = require("axios");
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let cors = require("cors");

/**
 * Protects the application from some well known web vulnerabilities by setting HTTP headers appropriately.
 **/
app.use(helmet());
app.use(cors());

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "HEAD,OPTIONS, POST,GET");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader(
    "Content-Security-Policy",
    "Content-Security-Policy-Report-Only",
    "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
  );

  next();
});

// app.get("/", function (req, res) {
//   res.sendFile("index.html", { root: __dirname });
// });

/**
 * Decrease the size of the response body to increase the speed of a web application.
 **/
app.use(compression());

/**
 * Allow headers for cross domain.
 **/
 
app.use((req, res, next) => {
  //allow access from every, elminate CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.removeHeader("x-powered-by");
  //set the allowed HTTP methods to be requested
  res.setHeader("Access-Control-Allow-Methods", "POST");
  //headers clients can use in their requests
  // res.setHeader('Access-Control-Allow-Headers','Content-Type');
  //allow request to continue and be handled by routes
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Content-Security-Policy", "frame-ancestors 'none'");
  next(); 
});

/**
 * Create access log stream.
 **/
var accessLogStream = fs.createWriteStream(
  __dirname +
    "/logs/access-" +
    moment(new Date()).format("YYYY-MM-DD") +
    ".log",
  { flags: "a" }
);

/**
 * Create server log stream.
 **/
var serverLogStream = fs.createWriteStream(
  __dirname +
    "/logs/server-" +
    moment(new Date()).format("YYYY-MM-DD") +
    ".log",
  { flags: "a" }
);

/**
 * Define server log date format.
 **/
morgan.token("date", function (req, res) {
  return moment(new Date()).format("YYYY-MM-DDTHH:mm:ss");
});

/**
 * Define server log request headers to be written.
 **/
morgan.token("type", function (req, res) {
  return JSON.stringify(req.headers);
});

/**
 * Define server log UUID to be written.
 **/
morgan.token("uuid", function (req, res) {
  return "UUID=" + res._headers["x-request-id"];
});

/**
 * Initialize response UUID.
 **/
//app.use(addRequestId);

/**
 * Initialize server log writer.
 **/
app.use(
  morgan(
    ':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" \':type\' :uuid - :response-time ms',
    { stream: serverLogStream }
  )
);

/**
 * Initialize post data parsing.
 **/
app.use(bodyParser.json());

/**
 * Initialize the router.
 **/
app.use(require("./controllers"));

/**
 * Initialize access log writer.
 **/
global.logger = new winston.createLogger({
  transports: [
    new winston.transports.File({
      timestamp: function () {
        return moment(new Date()).format("YYYY-MM-DDTHH:mm:ss");
      },
      formatter: function (options) {
        return (
          options.timestamp() +
          " " +
          options.level.toUpperCase() +
          " " +
          (undefined !== options.message ? options.message : "") +
          (options.meta && Object.keys(options.meta).length
            ? "\n\t" + JSON.stringify(options.meta)
            : "")
        );
      },
      colorize: true,
      name: "access-file",
      stream: accessLogStream,
      handleExceptions: true,
      humanReadableUnhandledException: true,
      json: false,
    }),
    new winston.transports.Console({
      timestamp: function () {
        return moment(new Date()).format("YYYY-MM-DDTHH:mm:ss");
      },
      formatter: function (options) {
        return (
          options.timestamp() +
          " " +
          options.level.toUpperCase() +
          " " +
          (undefined !== options.message ? options.message : "") +
          (options.meta && Object.keys(options.meta).length
            ? "\n\t" + JSON.stringify(options.meta)
            : "")
        );
      },
      colorize: true,
      name: "console",
      handleExceptions: true,
      humanReadableUnhandledException: true,
      json: false,
    }),
  ],
  exitOnError: false,
});

/**
 * To start express server with secure connection.
 **/
var httpServer = null;
httpServer = httpProtocol.createServer(app);

/**
 * Server start port.
 **/
httpServer.listen(global.config.app_port, function () {
  global.logger.info("Server started at port " + global.config.app_port);
  console.info("Server started at port " + global.config.app_port);
});
