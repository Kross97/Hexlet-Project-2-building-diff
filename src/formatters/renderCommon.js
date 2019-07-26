import _ from 'lodash';

const calculateTabs = depth => ' '.repeat(2 * depth);

const makeString = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const openingTab = calculateTabs(depth + 1);
  const closingTab = calculateTabs(depth);
  return `{\n${[...Object.keys(value)].map(key => `${openingTab}${key}: ${value[key]}`)}\n${closingTab}}`;
};

const render = (element, depth) => {
  const tab = calculateTabs(depth);
  switch (element.type) {
    case 'new':
      return `${tab}+ ${element.key}: ${makeString(element.value, depth)}`;

    case 'deleted':
      return `${tab}- ${element.key}: ${makeString(element.value, depth)}`;

    case 'unchanged':
      return `${tab}  ${element.key}: ${makeString(element.value, depth)}`;

    case 'changed':
      return [`${tab}+ ${element.key}: ${makeString(element.afterValue, depth)}`, `${tab}- ${element.key}: ${makeString(element.beforeValue, depth)}`].join('\n');
    case 'parent':
      return `${tab} ${element.key}: {\n${element.children.map(el => render(el, depth + 1)).join('\n')}\n}`;
    default:
      throw Error(`${element.type} is uncorrect key type!!!`);
  }
};

export default ast => `{\n${ast.map(el => render(el, 1)).join('\n')}\n}`;
