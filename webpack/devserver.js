const path = require('path');

module.exports = () => {
    return {
        devServer: {
            contentBase: path.resolve(__dirname, '../dist'),
            open: true,
            port: 3000,
        },
    };
};