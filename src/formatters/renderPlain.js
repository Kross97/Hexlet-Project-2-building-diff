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
      return `Property ${key} was added with value: ${makeString(element.value)}`;

    case 'deleted':
      return `Property ${key} was removed`;

    case 'changed':
      return `Property ${key} was updated. From ${makeString(element.beforeValue)} to ${makeString(element.afterValue)}`;

    case 'parent':
      return `${element.children.filter(el => el.type !== 'unchanged').map(el => render(el, getFullKey(key, el))).join('\n')}`;

    default:
      throw Error(`${element.type} is uncorrect key type!!!`);
  }
};

export default ast => `${ast.map(el => render(el, el.key)).join('\n')}`;
