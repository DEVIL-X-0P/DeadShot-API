let data = [
    {
        "player":"Nat Sciver-Brunt",
        "value":"3.2"
    },
    {
        "player":"Amelia Kerr",
        "value":"1"
    },
    {
        "player":"Pooja Vastrakar",
        "value":"1.9"
    },
    {
        "player":"Yastika Bhatia",
        "value":"1.5"
    },
    {
        "player":"Heather Graham",
        "value":"30"
    },
    {
        "player":"Issy Wong",
        "value":"30"
    },
    {
        "player":"Amanjot Kaur",
        "value":"50"
    },
    {
        "player":"Dhara Gujjar",
        "value":"10"
    },
    {
        "player":"Saika Ishaque",
        "value":"10"
    },
    {
        "player":"Hayley Matthews",
        "value":"40 ,"
    },
    {
        "player":"Chloe Tryon",
        "value":"30"
    },
    {
        "player":"Humairaa Kaazi",
        "value":"10"
    },
    {
        "player":"Priyanka Bala",
        "value":"20 ,,"
    },
    {
        "player":"Sonam Yadav",
        "value":"10"
    },
    {
        "player":"Jintimani Kalita",
        "value":"10"
    },
    {
        "player":"Neelam Bisht",
        "value":"10"
    },
    {
        "player":"Ash Gardner",
        "value":"3.2"
    },
    {
        "player":"Beth Mooney",
        "value":"2"
    },
    {
        "player":"Sophia Dunkley",
        "value":"60"
    },
    {
        "player":"Annabel Sutherland",
        "value":"70"
    },
    {
        "player":"Harleen Deol",
        "value":"40"
    },
    {
        "player":"Deandra Dottin",
        "value":"60"
    },
    {
        "player":"Sneh Rana",
        "value":"75"
    },
    {
        "player":"S Meghana",
        "value":"30"
    },
    {
        "player":"Georgia Wareham",
        "value":"75"
    },
    {
        "player":"Mansi Joshi",
        "value":"30"
    },
    {
        "player":"D Hemalatha",
        "value":"30"
    },
    {
        "player":"Monica Patel",
        "value":"30"
    },
    {
        "player":"Tanuja Kanwar",
        "value":"50"
    },
    {
        "player":"Sushma Verma",
        "value":"60"
    },
    {
        "player":"Hurley Gala",
        "value":"10"
    },
    {
        "player":"Ashwani Kumari",
        "value":"35"
    },
    {
        "player":"Parunika Sisodia",
        "value":"10"
    },
    {
        "player":"Shabnim Shakil",
        "value":"10"
    },
    {
        "player":"Smriti Mandhana",
        "value":"3.4"
    },
    {
        "player":"Ellyse Perry",
        "value":"1.7"
    },
    {
        "player":"Sophie Devine",
        "value":"50"
    },
    {
        "player":"Renuka Thakur",
        "value":"1.5"
    },
    {
        "player":"Richa Ghosh",
        "value":"1.9"
    },
    {
        "player":"Erin Burns",
        "value":"30"
    },
    {
        "player":"Disha Kasat",
        "value":"10"
    },
    {
        "player":"Indrani Roy",
        "value":"10"
    },
    {
        "player":"Shreyanka Patil",
        "value":"10"
    },
    {
        "player":"Kanika Ahuja",
        "value":"35"
    },
    {
        "player":"Asha Shobana",
        "value":"10 ,"
    },
    {
        "player":"Heather Knight",
        "value":"40"
    },
    {
        "player":"Dane van Niekerk",
        "value":"30"
    },
    {
        "player":"Preeti Bose",
        "value":"30"
    },
    {
        "player":"Poonam Khemna",
        "value":"10"
    },
    {
        "player":"Komal Zanzad",
        "value":"25"
    },
    {
        "player":"Megan Schutt",
        "value":"40"
    },
    {
        "player":"Sahana Pawar",
        "value":"10"
    },
    {
        "player":"Meg Lanning",
        "value":"1.1,"
    },
    {
        "player":"Shafali Verma",
        "value":"2"
    },
    {
        "player":"Radha Yadav",
        "value":"40 ,"
    },
    {
        "player":", Shikha Pandey",
        "value":"60"
    },
    {
        "player":"Marizanne Kapp",
        "value":"1.5"
    },
    {
        "player":"Titas Sadhu",
        "value":"25"
    },
    {
        "player":"Alice Capsey",
        "value":"75"
    },
    {
        "player":"Tara Norris",
        "value":"10"
    },
    {
        "player":"Laura Harris",
        "value":"45"
    },
    {
        "player":"Jasia Akhter",
        "value":"20"
    },
    {
        "player":"Minu Manni",
        "value":"30"
    },
    {
        "player":"Taniya Bhatia",
        "value":"30"
    },
    {
        "player":"Poonam Yadav",
        "value":"30"
    },
    {
        "player":"Jess Jonassen",
        "value":"50"
    },
    {
        "player":"Sneha Deepthi",
        "value":"30"
    },
    {
        "player":"Arundhati Reddy",
        "value":"30"
    },
    {
        "player":"Aparna Mondal",
        "value":"10"
    },
    {
        "player":"Harmanpreet Kaur",
        "value":"18"
    }
]
let array= [];
data.forEach((item)=>{
    let value = item.value.replace("0","");
    let finalValue = value.replace(/,/g, "");
    let name = item.player;
    let prepare = {
        name:name,
        value:parseInt(finalValue)
    }
    array.push(prepare)

})
console.log(array)