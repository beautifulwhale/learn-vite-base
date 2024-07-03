import _ from 'lodash';

const obj = _.cloneDeep({ a: { b: { c: 1 } } });
console.log('obj', obj);

const arr = [1, 2, 3];
