const { select, input,checkbox } = require('@inquirer/prompts');
const choices = require('./utils/choices');
const printer = require('./utils/printer');
const {createTask, listOfTask, deleteTask,getData, listOfTaskCompleted, listOfTaskPending , fromPendingToComplete} = require('./data/handledata');
const data = require('./data/tasklist.json');

const consoleApp = async () => {
    let answer = '';
    do {
    printer();
    answer = await select({
        message: '¿Que desea hacer?\n',
        choices
    });
    switch (answer) {
        case 'createTask':
            const answerTask = await input({ message: 'Descripcion: \n'});
            createTask(answerTask);
            const enterButtonCreate = await input({ message: 'Presione enter para continuar: \n'});
            break;
        case 'listTask':
            listOfTask();
            const enterButtonList = await input({ message: 'Presione enter para continuar: \n'});
            break;
        case 'listCompletedTask':
            listOfTaskCompleted();
            const enterButtonListCompleted = await input({ message: 'Presione enter para continuar: \n'});
            break;
        case 'listPendingTask':
            listOfTaskPending();
            const enterButtonListPending = await input({ message: 'Presione enter para continuar: \n'});
            break;
        case 'completeTask':
            let infoToFilter = getData();
            infoToFilter = infoToFilter.filter( t => !t.status );
            if (infoToFilter.length == 0) {
                console.log(`No hay tareas incompletas`);
                const enterNoHayTareasIncompletas = await input({ message: 'Presione enter para continuar: \n'});
                break;
            }
            const taskSelected = await checkbox({
                message: 'Selecciona',
                choices: infoToFilter.map( ( t,index ) =>{
                    return {
                        name: `${index+1} ${t.task}`,
                        value: `${t.uuid}`,
                    }
                })
            });
            const lista = fromPendingToComplete(taskSelected);
            console.log(lista);
            const enterButtonfromPendingToComplete = await input({ message: 'Presione enter para continuar: \n'});
            break;
        case 'deleteTask':
            const infoUpdated = getData();
            const id = await select({
                message: 'Borrar',
                choices: infoUpdated.map( ( t,index ) =>{
                    return {
                        name: `${index+1} ${t.task}`,
                        value: `${t.uuid}`,
                    }
                })
            });
            const infoDeleted = deleteTask(id);
            console.log(`Task deleted: ${infoDeleted.task}`);
            const enterButtonDelete = await input({ message: 'Presione enter para continuar: \n'});
            break;
        case 'exit':
            console.log('exit');
            break;
        default:
            break;
    }
} while ( answer !== 'exit');
}
consoleApp();



