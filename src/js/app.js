import {psUtils} from './modules/utils';
import '../components/core/tabs/script';

console.log(psUtils);

const a = new Promise((resolve, reject) => {
    resolve('mew');
});

a.then(() => {
    console.log('mew');
});