import { ApiProperty } from '@nestjs/swagger';

export class BaseRes {
  @ApiProperty({ description: '状态码，0 表示 正常' })
  code: number;

  @ApiProperty({ description: '消息' })
  msg: string;

  @ApiProperty({ description: '返回的数据' })
  data: any;
}
