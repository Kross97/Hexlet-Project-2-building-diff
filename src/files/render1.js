import _ from 'lodash';

const strVal = (value) => {
  const result = !_.isObject(value) ? value : Object.keys(value).map(key => `{\n      ${key}: ${value[key]}\n}`).join('');
  return result;
};

const customSwitch = (element) => {
  switch (element.type) {
    case 'new':
      return `   ${'+'} ${element.key}: ${strVal(element.value)}\n`;

    case 'deleted':
      return `   ${'-'} ${element.key}: ${strVal(element.value)}\n`;

    case 'unchanged':
      return `      ${element.key}: ${strVal(element.value)}\n`;

    case 'changed':
      return [`     ${'+'} ${element.key}: ${strVal(element.afterValue)} \n`, `    ${'-'} ${element.key}: ${strVal(element.beforeValue)}\n`];
    case 'parent':
      return `     ${element.key}: {\n${element.children.map(el => customSwitch(el))}}\n`;
    default:
      throw Error('boom!!');
  }
};

export default ast => `{\n${ast.map(el => customSwitch(el))}}`;
