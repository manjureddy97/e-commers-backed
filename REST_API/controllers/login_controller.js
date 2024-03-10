require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const login_model = require("../models/login_model");
const bcrypt = require("bcryptjs");
const { genSaltSync, hashSync, compareSync, hash, genSalt } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const auth = require("../auth/authenticate");
const fs = require("fs");
var router = express.Router();
var env = global.envConfig[global.envConfig.environmentName].jwt;
const mailResp = require("../config/emailconfig");
var mail_template = envConfig[envConfig.environmentName].mail_template;
const { email_template } = require("./../config/app_config");
const uuid = require("uuid");
var generator = require("generate-password");
const MAX_LOGIN_ATTEMPTS = 3

var product_model = require('../models/product_model');

var jwt = envConfig[envConfig.environmentName].jwt;
var webURL = envConfig[envConfig.environmentName].website;
var CryptoJS = require("crypto-js");
var encryptKey = envConfig[envConfig.environmentName].encryptKey1;
const { checkToken, ip_whitelist } = require("../auth/authenticate");





/**
 * User Signin. Required  Body parameters in JSON
 * @param email as alphaNumeric
 * @param password as alphaNumeric
 **/
router.post("/prod", async (req, res) => {
 // try {
    let params = req.body;

    product_model.get_proudcts(function (error, resp) {
      if (error) {
        return res.json({
          responseCode: global.config.default_error_code,
          responseData: error,
          responseDesc: global.config.default_error_message,
        });
      } else {
        return res.json({
          responseCode: global.config.default_success_code,
          responseData: resp,
          responseDesc: global.config.default_success_message,
        });
      }
    });

 /*  } catch (error) {
    return res.json({
      responseCode: global.config.default_error_code,
      responseData: "Required Inputs are missing",
      responseDesc: global.config.default_error_message,
    });
  }
 */});



router.post("/prodId", async (req, res) => {
  try {
    const  { prodcutId} = req.body;

    //validation
    

    product_model.get_proudctsId(prodcutId, function (error, resp) {
      if (error) {
        return res.json({
          responseCode: global.config.default_error_code,
          responseData: error,
          responseDesc: global.config.default_error_message,
        });
      } else {
        return res.json({
          responseCode: global.config.default_success_code,
          responseData: resp,
          responseDesc: global.config.default_success_message,
        });
      }
    });

  } catch (error) {
    return res.json({
      responseCode: global.config.default_error_code,
      responseData: "Required Inputs are missing",
      responseDesc: global.config.default_error_message,
    });
  }
});






module.exports = router;