const USERS = [];
const TASKS = [];
const MAX_COUNT = 20;
const STATUSES = ["Completed", "Pending"];
const reandomNum = () => {
    return Math.round((Math.random() * MAX_COUNT))
};
for (let index = 0; index < MAX_COUNT; index++) {
    USERS.push({
        id: index + 1,
        name: `'User${index + 1}'`,
        email: `'user${index + 1}@mail.com'`,
    })
    TASKS.push({
        id: index + 1,
        UserId: reandomNum(),
        TaskTitle: `'Task Title${index + 1}'`,
        TaskDescription: `'Task Description${index + 1}'`,
        TaskStatus: `'${STATUSES[reandomNum() % 2]}'`,
    })
}
const USERS_VALUES = USERS.map((rec, index) => `(${rec.id}, ${rec.name},${rec.email})`)
const TASKS_VALUES = TASKS.map((rec, index) => `(${rec.id}, ${rec.UserId},${rec.TaskTitle},${rec.TaskDescription},${rec.TaskStatus})`)
module.exports = {
    USERS_VALUES,
    TASKS_VALUES
}