import { IsNotEmpty } from 'class-validator';
// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// import { Exclude } from 'class-transformer';

export class QueryNovelDto {
  @IsNotEmpty({ message: 'name不能为空' })
  name: string;
}

export class QueryChapterDto {
  @IsNotEmpty({ message: '地址不能为空' })
  url: string;
}
