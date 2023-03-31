const express = require("express");
const router = express.Router();

const getAllMatches = async (req,res,next)=>{
    try {

        let result = await Services.Cricketmatch.getUpcomingMatches();
        res.send({data:result})
    }catch (err){
        res.send({MSG:"SOMETHING GOES WRONG!"})
    }


}
const getNotStartedMatches = async (req,res,next)=>{
    try {
        let result = await Services.Cricketmatch.getNotStartedMatches();
        res.send({data:result})
    }catch (err){
        res.send({MSG:"SOMETHING GOES WRONG!"})
    }


}
const getCompletedMatches = async (req,res,next)=>{
    try {
        let {matchId} = req.body;
        let result = await Services.Cricketmatch.getCompletedMatches(matchId);
        res.send({data:result})
    }catch (err){
        res.send({MSG:"SOMETHING GOES WRONG!"})
    }


}
const getLiveMatches = async (req,res,next)=>{
    try {
        let result = await Services.Cricketmatch.livedMatches();
        res.send({data:result})
    }catch (err){
        res.send({MSG:"SOMETHING GOES WRONG!"})
    }


}
const getAllSeries = async (req,res,next) =>{
    try {
        let {search} = req.body;
        let result = await Services.Cricketmatch.getAllSeries(search);
        res.send({data:result})
    }catch (err){
        res.send({MSG:"SOMETHING GOES WRONG!"})
    }


}
const getMatchInfo = async (req,res,next)=>{
    try {
        let {matchId } = req.body;
        let result = await Services.Cricketmatch.getAllMatchInfo(matchId);
        res.send({data:result})
    }catch (err){
        res.send({MSG:"SOMETHING GOES WRONG!"})
    }
}

const getPlayerInfo = async (req,res,next)=>{
    try {
        let {playerId } = req.body;
        let result = await Services.Cricketmatch.getPlayerInfo(playerId);
        res.send({data:result})
    }catch (err){
        res.send({MSG:"SOMETHING GOES WRONG!"})
    }


}
const SearchPlayer = async (req,res,next)=>{
    try {
        let {Search } = req.body;
        let result = await Services.Cricketmatch.SearchPlayer(Search);
        res.send({data:result})
    }catch (err){
        res.send({MSG:"SOMETHING GOES WRONG!"})
    }
}
const getPlayerElevens = async (req,res,next)=>{
    try {
        let {matchId } = req.body;
        let result = await Services.Cricketmatch.getPlayerElevens(matchId);
        console.log(result , "result");
        res.send({data:result})
    }catch (err){
        res.send({MSG:"SOMETHING GOES WRONG!"})
    }
}
const getBallByBallInfo = async(req,res,next)=>{
    try {
        let {matchId } = req.body;
        let result = await Services.Cricketmatch.getBallBYBallInfo(matchId);
        res.send({data:result})
    }catch (err){
        res.send({MSG:"SOMETHING GOES WRONG!"})
    }
}
const getSquadList= async(req,res,next)=>{
    try {
        let {matchId } = req.body;
        let result = await Services.Cricketmatch.getSquadList(matchId);
        res.send({data:result})
    }catch (err){
        res.send({MSG:"SOMETHING GOES WRONG!"})
    }
}
const addPlayersInfo = async (req,res,next) =>{
    try {
        let {match_id , player_1,player_2,player_3,player_4,player_5,player_6, player_7,player_8,player_9,C,VC, user_name } = req.body;
        let insertReccord = await Services.Cricketmatch.InsertPlayerInfo(req.body);
        res.send({data:insertReccord})

    }catch (e){
        return e;
    }
}
const getAllSeriesList = async (req,res,next)=>{
    try {
        let result = await Services.Cricketmatch.getAllSeriesList();
        res.send({data:result})
    }catch (e){
        return e;
    }
}
const getSeriesDetails = async (req,res,next)=>{
    try {
        let {seriesId} = req.body;
        let result = await Services.Cricketmatch.getSeriesInfo(seriesId);
        res.send({data:result})
    }catch (e){
        return e;
    }
}
const getActiveToken = async (req,res,next)=>{
    try {
        let result = await Services.Cricketmatch.ActiveToken();
        res.send({data:result})
    }catch (e){
        return e;
    }
}

const getInActiveToken = async (req,res,next)=>{
    try {
        let result = await Services.Cricketmatch.InActiveToken();
        res.send({data:result})
    }catch (e){
        return e;
    }
}

router.get("/GET-ALL-MATCHES-DETAILS",Auth.GetHits,Auth.CheckToken,getAllMatches); /*WORKING */
router.get("/GET-NOT-STARTED-MATCHES-DETAILS",Auth.GetHits,Auth.CheckToken,getNotStartedMatches); /* WORKING */
router.post("/GET-COMPLETED-MATCHES-DETAILS",Auth.GetHits,Auth.CheckToken, getCompletedMatches); /*working*/
router.get("/GET-LIVE-MATCHES-DETAILS",Auth.GetHits,Auth.CheckToken, getLiveMatches); /* working */
router.post('/GET-ALL-SERIES-DETAILS',Auth.GetHits, Auth.CheckToken,getAllSeries );
router.post('/GET-ALL-MATCH-DETAILS',Auth.GetHits,Auth.CheckToken,getMatchInfo );
router.post('/GET-PLAYER-INFO',Auth.GetHits,Auth.CheckToken,getPlayerInfo);
router.post('/SEARCH-PLAYER-BY-NAME',Auth.GetHits,Auth.CheckToken,SearchPlayer);
router.post('/GET-PLAYER-ELEVEN-INFO',Auth.GetHits,Auth.CheckToken,getPlayerElevens);
router.post('/GET-SQUAD-LIST',Auth.GetHits,Auth.CheckToken,getSquadList);
router.post('/ADD-USER-INFO',Auth.CheckToken,addPlayersInfo);
router.get('/GET-ALL-SERIES-LIST',Auth.GetHits,Auth.CheckToken,getAllSeriesList);
router.post('/GET-ALL-SERIES-BY-ID',Auth.GetHits,Auth.CheckToken,getSeriesDetails);
router.get('/GET-ACTIVE-TOKEN',getActiveToken);
router.get('/GET-INACTIVE-TOKEN',getInActiveToken);


module.exports = router;
