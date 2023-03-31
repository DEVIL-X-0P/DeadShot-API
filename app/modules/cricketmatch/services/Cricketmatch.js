const axios = require('axios');
const API_ACCESS = require('../../../Apitoken.js')
const {token} = require("mysql/lib/protocol/Auth");
let {  changeToken , } = API_ACCESS;
const Cricketmatch = {};


Cricketmatch.getUpcomingMatches = async()=>{
    try {
        let mytoken = await changeToken();
        let apitoken = mytoken.token;
        let {data }= await axios.get(`https://api.cricapi.com/v1/matches?apikey=${apitoken}&offset=0`)
        let result = data.data || [];
        return  result;
    }catch (e) {
        return e;
    }

}
Cricketmatch.getNotStartedMatches = async()=>{
    try {
        let mytoken = await changeToken();
        let apitoken = mytoken.token;
        let {data }= await axios.get(`https://api.cricapi.com/v1/matches?apikey=${apitoken}&offset=0`)
        let result = data.data || [];
         result = result.filter(item => item.status ==  "Match not started");
        return  result;
    }catch (e) {
        return e;
    }

}
Cricketmatch.getCompletedMatches = async(matchId)=>{
    try {

        let mytoken = await changeToken();
        let apitoken = mytoken.token;
        let {data }= await axios.get(`https://api.cricapi.com/v1/currentMatches?apikey=${apitoken}&offset=0`)
        let result = data.data || [];
        if(!!matchId){
            result = result.filter(item => item.id == matchId );
        }else {
            result = result.filter(item => item.matchEnded === true);
        }

        return  result;
    }catch (e) {
        return e;
    }

}
Cricketmatch.livedMatches = async()=>{
    try {
        let mytoken = await changeToken();
        let apitoken = mytoken.token;
        let {data }= await axios.get(`https://api.cricapi.com/v1/currentMatches?apikey=${apitoken}&offset=0`)
        let result = data.data || [];
         result = result.filter(item => item.matchEnded === false);
        return  result;
    }catch (e) {
        return e;
    }

}
Cricketmatch.getAllSeries = async (search)=>{
    try {
        let mytoken = await changeToken();
        let apitoken = mytoken.token;
        let apiPoint;
        if(!!search){
            apiPoint = `https://api.cricapi.com/v1/currentMatches?apikey=${apitoken}&offset=0&search=${search}`
        }else{
            apiPoint = `https://api.cricapi.com/v1/currentMatches?apikey=${apitoken}&offset=0`
        }
        let {data }= await axios.get(apiPoint)
        let result = data.data || [];
        return  result;
    }catch (e){
        return e;
    }
}
Cricketmatch.getAllMatchInfo = async (matchId)=>{
 try {
     let mytoken = await changeToken();
     let apitoken = mytoken.token;
     let {data }= await axios.post(`https://api.cricapi.com/v1/match_info?apikey=${apitoken}&offset=0&id=${matchId}`)
     let result = data.data || [];
     return  result;
 }catch (e){
     return e;
 }

}
Cricketmatch.getPlayerInfo = async (playerId) =>{
    try {
        let mytoken = await changeToken();
        let apitoken = mytoken.token;
        let {data }= await axios.post(`https://api.cricapi.com/v1/players_info?apikey=${apitoken}&id=${playerId}`)
        let result = data.data || [];
        return  result;
    }catch (e){
        return e;
    }

};
Cricketmatch.SearchPlayer = async (Search)=>{
    try {
        let mytoken = await changeToken();
        let apitoken = mytoken.token;
        if(!!Search){
            let {data} = await axios.post(`https://api.cricapi.com/v1/players?apikey=${apitoken}&offset=0&search=${Search}`)
            let result = data.data || [];
            return  result;
        }
        return [];

    }catch (e){
        return e;
    }
}
Cricketmatch.getPlayerElevens = async (matchId) =>{
    try {
        let mytoken = await changeToken();
        let apitoken = mytoken.token;
        if(!!matchId){
          let {data} = await axios.post(`https://api.cricapi.com/v1/match_xi?apikey=${apitoken}&id=${matchId}`)
            let result = data.data || [];
            let finalArray =[];
          if(result.length>0){
              let team1Name = result[0].teamName;
              let team2Name = result[0].teamName;
              let teamPlayer1 = result[0].players;
              let teamPlayer2 = result[1].players;
              let team1values = await Cricketmatch.getTeamPoints(teamPlayer1,matchId);
              let team2values =  await Cricketmatch.getTeamPoints(teamPlayer2,matchId);
              let obj1 = {teamName:team1Name,team1values }
              let obj2 = {teamName:team2Name,team2values }
              finalArray.push(obj1,obj2);
              return finalArray;
          }else{
              return [];
          }

        }
        return  [];
    }catch (e){
        return e;
    }
}
Cricketmatch.getBallBYBallInfo =  async (matchId)=>{
    try {
        let mytoken = await changeToken();
        let apitoken = mytoken.token;
    if(!!matchId){
        let {data} = await axios.post(`https://api.cricapi.com/v1/match_points?apikey=${apitoken}
&offset=0&id=${matchId}`)
        let result = data.data || [];
        return  result;
    }
    return  [];
    }catch (e){
        return e;
    }
}
Cricketmatch.getSquadList =  async (matchId)=>{
    try {
        let mytoken = await changeToken();
        let apitoken = mytoken.token;
        if(!!matchId){
            let {data} = await axios.post(`https://api.cricapi.com/v1/match_squad?apikey=${apitoken}&offset=0&id=${matchId}`)
            let result = data.data || [];
            return  result;
        }
        return  [];
    }catch (e){
        return e;
    }
}

