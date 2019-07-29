import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const getParseFormat = (format) => {
  const formatParsers = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
    '.ini': ini.parse,
  };
  return formatParsers[format];
};


export default (filepath) => {
  const file = fs.readFileSync(path.resolve('__tests__/__fixtures__/', filepath), 'utf-8');
  const format = path.extname(filepath);
  const parser = getParseFormat(format);
  return parser(file);
};
.
