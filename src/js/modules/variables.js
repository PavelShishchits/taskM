import variables from '../../scss/main/_exportVars.scss';

let breakpoints = {};

for (let key in variables) {
    if (variables.hasOwnProperty(key) ) {
        breakpoints[key] = +variables[key];
    }
}

export const bp = breakpoints;