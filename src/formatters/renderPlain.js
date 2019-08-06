import _ from 'lodash';

const makeString = (value) => {
  const result = !_.isObject(value) ? value : '[complex value]';
  return result;
};

const render = (ast) => {
  const iter = (data, path = '') => data.map((element) => {
    switch (element.type) {
      case 'new':
        return `Property ${path}${element.key} was added with value: ${makeString(element.value)}`;

      case 'deleted':
        return `Property ${path}${element.key} was removed`;

      case 'changed':
        return `Property ${path}${element.key} was updated. From ${makeString(element.beforeValue)} to ${makeString(element.afterValue)}`;

      case 'parent':
        return `${iter(element.children.filter(el => el.type !== 'unchanged'), `${path}${element.key}.`).join('\n')}`;

      default:
        throw Error(`${element.type} is uncorrect key type!!!`);
    }
  });

  return iter(ast).join('\n');
};

export default render;
