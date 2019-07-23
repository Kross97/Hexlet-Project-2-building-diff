import _ from 'lodash';

const isComplex = (value) => {
  const result = !_.isObject(value) ? value : `[${'complex value'}]`;
  return result;
};

const keyName = (key, el) => {
  const result = [key, !_.isObject(el.value) ? el.key : keyName(el.key, el.value)].join('.');
  return result;
};

const customSwitch = (element, name) => {
  switch (element.type) {
    case 'new':
      return `Property ${name} was added with value: ${isComplex(element.value)} \n`;

    case 'deleted':
      return `Property ${name} was removed \n`;

    case 'unchanged':
      return `Property ${name} was unchanged \n`;

    case 'changed':
      return `Property ${name} was updated. From ${isComplex(element.beforeValue)} to ${isComplex(element.afterValue)} \n`;
    case 'parent':
      return `${element.children.map(el => customSwitch(el, keyName(name, el)))}`;

    default:
      throw Error('boom!!');
  }
};

export default ast => `${ast.map(el => customSwitch(el, el.key))}`;
