import _ from 'lodash';

const makeString = (value) => {
  const result = !_.isObject(value) ? value : '[complex value]';
  return result;
};

const getFullKey = (key, el) => {
  const result = [key, !_.isObject(el.value) ? el.key : getFullKey(el.key, el.value)].join('.');
  return result;
};

const render = (element, key) => {
  switch (element.type) {
    case 'new':
      return `Property ${key} was added with value: ${makeString(element.value)} \n`;

    case 'deleted':
      return `Property ${key} was removed \n`;

    case 'unchanged':
      return `Property ${key} was unchanged \n`;

    case 'changed':
      return `Property ${key} was updated. From ${makeString(element.beforeValue)} to ${makeString(element.afterValue)} \n`;
    case 'parent':
      return `${element.children.map(el => render(el, getFullKey(key, el)))}`;

    default:
      throw Error(`${element.type} is uncorrect key type!!!`);
  }
};

export default ast => `${ast.map(el => render(el, el.key))}`;
