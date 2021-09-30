const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const User = require('../models/User');


// Imports models


const connection = new Sequelize(dbConfig);

// Init models
User.init(connection);
Course.init(connection);
Lesson.init(connection);


// Associates models
Course.associate(connection.models)
Lesson.associate(connection.models)
User.associate(connection.models)


module.exports = connection;