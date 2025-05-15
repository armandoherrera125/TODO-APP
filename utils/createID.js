const { v4: uuidv4 } = require('uuid');
const createID = () => {
    return uuidv4();
};

module.exports = createID;