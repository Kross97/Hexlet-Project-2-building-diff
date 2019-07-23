import _ from 'lodash';

const makeString = (value) => {
  const result = !_.isObject(value) ? value : Object.keys(value).map(key => `{\n      ${key}: ${value[key]}\n}`).join('');
  return result;
};

const render = (element) => {
  switch (element.type) {
    case 'new':
      return `   + ${element.key}: ${makeString(element.value)}\n`;

    case 'deleted':
      return `   - ${element.key}: ${makeString(element.value)}\n`;

    case 'unchanged':
      return `      ${element.key}: ${makeString(element.value)}\n`;

    case 'changed':
      return [`     + ${element.key}: ${makeString(element.afterValue)} \n`, `    - ${element.key}: ${makeString(element.beforeValue)}\n`];
    case 'parent':
      return `     ${element.key}: {\n${element.children.map(el => render(el))}}\n`;
    default:
      throw Error(`${element.type} is uncorrect key type!!!`);
  }
};

export default ast => `{\n${ast.map(el => render()(el))}}`;
