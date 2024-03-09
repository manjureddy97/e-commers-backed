const pool = require("../models/database");
module.exports = {
/**
 * Based query parameter will get the result from database
 * @param query as string. MySQL query formatter.
 **/
    select_query:(query,callBack)=>{
        global.logger.info("SQL QUERY :: " + query);   
        pool.query(query,(error,results,fields)=>{                
                if(error){
                  return  callBack(error);
                }
                return callBack(null,results);
            }
        )
    },

/**
 * Based query parameter will get the result from database
 * @param data as array. MySQL query formatter.
 **/    
    select_query_params:(query, data, callBack)=>{
        pool.query(query,data,(error,results,fields)=>{                
                if(error){
                  return  callBack(error);
                }
                return callBack(null,results);
            }
        )
    },


    select_query_promise:(query)=>{
        return new Promise((resolve, reject) =>{
            pool.query(query, (err, data) =>{
                if(err){
                    reject(err)
                }
               resolve(data)
            } )
        })
    }
};