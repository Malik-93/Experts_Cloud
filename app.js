const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var mysql = require('mysql');
const { CREATE_DB_QUERY, CREATE_TASKS_TABLE_QUERY, CREATE_USER_TABLE_QUERY, INSERT_TASKS_QUERY, INSERT_USERS_QUERY, SELECT_ALL_USERS, SELECT_ALL_TASKS } = require('./Queries');
const app = express();
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootadmin123',
    database: 'EXPERTS_CLOUD_DB'
    // database: 'sys'
});

connection.connect((err) => {
    if (err) console.log("An error accured during connect to db", err)
    else {
        console.log("Successfully connected to db");
        connection.query(CREATE_DB_QUERY, (err, result) => {
            if (err) console.log("An error accured during creating db", err);
            else console.log("Database created");
        })
        connection.query(CREATE_USER_TABLE_QUERY, (err, result) => {
            if (err) console.log("An error accured during creating db", err);
            else {
                console.log("User table created");
                connection.query(SELECT_ALL_USERS, (err, result) => {
                    if (err) console.log("An error accured during select all users", err);
                    else {
                        // console.log("User records fetched",result);
                        if (!result.length) {
                            // console.log("INSERT_USERS_QUERY", INSERT_USERS_QUERY);
                            connection.query(INSERT_USERS_QUERY, (err, result) => {
                                if (err) console.log("An error accured during inserting users to db", err);
                                else console.log("User records inserted");
                            })

                        }
                    }
                })
            }
        })
        connection.query(CREATE_TASKS_TABLE_QUERY, (err, result) => {
            if (err) console.log("An error accured during creating db", err);
            else {
                console.log("Tasks table created")
                connection.query(SELECT_ALL_TASKS, (err, result) => {
                    if (err) console.log("An error accured during select all tasks", err);
                    if (!result.length) {
                        connection.query(INSERT_TASKS_QUERY, (err, result) => {
                            if (err) console.log("An error accured during creating db", err);
                            else console.log("Tasks records inserted");
                        })

                    }
                })
            };
        })
    }
});
app.use(cors());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// Problem # 1:
app.use("/get-numbers", (req, res) => {
    // let _numbers = [1, 3, 6, 10, 15, 21, 30]
    let _numbers = [100, 103, 105, 106, 110, 112, 113]
    let _sortedNumbers = _numbers.sort((a, b) => (a - b))
    let _result = [];
    const _dataLength = _sortedNumbers.length;
    for (let i = 0; i < _dataLength; i++) {
        const current = _sortedNumbers[i];
        const next = _sortedNumbers[i + 1]
        const diff = (current + 1 !== next) ? next - current : 0;
        if (diff) {
            for (let j = 1; j < diff; j++) {
                _result.push(_sortedNumbers[i] + j)
            }
        }
    }
    return res.status(200).json({ success: true, data: _result })
})


// Problem # 2;
app.use("/find-adjacent-numbers", (req, res) => {
    // let _numbers = [1, 3, 6, 10, 15, 21, 30]
    const GIVEN_NUMBER = 7;
    let _numbers = [3, 4, 5, 2, 5, 6, 9]
    const _set = new Set();
    const _dataLength = _numbers.length;
    for (let i = 0; i < _dataLength; i++) {
        for (let j = 0; j < _dataLength; j++) {
            const CASE = _numbers[i] + _numbers[j] === GIVEN_NUMBER;
            if (CASE) _set.add(`${_numbers[i]},${_numbers[j]}`)
        }
    }
    return res.status(200).json({ success: true, data: [..._set] })
})

// Problem # 3:
app.use("/letters-with-count", (req, res) => {
    let _letters = ["C", "C", "a", "b", "p", "z", "z", "b", "z"];
    let _sortedLetters = _letters.map(_el => _el.toLocaleUpperCase()).sort((a, b) => a.localeCompare(b))
    const _set = new Set(_sortedLetters)
    const _result = []
    _set.forEach((value) => {
        const letterCount = _sortedLetters.filter(_elem => value === _elem).length;
        _result.push(`${letterCount}${value}`)
    })
    return res.status(200).json({ success: true, data: _result })
})
app.use("/", (req, res) => {
    res.send("experts cloud app is running...")
})
module.exports = app;