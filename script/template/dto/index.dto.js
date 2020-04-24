const { upper } = require('../../util');

const create = name => {
  const upName = upper(name);
  return `
import { IsNotEmpty } from 'class-validator';
// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Create${upName}Dto {
  @IsNotEmpty()
  title: string;

  note?: string;

  // @ApiPropertyOptional({
  //   description: '页数',
  //   minimum: 1,
  //   default: 1,
  // })
  // pages?: number = 1;
}

export class ${upName}Dto extends Create${upName}Dto {
  id: number;
}
`;
};

module.exports = create
