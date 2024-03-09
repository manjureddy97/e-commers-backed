/* jshint node: true */
/* jshint esnext: true */
'use strict';
var express = require('express');
var router = express.Router();
//var auth = require('../auth/authenticate'); 
const { checkToken,ip_whitelist } = require("../auth/authenticate");


/**
 * Login Service Routing 
 **/
router.use('/msi/' , require('./login_controller'));  //ip_whitelist, 
//router.use('/msi', checkToken,ip_whitelist,  
  //              require('./receive.controller'));   

module.exports = router;