Cricketmatch.InsertPlayerInfo = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            let {match_id , player_1,player_2,player_3,player_4,player_5,player_6, player_7,player_8,player_9,C,VC, user_name} = data;
            let sql = " INSERT INTO matches(player_1 ,match_id,player_2,player_3,player_4,player_5,player_6,player_7,player_8,player_9,C,VC , user_name)values(?,?,?,?,?,?,?,?,?,?,?,?,?)";
            dbConn.query(
                sql,
                [
                    player_1,
                    match_id,
                    player_2,
                    player_3,
                    player_4,
                    player_5,
                    player_6,
                    player_7,
                    player_8,
                    player_9,
                    C,
                    VC,
                    user_name

                ],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        } catch (error) {
            console.log("error", error);
            reject(error);
        }
    });
};

let playerVenus = [
    { name: 'Mayank Agarwal', value: 12 },
    {name:'Beth Mooney', value:7},
    { name: 'Liam Livingstone', value: 11.5 },
    { name: 'Kagiso Rabada', value: 9.25 },
    { name: 'Shahrukh Khan', value: 9 },
    { name: 'Shikhar Dhawan', value: 8.25 },
    { name: 'Jonny Bairstow', value: 6.75 },
    { name: 'Odean Smith', value: 6 },
    { name: 'Rahul Chahar', value: 5.25 },
    { name: 'Arshdeep Singh', value: 4 },
    { name: 'Harpreet Brar', value: 3.8 },
    { name: 'Vaibhav Arora', value: 2 },
    { name: 'Raj Bawa', value: 2 },
    { name: 'Nathan Ellis', value: 0.75 },
    { name: 'Prabhsimran Singh', value: 0.6 },
    { name: 'Rishi Dhawan', value: 0.55 },
    { name: 'Bhanuka Rajapaksa', value: 0.5 },
    { name: 'Sandeep Sharma', value: 0.5 },
    { name: 'Benny Howell', value: 0.4 },
    { name: 'Ishan Porel', value: 0.25 },
    { name: 'Prerak Mankad', value: 0.2 },
    { name: 'Atharva Taide', value: 0.2 },
    { name: 'Ansh Patel', value: 0.2 },
    { name: 'Jitesh Sharma', value: 0.2 },
    { name: 'Writtick Chatterjee', value: 0.2 },
    { name: 'Baltej Singh', value: 0.2 },
    { name: 'Kane Williamson', value: 14 },
    { name: 'Nicholas Pooran', value: 10.75 },
    { name: 'Washington Sundar', value: 8.75 },
    { name: 'Rahul Tripathi', value: 8.5 },
    { name: 'Romario Shepherd', value: 7.75 },
    { name: 'Abhishek Sharma', value: 6.5 },
    { name: 'Bhuvneshwar Kumar', value: 4.2 },
    { name: 'Marco Jansen', value: 4.2 },
    { name: 'Umran Malik', value: 4 },
    { name: 'Abdul Samad', value: 4 },
    { name: 'T Natarajan', value: 4 },
    { name: 'Kartik Tyagi', value: 4 },
    { name: 'Aiden Markram', value: 2.6 },
    { name: 'Sean Abbott', value: 2.4 },
    { name: 'Glenn Phillips', value: 1.5 },
    { name: 'Shreyas Gopal', value: 0.75 },
    { name: 'Fazalhaq Farooqi', value: 0.5 },
    { name: 'Vishnu Vinod', value: 0.5 },
    { name: 'Priyam Garg', value: 0.2 },
    { name: 'Saurabh Dubey', value: 0.2 },
    { name: 'Jagadeesha Suchith', value: 0.2 },
    { name: 'Shashank Singh', value: 0.2 },
    { name: 'Ravikumar Samarth', value: 0.2 },
    { name: 'Sanju Samson', value: 14 },
    { name: 'Prasidh Krishna', value: 10 },
    { name: 'Jos Buttler', value: 10 },
    { name: 'Shimron Hetmyer', value: 8.5 },
    { name: 'Trent Boult', value: 8 },
    { name: 'Devdutt Padikkal', value: 7.75 },
    { name: 'Yuzvendra Chahal', value: 6.5 },
    { name: 'Ravichandran Ashwin', value: 5 },
    { name: 'Yashasvi Jaiswal', value: 4 },
    { name: 'Riyan Parag', value: 3.8 },
    { name: 'Navdeep Saini', value: 2.6 },
    { name: 'Nathan Coulter-Nile', value: 2 },
    { name: 'James Neesham', value: 1.5 },
    { name: 'Karun Nair', value: 1.4 },
    { name: 'Rassie van der Dussen', value: 1 },
    { name: 'Obed McCoy', value: 0.75 },
    { name: 'Daryl Mitchell', value: 0.75 },
    { name: 'KC Cariappa', value: 0.3 },
    { name: 'Tejas Baroka', value: 0.2 },
    { name: 'Kuldip Yadav', value: 0.2 },
    { name: 'Dhruv Jurel', value: 0.2 },
    { name: 'Kuldeep Sen', value: 0.2 },
    { name: 'Shubham Garhwal', value: 0.2 },
    { name: 'Anunay Singh', value: 0.2 },
    { name: 'Virat Kohli', value: 15 },
    { name: 'Glenn Maxwell', value: 11 },
    { name: 'Harshal Patel', value: 10.75 },
    { name: 'Wanindu Hasaranga', value: 10.75 },
    { name: 'Josh Hazlewood', value: 7.75 },
    { name: 'Faf du Plessis', value: 7 },
    { name: 'Mohammed Siraj', value: 7 },
    { name: 'Dinesh Karthik', value: 5.5 },
    { name: 'Anuj Rawat', value: 3.4 },
    { name: 'Shahbaz Ahmed', value: 2.4 },
    { name: 'David Willey', value: 2 },
    { name: 'Sherfane Rutherford', value: 1 },
    { name: 'Mahipal Lomror', value: 0.95 },
    { name: 'Finn Allen', value: 0.8 },
    { name: 'Jason Behrendorff', value: 0.75 },
    { name: 'Siddarth Kaul', value: 0.75 },
    { name: 'Karn Sharma', value: 0.5 },
    { name: 'Suyash Prabhudessai', value: 0.3 },
    { name: 'Chama Milind', value: 0.25 },
    { name: 'Aneeshwar Gautam', value: 0.2 },
    { name: 'Akash Deep', value: 0.2 },
    { name: 'Luvnith Sisodia', value: 0.2 },
    { name: 'Rohit Sharma', value: 16 },
    { name: 'Ishan Kishan', value: 15.25 },
    { name: 'Jasprit Bumrah', value: 12 },
    { name: 'Tim David', value: 8.25 },
    { name: 'Jofra Archer', value: 8 },
    { name: 'Suryakumar Yadav', value: 8 },
    { name: 'Kieron Pollard', value: 6 },
    { name: 'Dewald Brevis', value: 3 },
    { name: 'Daniel Sams', value: 2.6 },
    { name: 'Tilak Varma', value: 1.7 },
    { name: 'Murugan Ashwin', value: 1.6 },
    { name: 'Tymal Mills', value: 1.5 },
    { name: 'Jaydev Unadkat', value: 1.3 },
    { name: 'Riley Meredith', value: 1 },
    { name: 'Fabian Allen', value: 0.75 },
    { name: 'Mayank Markande', value: 0.65 },
    { name: 'Sanjay Yadav', value: 0.5 },
    { name: 'Basil Thampi', value: 0.3 },
    { name: 'Arjun Tendulkar', value: 0.3 },
    { name: 'Ramandeep Singh', value: 0.2 },
    { name: 'Anmolpreet Singh', value: 0.2 },
    { name: 'Aryan Juyal', value: 0.2 },
    { name: 'Arshad Khan', value: 0.2 },
    { name: 'Rahul Buddhi', value: 0.2 },
    { name: 'Hrithik Shokeen', value: 0.2 },
    { name: 'Ravindra Jadeja', value: 16 },
    { name: 'Deepak Chahar', value: 14 },
    { name: 'MS Dhoni', value: 12 },
    { name: 'Moeen Ali', value: 8 },
    { name: 'Ambati Rayudu', value: 6.75 },
    { name: 'Ruturaj Gaikwad', value: 6 },
    { name: 'Dwayne Bravo', value: 4.4 },
    { name: 'Shivam Dube', value: 4 },
    { name: 'Chris Jordan', value: 3.6 },
    { name: 'Robin Uthappa', value: 2 },
    { name: 'Mitchell Santner', value: 1.9 },
    { name: 'Adam Milne', value: 1.9 },
    { name: 'Rajvardhan Hangargekar', value: 1.5 },
    { name: 'Prashant Solanki', value: 1.2 },
    { name: 'Devon Conway', value: 1 },
    { name: 'Maheesh Theekshana', value: 0.7 },
    { name: 'Dwaine Pretorius', value: 0.5 },
    { name: 'Narayan Jagadeesan', value: 0.2 },
    { name: 'KM Asif', value: 0.2 },
    { name: 'Tushar Deshpande', value: 0.2 },
    { name: 'Subhranshu Senapati', value: 0.2 },
    { name: 'Bhagath Varma', value: 0.2 },
    { name: 'Simarjeet Singh', value: 0.2 },
    { name: 'Hari Nishaanth', value: 0.2 },
    { name: 'Mukesh Choudhary', value: 0.2 },
    { name: 'Shreyas Iyer', value: 12.25 },
    { name: 'Andre Russell', value: 12 },
    { name: 'Nitish Rana', value: 8 },
    { name: 'Varun Chakravarthy', value: 8 },
    { name: 'Venkatesh Iyer', value: 8 },
    { name: 'Shivam Mavi', value: 7.25 },
    { name: 'Pat Cummins', value: 7.25 },
    { name: 'Sunil Narine', value: 6 },
    { name: 'Umesh Yadav', value: 2 },
    { name: 'Sam Billings', value: 2 },
    { name: 'Tim Southee', value: 1.5 },
    { name: 'Alex Hales', value: 1.5 },
    { name: 'Mohammad Nabi', value: 1 },
    { name: 'Ajinkya Rahane', value: 1 },
    { name: 'Sheldon Jackson', value: 0.6 },
    { name: 'Rinku Singh', value: 0.55 },
    { name: 'Ashok Sharma', value: 0.55 },
    { name: 'Chamika Karunaratne', value: 0.5 },
    { name: 'Abhijeet Tomar', value: 0.4 },
    { name: 'Anukul Roy', value: 0.2 },
    { name: 'Pratham Singh', value: 0.2 },
    { name: 'Rasikh Dar', value: 0.2 },
    { name: 'Ramesh Kumar', value: 0.2 },
    { name: 'Aman Khan', value: 0.2 },
    { name: 'Baba Indrajith', value: 0.2 },
    { name: 'Rishabh Pant', value: 16 },
    { name: 'Shardul Thakur', value: 10.75 },
    { name: 'Axar Patel', value: 9 },
    { name: 'Prithvi Shaw', value: 7.5 },
    { name: 'Mitchell Marsh', value: 6.5 },
    { name: 'Anrich Nortje', value: 6.5 },
    { name: 'David Warner', value: 6.25 },
    { name: 'Khaleel Ahmed', value: 5.25 },
    { name: 'Chetan Sakariya', value: 4.2 },
    { name: 'Rovman Powell', value: 2.8 },
    { name: 'Kuldeep Yadav', value: 2 },
    { name: 'Srikar Bharat', value: 2 },
    { name: 'Mustafizur Rahman', value: 2 },
    { name: 'Kamlesh Nagarkoti', value: 1.1 },
    { name: 'Mandeep Singh', value: 1.1 },
    { name: 'Lalit Yadav', value: 0.65 },
    { name: 'Yash Dhull', value: 0.5 },
    { name: 'Lungi Ngidi', value: 0.5 },
    { name: 'Tim Seifert', value: 0.5 },
    { name: 'Pravin Dubey', value: 0.5 },
    { name: 'Ashwin Hebbar', value: 0.2 },
    { name: 'Ripal Patel', value: 0.2 },
    { name: 'Vicky Ostwal', value: 0.2 },
    { name: 'Sarfaraz Khan', value: 0.2 },
    { name: 'KL Rahul', value: 17 },
    { name: 'Avesh Khan', value: 10 },
    { name: 'Marcus Stoinis', value: 9.2 },
    { name: 'Jason Holder', value: 8.75 },
    { name: 'Krunal Pandya', value: 8.25 },
    { name: 'Mark Wood', value: 7.5 },
    { name: 'Quinton de Kock', value: 6.75 },
    { name: 'Deepak Hooda', value: 5.75 },
    { name: 'Manish Pandey', value: 4.6 },
    { name: 'Ravi Bishnoi', value: 4 },
    { name: 'Evin Lewis', value: 2 },
    { name: 'Dushmantha Chameera', value: 2 },
    { name: 'Krishnappa Gowtham', value: 0.9 },
    { name: 'Kyle Mayers', value: 0.5 },
    { name: 'Shahbaz Nadeem', value: 0.5 },
    { name: 'Ankit Rajpoot', value: 0.5 },
    { name: 'Mohsin Khan', value: 0.2 },
    { name: 'Ayush Badoni', value: 0.2 },
    { name: 'Karan Sharma', value: 0.2 },
    { name: 'Mayank Yadav', value: 0.2 },
    { name: 'Manan Vohra', value: 0.2 },
    { name: 'Rashid Khan', value: 15 },
    { name: 'Hardik Pandya', value: 15 },
    { name: 'Lockie Ferguson', value: 10 },
    { name: 'Rahul Tewatia', value: 9 },
    { name: 'Shubman Gill', value: 8 },
    { name: 'Mohammed Shami', value: 6.25 },
    { name: 'Yash Dayal', value: 3.2 },
    { name: 'Ravisrinivasan Sai Kishore', value: 3 },
    { name: 'David Miller', value: 3 },
    { name: 'Abhinav Manohar', value: 2.6 },
    { name: 'Alzarri Joseph', value: 2.4 },
    { name: 'Matthew Wade', value: 2.4 },
    { name: 'Jason Roy', value: 2 },
    { name: 'Wriddhiman Saha', value: 1.9 },
    { name: 'Jayant Yadav', value: 1.7 },
    { name: 'Vijay Shankar', value: 1.4 },
    { name: 'Dominic Drakes', value: 1.1 },
    { name: 'Varun Aaron', value: 0.5 },
    { name: 'Gurkeerat Singh Mann', value: 0.5 },
    { name: 'Noor Ahmad', value: 0.3 },
    { name: 'Darshan Nalkande', value: 0.2 },
    { name: 'Sai Sudharsan', value: 0.2 },
    { name: 'Pradeep Sangwan', value: 0.2 },
    { name: 'Nat Sciver-Brunt', value: 3 },
    { name: 'Amelia Kerr', value: 1 },
    { name: 'Pooja Vastrakar', value: 1 },
    { name: 'Yastika Bhatia', value: 1 },
    { name: 'Heather Graham', value: 3 },
    { name: 'Issy Wong', value: 3 },
    { name: 'Amanjot Kaur', value: 5 },
    { name: 'Dhara Gujjar', value: 1 },
    { name: 'Saika Ishaque', value: 1 },
    { name: 'Hayley Matthews', value: 4 },
    { name: 'Chloe Tryon', value: 3 },
    { name: 'Humairaa Kaazi', value: 1 },
    { name: 'Priyanka Bala', value: 2 },
    { name: 'Sonam Yadav', value: 1 },
    { name: 'Jintimani Kalita', value: 1 },
    { name: 'Neelam Bisht', value: 1 },
    { name: 'Ash Gardner', value: 3 },
    { name: 'Beth Mooney', value: 2 },
    { name: 'Sophia Dunkley', value: 6 },
    { name: 'Annabel Sutherland', value: 7 },
    { name: 'Harleen Deol', value: 4 },
    { name: 'Deandra Dottin', value: 6 },
    { name: 'Sneh Rana', value: 75 },
    { name: 'S Meghana', value: 3 },
    { name: 'Georgia Wareham', value: 75 },
    { name: 'Mansi Joshi', value: 3 },
    { name: 'D Hemalatha', value: 3 },
    { name: 'Monica Patel', value: 3 },
    { name: 'Tanuja Kanwar', value: 5 },
    { name: 'Sushma Verma', value: 6 },
    { name: 'Hurley Gala', value: 1 },
    { name: 'Ashwani Kumari', value: 35 },
    { name: 'Parunika Sisodia', value: 1 },
    { name: 'Shabnim Shakil', value: 1 },
    { name: 'Smriti Mandhana', value: 3 },
    { name: 'Ellyse Perry', value: 1 },
    { name: 'Sophie Devine', value: 5 },
    { name: 'Renuka Thakur', value: 1 },
    { name: 'Richa Ghosh', value: 1 },
    { name: 'Erin Burns', value: 3 },
    { name: 'Disha Kasat', value: 1 },
    { name: 'Indrani Roy', value: 1 },
    { name: 'Shreyanka Patil', value: 1 },
    { name: 'Kanika Ahuja', value: 35 },
    { name: 'Asha Shobana', value: 1 },
    { name: 'Heather Knight', value: 4 },
    { name: 'Dane van Niekerk', value: 3 },
    { name: 'Preeti Bose', value: 3 },
    { name: 'Poonam Khemna', value: 1 },
    { name: 'Komal Zanzad', value: 25 },
    { name: 'Megan Schutt', value: 4 },
    { name: 'Sahana Pawar', value: 1 },
    { name: 'Meg Lanning', value: 1 },
    { name: 'Shafali Verma', value: 2 },
    { name: 'Radha Yadav', value: 4 },
    { name: 'Shikha Pandey', value: 6 },
    { name: 'Marizanne Kapp', value: 1 },
    { name: 'Titas Sadhu', value: 25 },
    { name: 'Alice Capsey', value: 75 },
    { name: 'Tara Norris', value: 1 },
    { name: 'Laura Harris', value: 45 },
    { name: 'Jasia Akhter', value: 2 },
    { name: 'Minu Manni', value: 3 },
    { name: 'Taniya Bhatia', value: 3 },
    { name: 'Poonam Yadav', value: 3 },
    { name: 'Jess Jonassen', value: 5 },
    { name: 'Sneha Deepthi', value: 3 },
    { name: 'Arundhati Reddy', value: 3 },
    { name: 'Aparna Mondal', value: 1 },
    { name: 'Harmanpreet Kaur', value: 18 }



]
Cricketmatch.getTeamPoints = async (teamPlayer,matchId)=>{
    try {
        let result = teamPlayer;
        for (const item of result) {
            let playerName = item.name;
           let output = playerVenus.filter(item => item.name ==  playerName);
            if(output.length >0){
                let captainCount = await Cricketmatch.findCaptain(playerName ,matchId);
                let voiceCaptain = await Cricketmatch.findVoiceCaptain(playerName , matchId);
                let player = await Cricketmatch.findPlayer(playerName , matchId)
                item.points = output[0].value;
                item.AsCaptain = captainCount;
                item.AsVoiceCaptain = voiceCaptain;
                item.AsPlayer = player;
            }else{
                let captainCount = await Cricketmatch.findCaptain(playerName ,matchId);
                let voiceCaptain = await Cricketmatch.findVoiceCaptain(playerName , matchId);
                let player = await Cricketmatch.findPlayer(playerName , matchId)
                item.points =5.5
                item.AsCaptain = captainCount;
                item.AsVoiceCaptain = voiceCaptain;
                item.AsPlayer = player;
            }
        }
        return  result;

    }catch (error) {
        return error;
    }
}
Cricketmatch.findCaptain = async ( playerName ,matchId) => {
    return new Promise((resolve, reject) => {
        try {
            let sql = "SELECT COUNT(C)  as captain FROM matches WHERE match_id = ? AND C = ?";
            dbConn.query(sql, [matchId,playerName], (err, result) => {
                resolve(result[0].captain);
            });
        } catch (error) {
            reject(error);
        }
    });
};
Cricketmatch.findVoiceCaptain = async ( playerName ,matchId) => {
    return new Promise((resolve, reject) => {
        try {
            let sql = "SELECT COUNT(C)  as voiceCaptain FROM matches WHERE match_id = ? AND VC = ?";
            dbConn.query(sql, [matchId,playerName], (err, result) => {
                resolve(result[0].voiceCaptain);
            });
        } catch (error) {
            reject(error);
        }
    });
};
Cricketmatch.findPlayer = async ( playerName ,matchId) => {
    return new Promise((resolve, reject) => {
        try {
            let sql = "SELECT COUNT(C) as player FROM matches WHERE match_id = ? AND player_1 =?  OR player_3 = ?  OR player_4 = ?  OR player_5 = ? OR player_6 = ? OR player_7 =  ? OR player_8 =  ? OR player_9 =  ?";
            dbConn.query(sql, [matchId,playerName ,playerName,playerName,playerName,playerName,playerName,playerName,playerName,playerName], (err, result) => {
                resolve(result[0].player);
            });
        } catch (error) {
            reject(error);
        }
    });
};
Cricketmatch.getAllSeriesList = async ()=>{
    try {
        let mytoken = await changeToken();
        let apitoken = mytoken.token;
            let {data} = await axios.post(`https://api.cricapi.com/v1/series?apikey=${apitoken}&offset=0`)
            let result = data.data || [];
            return  result;

    }catch (e){
        return e;
    }
};
Cricketmatch.getSeriesInfo = async (seriesId)=>{
    try {
        let mytoken = await changeToken();
        let apitoken = mytoken.token;
        let {data} = await axios.post(`https://api.cricapi.com/v1/series_info?apikey=${apitoken}&id=${seriesId}`)
        let result = data.data || [];
        return  result;
    }catch (e){

    }

};
Cricketmatch.ActiveToken = async () => {
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
};
Cricketmatch.InActiveToken = async () => {
    return new Promise((resolve, reject) => {
        try {
            let sql = "SELECT * FROM all_tokens";
            dbConn.query(sql, (err, result) => {
              if(result.length>1){
                  resolve(result);
              }
              if(result.length == 1){
                  resolve(result[0]);
              }

            });
        } catch (error) {
            reject(error);
        }
    });
};
Cricketmatch.updateToken = async (newToken,oldToken) => {
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
};
Cricketmatch.DeleteToken = async (removeToken) => {
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
};
/*Cricketmatch.updateActiveToken = async (removeToken) => {
    return new Promise((resolve, reject) => {
        try {
            let sql = "DELETE FROM active_token WHERE token = ?; ";
            dbConn.query(sql,[removeToken],(err,result)=>{
                resolve(result)
            })
        } catch (error) {
            reject(error);
        }
    });
};*/





module.exports = Cricketmatch;
