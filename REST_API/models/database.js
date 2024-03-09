require("dotenv").config();
const { createPool }=require("mysql");
/*
Creating MySQL database connection with pool request.
*/
var constr = global.envConfig[global.envConfig.environmentName].sqlConfig;
const pool=createPool(constr);
module.exports=pool;