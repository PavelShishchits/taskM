import variables from '../../scss/globUtils/_exportVars.scss';

let breakpoints = {};

for (let key in variables) {
    if (variables.hasOwnProperty(key) ) {
        breakpoints[key] = +variables[key];
    }
}

export const bp = breakpoints;