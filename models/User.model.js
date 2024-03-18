
module.exports = (sequelize, Sequelize) => {
const User = sequelize.define('users', {
    username: {
        type: Sequelize.STRING
    },
    resume: {
        type: Sequelize.TEXT
    }
})

    return User;
};