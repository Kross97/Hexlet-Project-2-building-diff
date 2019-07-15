import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const distp = (format) => {
  const raspr = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
  };
  return raspr[format];
};


export default (filepath) => {
  const file = fs.readFileSync(path.resolve('src/__tests__/__fixtures__', filepath), 'utf-8');
  const format = path.extname(filepath);
  const parser = distp(format);
  return parser(file);
};
