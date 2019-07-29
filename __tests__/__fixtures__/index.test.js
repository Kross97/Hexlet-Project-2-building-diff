import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const filesForTests = [
  ['before.json', 'after.json', 'common', 'result-common.txt'],
  ['before.ini', 'after.ini', 'common', 'result-common.txt'],
  ['before.yml', 'after.yml', 'common', 'result-common.txt'],
  ['before-tree.json', 'after-tree.json', 'common', 'result-tree-common.txt'],
  ['before-tree.json', 'after-tree.json', 'plain', 'result-tree-plain.txt'],
  ['before-tree.json', 'after-tree.json', 'json', 'result-tree-json.txt'],
];


test.each(filesForTests)('genDiff(%s,%s,%s)', (before, after, format, result) => {
  const pathToBeforeFile = path.resolve(__dirname, `__fixtures__/${before}`);
  const pathToAfterFile = path.resolve(__dirname, `__fixtures__/${after}`);
  const pathToResultFile = path.resolve(__dirname, `__fixtures__/${result}`);

  const referenceResult = fs.readFileSync(pathToResultFile, 'utf-8');

  expect(genDiff(pathToBeforeFile, pathToAfterFile, format)).toEqual(referenceResult);
});
