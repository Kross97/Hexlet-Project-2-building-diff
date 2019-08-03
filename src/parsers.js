import yaml from 'js-yaml';
import ini from 'ini';

const formatParsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default format => formatParsers[format];
