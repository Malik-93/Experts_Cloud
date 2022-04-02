const { TASKS_VALUES, USERS_VALUES } = require("./seedData")

module.exports = {
    CREATE_DB_QUERY: "CREATE DATABASE IF NOT EXISTS EXPERTS_CLOUD_DB",
    CREATE_USER_TABLE_QUERY: `CREATE TABLE IF NOT EXISTS Users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email NVARCHAR(255))`,
    CREATE_TASKS_TABLE_QUERY: `CREATE TABLE IF NOT EXISTS Tasks (id INT AUTO_INCREMENT PRIMARY KEY, UserId INT, TaskTitle VARCHAR(255),TaskDescription VARCHAR(255),TaskStatus VARCHAR(255))`,
    SELECT_ALL_USERS: `select * from Users`,
    SELECT_ALL_TASKS: `select * from Tasks`,
    INSERT_USERS_QUERY: `INSERT INTO Users (id,name,email) VALUES${USERS_VALUES}`,
    INSERT_TASKS_QUERY: `INSERT INTO Tasks 
    (
        id,
        UserId,
        TaskTitle,
        TaskDescription,
        TaskStatus
    )
    VALUES ${TASKS_VALUES}`,

}