import _ from 'lodash';
import parse from './parses';

const customSwitch = (element) => {
  switch (element.type) {
    case 'new':
      return ` + ${element.key}: ${element.value} \n`;

    case 'deleted':
      return ` - ${element.key}: ${element.value}\n`;

    case 'unchanged':
      return `   ${element.key}: ${element.value}\n`;

    case 'changed':
      return [` + ${element.key}: ${element.afterValue} \n`, ` - ${element.key}: ${element.beforeValue}\n`];
    default:
      throw Error('boom!!');
  }
};

const customRender = ast => `{\n${ast.map(el => customSwitch(el))}}`;

const conditions = [
  {
    check: (key, object1) => !_.has(object1, key),
    diffType: (key, object1, object2) => ({
      type: 'new',
      key,
      value: object2[key],
    }),
  },
  {
    check: (key, object1, object2) => !_.has(object2, key),
    diffType: (key, object1) => ({
      type: 'deleted',
      key,
      value: object1[key],
    }),
  },
  {
    check: (key, object1, object2) => object1[key] === object2[key],
    diffType: (key, object1) => ({
      type: 'unchanged',
      key,
      value: object1[key],
    }),
  },
  {
    check: (key, object1, object2) => object1[key] !== object2[key],
    diffType: (key, object1, object2) => ({
      type: 'changed',
      key,
      beforeValue: object1[key],
      afterValue: object2[key],
    }),
  },
];

const verifyKeysExistence = (key, object1, object2) => {
  const condition = conditions.find(({ check }) => check(key, object1, object2));
  return condition;
};

const makeAst = (object1, object2) => {
  const firstKeys = Object.keys(object1);
  const secondKeys = Object.keys(object2);

  const allKeys = _.union(firstKeys, secondKeys);
  return allKeys.reduce((acc, key) => {
    const { diffType } = verifyKeysExistence(key, object1, object2);
    return [...acc, diffType(key, object1, object2)];
  }, []);
};

const genDiff = (filepath1, filepath2) => {
  const object1 = parse(filepath1);
  const object2 = parse(filepath2);

  const ast = makeAst(object1, object2);
  const renderedResult = customRender(ast);
  return renderedResult;
};

export default genDiff;
