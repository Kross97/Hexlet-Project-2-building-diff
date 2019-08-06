import _ from 'lodash';

const calculateTabs = depth => ' '.repeat(2 * depth);

const makeString = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const openingTab = calculateTabs(depth + 2);
  const closingTab = calculateTabs(depth + 1);
  return `{\n${[...Object.keys(value)].map(key => `${openingTab}${key}: ${value[key]}`)}\n${closingTab}}`;
};

const render = (ast) => {
  const iter = (data, depth = 1) => data.map((element) => {
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
        return `${tab}  ${element.key}: {\n${_.flatten(iter(element.children, depth + 1)).join('\n')}\n ${tab} }`;
      default:
        throw Error(`${element.type} is uncorrect key type!!!`);
    }
  });
  return `{\n${(_.flatten(iter(ast))).join('\n')}\n}`;
};

export default render;
