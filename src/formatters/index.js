import common from './renderCommon';
import plain from './renderPlain';
import json from './renderJson';

const renderFormats = {
  common,
  plain,
  json,
};

export default (format = 'common') => renderFormats[format];
