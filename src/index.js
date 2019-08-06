import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import getRender from './formatters';

const conditions = [
  {
    check: (key, object1, object2) => _.isObject(object1[key]) && _.isObject(object2[key]),
    diffType: (key, object1, object2, fun) => ({
      type: 'parent',
      key,
      children: fun(object1[key], object2[key]),
    }),
  },
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
    return [...acc, diffType(key, object1, object2, makeAst)];
  }, []);
};

const parse = (transferFilePath) => {
  const filepath = path.resolve(process.cwd(), transferFilePath);
  const fileContent = fs.readFileSync(filepath, 'utf-8');
  const extension = path.extname(filepath);
  const parsedContent = getParser(extension);
  return parsedContent(fileContent);
};

const genDiff = (filepath1, filepath2, format) => {
  const object1 = parse(filepath1);
  const object2 = parse(filepath2);
  const render = getRender(format);

  const ast = makeAst(object1, object2);
  const renderedResult = render(ast);
  return renderedResult;
};

export default genDiff;
