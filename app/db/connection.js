const mysql = require("mysql");
const config = {
	host: 'db4free.net',
	user: 'monkya',
	password: 'gapij17976@dogemn.com',
	database: 'monkyaxd',
	port:'3306'
};

const mysql_connection = mysql.createConnection(config);

mysql_connection.connect((err) => {
	if (!err) {
		console.log("database connection created ");
	} else {
		console.log(err)
		console.log("connection failed");
	}
});

module.exports = mysql_connection;

