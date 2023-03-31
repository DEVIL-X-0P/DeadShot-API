const express = require("express");
const fileupload = require("express-fileupload");
const cors = require('cors');
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(fileupload());
global.Config = require('config');
global.Path = require('path');
global.Fs = require('fs-extra');
global.Auth = require('./app/middleware/auth');

/*global.MSG = require('./app/utils/messages.js');
global.Func = require('./app/utils/functions.js');*/
global.dbConn = require("./app/db/connection.js")
/*
global.Models = require('./app/models/init');*/
/*global.Email = require("./app/utils/Email.js");*/

require('./app/load-controllers')(app);
global.Services = require('./app/load-services');

module.exports = app;