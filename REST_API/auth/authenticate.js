const { verify } = require("jsonwebtoken");
var env = global.envConfig[global.envConfig.environmentName].jwt;

const login_model = require("../models/login_model");
module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      console.log(token);
      verify(token, 'qwe1234', (err, decoded) => {
        if (err) {
          console.log(err);
          res.json({
            responseCode: 401,
            responseData: "Invalid Token. Please try to Login Once again",
            responseDesc: global.config.default_error_message,
          });
        } else {
          let token_details = {
            email: decoded.result,
            token: token,
          };
          console.log(token_details);
          next();
       /*    login_model.VALIDDATE_TOKEN(token_details, (er, re) => {
            if (er) {
              res.json({
                responseCode: 402,
                responseData: "Invalid Token. Please try to Login Once again",
                responseDesc: global.config.default_error_message,
              });
            } else {
              //console.log(re[0][0].Code );
              if (re[0][0].Code == 0) {
                next();
              } else {
                res.json({
                  responseCode: 401,
                  responseData: re[0][0].Desc,
                  responseDesc: global.config.default_error_message,
                });
              }
            }
          }); */
        }
      });
    } else {
      res.json({
        responseCode: 403,
        responseData: "Access denied! unauthorized user",
        responseDesc: global.config.default_error_message,
      });
    }
  },

  ip_whitelist: (req, res, next) => {
    var ipaddress = req.socket.remoteAddress;
    login_model.IP_Address_white_list(
      ipaddress.replace("::ffff:", ""),
      (err, resp) => {
        if (err) {
          res.json({
            responseCode: 601,
            responseData: "In-Valid Ip Address !!!",
            responseDesc: global.config.default_error_message,
          });
        }
        const results = resp[0];
        if (results.length > 0) {
          if (results[0].Code == 0) {
            next();
          } else {
            res.json({
              responseCode: 602,
              responseData: "In-Valid Ip Address !!!",
              responseDesc: global.config.default_error_message,
            });
          }
        } else {
          res.json({
            responseCode: 602,
            responseData: "In-Valid Ip Address !!!",
            responseDesc: global.config.default_error_message,
          });
        }
      }
    );
  },
};
