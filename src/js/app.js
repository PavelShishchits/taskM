import './components';
import './modules/icons';
import * as utils from './modules/utils';
import {bp} from './modules/variables';
console.log(bp, utils.currentDevice);


// const a = new Promise((resolve, reject) => {
//     resolve('mew');
// });
//
// a.then(() => {
//     console.log('mew');
// });

$(function () {
    utils.detectJs();
    utils.detectIE();
});