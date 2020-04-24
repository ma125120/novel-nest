
const { upper } = require('../util');

const create = name => {
  const upName = upper(name);
  return `
import { TransfromData, } from '@/common/decorator';
import { ${upName} } from './${name}.entity'

export const ${upName}TransformData = () => TransfromData(${upName});
`;
};

module.exports = create;