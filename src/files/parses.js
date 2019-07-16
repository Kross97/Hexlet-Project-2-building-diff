import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const distp = (format) => {
  const raspr = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
    '.ini': ini.parse,
  };
  return raspr[format];
};


export default (filepath) => {
  const file = fs.readFileSync(path.resolve('src/__tests__/__fixtures__', filepath), 'utf-8');
  const format = path.extname(filepath);
  const parser = distp(format);
  return parser(file);
};
