-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'rootadmin123'
-- flush privileges
-- DROP table Users;
-- DROP table Tasks;
-- SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
use EXPERTS_CLOUD_DB;
select * from Users;
select * from Tasks;

-- Query#1
select Users.id, Users.name, COUNT(*) as TotalTasks from Users JOIN Tasks ON Tasks.UserId = Users.id GROUP BY Tasks.UserId;

-- Query#2
select Users.id, Users.name, COUNT(*) as TotalPendingTask from Users JOIN Tasks ON  Tasks.UserId = Users.id AND Tasks.TaskStatus = 'Pending' GROUP BY Tasks.UserId having TotalPendingTask > 2;

-- Query#3
SELECT Users.id, Users.name 
FROM Users 
WHERE NOT EXISTS 
    (SELECT * 
     FROM Tasks 
     WHERE Users.id = Tasks.UserId);