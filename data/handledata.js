const createID = require('../utils/createID');
const data = require('./tasklist.json');
const fs = require('fs');
const colors = require('colors/safe');

const getData = () => {
    const raw = fs.readFileSync('./data/tasklist.json', 'utf8');
    return JSON.parse(raw);
};

const createTask = (task) => {
    const data = getData(); // ahora se actualiza cada vez
    const newTask = {
        uuid: createID(),
        task: task,
        status: false
    };
    data.push(newTask);
    fs.writeFileSync('./data/tasklist.json', JSON.stringify(data, null, 2));
};

const listOfTask = () => {
    let info = fs.readFileSync('./data/tasklist.json', 'utf8');
    info = JSON.parse(info);
    return info.map(
        (t, index) =>
            console.log(`${colors.green(index + 1)} ${t.task} :: 
        ${t.status ? colors.green('Completada') : colors.red('Pendiente')}`));
}


const deleteTask = (id) => {
    const data = getData(); // lee los datos actuales
    const valueDeleted = data.find(t => t.uuid == id);
    const newValues = data.filter(t => t.uuid !== id);
    fs.writeFileSync('./data/tasklist.json', JSON.stringify(newValues, null, 2));
    return valueDeleted;
};
const listOfTaskCompleted = () => {
    let data = getData();
    data = data.filter(t => t.status);
    return data.map(
        (t, index) =>
            console.log(`${colors.green(index + 1)} ${t.task} :: ${t.status && colors.green('Completada')}`));
};

const listOfTaskPending = () => {
    let data = getData();
    data = data.filter(t => !t.status);
    return data.map(
        (t, index) =>
            console.log(`${colors.red(index + 1)} ${t.task} :: ${!t.status && colors.red('Pendiente')}`));
};

const fromPendingToComplete = (arr = []) => {
    if (arr.length > 0) {
        const data = getData();

        // Actualizar el estado de las tareas cuyo uuid esté en el array recibido
        const updatedData = data.map(task => {
            if (arr.includes(task.uuid)) {
                return {
                    ...task,
                    status: true
                };
            }
            return task;
        });

        // Guardar los cambios en el archivo
        fs.writeFileSync('./data/tasklist.json', JSON.stringify(updatedData, null, 2));

        return `Se marcaron ${arr.length} tareas como completadas.`;
    } else {
        return `No se enviaron tareas a completar`;
    }
};


module.exports = {
    createTask,
    listOfTask,
    deleteTask,
    getData,
    listOfTaskCompleted,
    listOfTaskPending,
    fromPendingToComplete
}