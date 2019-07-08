import variables from '../../scss/globUtils/_variables.scss';

let breakpoints = {};

for (let key in variables) {
    if (variables.hasOwnProperty(key) ) {
        breakpoints[key] = +variables[key].replace('px', '');
    }
}

export const bp = breakpoints;