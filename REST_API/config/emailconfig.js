var nodemailer = require("nodemailer"); 
var envConfig= require('../envConfig');
var transporter = nodemailer.createTransport(
  envConfig[envConfig.environmentName].smtpConfig
);
var mailOptions = envConfig[envConfig.environmentName].mailOptions;
var html_tablify = require("html-tablify");
const fs = require("fs");
var moment = require("moment");
module.exports = {

   /**
   * Dynamic Sending Email Template for All Trigger mail
   * @param mail_pars as JSON pass 
   * @param mail_pars.to as to email id
   * @param mail_pars.subject as Subject mail
   * @param mail_pars.html as htmlstring for Email Body in HTML format.
   *  **/
  sendmail: (mail_pars, callback) => {
    try {
        
        mailOptions.to =mail_pars.to; 
        mailOptions.subject =mail_pars.subject;        
        mailOptions.html= mail_pars.html;  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {      
          global.logger.info(error);
          console.log("Email Fail: " )
          console.log(info);
          return callback(error, null);
        } else {
         
          global.logger.info(info);
          return callback(null, "Email sent: " + info);
        }
      });
    } catch (err) {
      global.logger.info(err);
      return callback(err, null);
    }
  },
  isAlphanumeric:(str,callback) =>{
    return /^[a-zA-Z0-9]+$/.test(str);
  },
  aplhaNumSpaceReg:(str,callback) =>{
    return /^[a-z\d\s]+$/i.test(str);    
  },
  isNumber:(str,callback) =>{
    return /^[0-9]+$/i.test(str);    
  },
  isdecimal:(str,callback)=>{
    return /^-{0,1}\d*\.{0,1}\d+$/.test(str);
  },
    
};
