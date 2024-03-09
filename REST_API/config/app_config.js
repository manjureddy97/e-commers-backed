/* jshint node: true */
/* jshint esnext: true */
"use strict";
var config = {
  app_port: 9001,
  default_error_code: 1,
  default_error_message: "Sorry, invalid request",
  default_success_code: 0,
  default_success_message: "Successfully processed the request",
  unauthorized_access_message: "You are not authorized to access",
  alphaSpaceReg: /^[A-Za-z\s]+$/,
  alphaSpaceDotReg: /^[A-Za-z\s.]+$/,
  englishCharReg: /^[\x20-\x7E]+$/,
  emailPatternReg: /[\w-]+@([\w-]+\.)+[\w-]+/,
  aplhaNumSpaceDotDashReg: /^[a-z\d\-_.\s]+$/i,
  aplhaNumSpaceReg: /^[a-z\d\s]+$/i,
  defaultInternalErrorCode: 500,
  defaultInternalErrorMessage: "Internal Error !!",

  validations: {
    pwd_val: {
      reg: /(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&*])(?=.{8,})/,
      Message: [
        "Password at least 8 digits.",
        "At least one lowercase",
        "At least one uppercase",
        "At least one special character from @ # $ % ^ & *",
      ],
    },
  },

  sqlConfig: {
    communication: {
      emailLogs: `CALL PROC_EMAIL_LOGS(?,?,?,?)`,
    },   
    
    products: {
      get_prodcuts: 'select * from product_details pd;'
    },
    
  },
};
module.exports = config;
