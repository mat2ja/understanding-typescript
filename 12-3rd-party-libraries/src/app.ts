import _ from 'lodash';

declare var GLOBAL_VAR: any;

console.log(_.shuffle([1, 2, 3, 4, 5, 6]));

console.log(GLOBAL_VAR);
