const jwt = require('jsonwebtoken');
const axios = require("axios");
let secret = "this-is-cricket-match"
let expireTime = "70000d"
const API_ACCESS = require('../Apitoken')
const {token} = require("mysql/lib/protocol/Auth");
let {apitoken , changeToken ,inActiveToken , upadateActiveToken , DeleteToken} = API_ACCESS;
module.exports = {
    CheckToken: function (req, res, next) {
        const token =
            req.body.token || req.query.token || req.headers['authorization'] || req.cookies.authorization;

        if (!token) {
            return res.status(403).send({ message: 'Invalid token!' });
        } if(token === "4B2T8-L81Y1-P2S9O-I4F1H") {
           /* jwt.verify(token, "this-is-cricket-match", async function (error, decoded) {
                if (error) {
                    return res.status(400).send({ message:'Internal Error. Please Try Again.', error: error.message });
                } else {
                    return next();
                }
            });*/
            return next();
        }else{
            return res.status(403).send({ message: 'Invalid token!' });
        }
    },
    GetToken: function (user) {
        let token = jwt.sign(user, 'this-is-cricket-match', {
            expiresIn: expireTime // expires in 24 hours
        });
        return token;
    },
    GetHits: async function (req,res,next){
        let mytoken = await changeToken();
        let IsToken = mytoken.token;
        let {data}= await axios.get(`https://api.cricapi.com/v1/currentMatches?apikey=${IsToken}&offset=0`)
        let {info} = data;
        let hits = info.hitsToday;
        console.log("hits",hits)
        if(hits == 99){
            let result = await inActiveToken()
            let newToken = result[0].token_value;
            await upadateActiveToken(newToken,IsToken)
            await DeleteToken(newToken)
          return next();

        }
        return next();

    },

};




/*
const getToken = (user) => {
    const token = jwt.sign(
        {
            user_id: user.id
        },
        "this-is-cricket-match" ,

        {
            expiresIn:"70000d"
        }
    );
    return token;

};

let data = getToken({id:"123" , name:"Monkya"});
console.log(data)*/
