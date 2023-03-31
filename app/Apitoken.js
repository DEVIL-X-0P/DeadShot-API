const axios = require("axios");

module.exports ={
   /* apitoken : "33f6ae8f-4442-48a1-aeae-4ce8071cb2b1",*/
    changeToken:  async  function (){
        return new Promise((resolve, reject) => {
            try {
                let sql = "SELECT * FROM active_token";
                dbConn.query(sql, (err, result) => {
                    resolve(result[0]);
                });
            } catch (error) {
                reject(error);
            }
        });
    },
    inActiveToken:async function(){
        return new Promise((resolve, reject) => {
            try {
                let sql = "SELECT * FROM all_tokens";
                dbConn.query(sql, (err, result) => {
                  resolve(result)
                });
            } catch (error) {
                reject(error);
            }
        });

    },
    upadateActiveToken:async function(newToken,oldToken){
        return new Promise((resolve, reject) => {
            try {
                let sql = "UPDATE active_token SET token = ? WHERE  token = ?";
                dbConn.query(sql, [newToken,oldToken],(err,result)=>{
                    resolve(result)
                })
            } catch (error) {
                reject(error);
            }
        });

    },
    DeleteToken:async function(removeToken){
        return new Promise((resolve, reject) => {
            try {
                let sql = "DELETE FROM all_tokens WHERE token_value = ?; ";
                dbConn.query(sql,[removeToken],(err,result)=>{
                    resolve(result)
                })
            } catch (error) {
                reject(error);
            }
        });

    }





}