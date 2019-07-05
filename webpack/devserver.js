const path = require('path');

module.exports = () => {
    return {
        devServer: {
            contentBase: path.resolve(__dirname, '../dist'),
            open: false, // toDo set to true on config finish
            port: 3000,
            host: '192.168.10.64'
        }
    };
};