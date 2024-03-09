const { compareSync } = require("bcryptjs");
const { callbackPromise } = require("nodemailer/lib/shared");
const { result } = require("underscore");
const pool = require("../models/database");
const sqlConfig = global.config.sqlConfig.appUsers;
const api_query= global.config.sqlConfig.api_req_qry;
const { select_query_params, select_query, dbQuery } = require("./db_model");
/* 
var nodeBase64 = require('nodejs-base64-converter');
console.log(nodeBase64.encode("test text")); //dGVzdCB0ZXh0
console.log(nodeBase64.decode("dGVzdCB0ZXh0")); //test text */


module.exports = {
  // tfa authention register
  registrer: (id,_email,_tfaJson,userId, callBack) => {        
    let query = sqlConfig.registration;
    console.log(query);
    let params = [id, _email, _tfaJson, userId ];
    let testqry = mysql.format(query, params);   
    global.logger.info(testqry);
    select_query(testqry, (error, results, fields) => {
      if (error) {
        global.logger.info(error);
        return callBack(error.sqlMessage);
      }
      global.logger.info(results);
      return callBack(null,results);
    });
  },

  sigIn: (_email,userId, callBack) => {        
    let query = sqlConfig.tfa_validation;
    console.log(query);
    let params = [ _email, userId];
    let testqry = mysql.format(query, params);   
    global.logger.info(testqry);
    select_query(testqry, (error, results, fields) => {
      if (error) {
        global.logger.info(error);
        return callBack(error.sqlMessage);
      }
      global.logger.info(results);
      return callBack(null,results);
    });
  },
  
  getresponse: (data, callBack) => {
    global.logger.info(api_query);   
    let query= api_query;
    let params = [JSON.stringify(data)];
    let testqry = mysql.format(query, params); 
    global.logger.info(testqry);
    select_query(testqry, (error, results, fields) => {
       if (error) {
         return callBack(error.sqlMessage);
       } 
       return callBack(null, results);
    });
  },
};
