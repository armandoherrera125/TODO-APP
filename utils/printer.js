const colors = require('colors/safe');
const printer = () => {
    console.clear();
    console.log(colors.green('==================================='));
    console.log('Seleccione una opción');
    console.log(colors.green('==================================='));
}

module.exports = printer;