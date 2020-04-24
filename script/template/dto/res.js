const { upper } = require('../../util');

const create = name => {
  const upName = upper(name);
  return `
import { ApiProperty } from "@nestjs/swagger";
import { ${upName}Dto } from "./index.dto";
import { BaseRes } from '../../common/types/base'

export class ${upName}Res extends BaseRes {
  @ApiProperty({ description: '返回的数据', type: ${upName}Dto })
  data: ${upName}Dto;
}

export class ${upName}ArrRes extends BaseRes {
  @ApiProperty({ description: '返回的数据', type: [${upName}Dto] })
  data: ${upName}Dto[];
}

class BasePage {
  @ApiProperty({ description: '结果集', type: [${upName}Dto] })
  records: ${upName}Dto[];

  @ApiProperty({ description: '总数', })
  total: number;
}
export class ${upName}PageRes extends BaseRes {
  @ApiProperty({ description: '返回的数据', type: BasePage })
  data: {
    records: ${upName}Dto[],
    total: number,
  };
}
`;
};

module.exports = create;
