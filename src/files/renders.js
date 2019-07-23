import common from './render1';
import plain from './render2';

const renders = (format) => {
  const val = {
    common,
    plain,
  };
  return val[format];
};

export default format => renders(format);
