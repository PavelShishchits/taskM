const {resolve} = require('path');
const OPT = require('./config');

module.exports = () => {
    return {
        devServer: {
            stats: 'errors-only',
            contentBase: resolve(OPT.dist),
            open: false, // toDo set to true on config finish
            port: 3000,
            // host: '192.168.10.64'
        }
    };
};