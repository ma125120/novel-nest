import { ApiProperty } from '@nestjs/swagger';
import { BaseRes } from '../../common/types/base';

export class NovelSearch {
  @ApiProperty({ description: '小说名' })
  name: string;

  @ApiProperty({ description: '小说首页地址' })
  url: string;

  @ApiProperty({ description: '最新章节' })
  chapter: string;

  @ApiProperty({ description: '最新章节地址' })
  chapterUrl: string;

  @ApiProperty({ description: '作者' })
  author: string;

  @ApiProperty({ description: '总字数' })
  words: string;

  @ApiProperty({ description: '更新时间' })
  updateTime: string;

  @ApiProperty({ description: '状态' })
  status: string;
}

export class NovelChapter {
  @ApiProperty({ description: '章节名' })
  name: string;

  @ApiProperty({ description: '章节地址' })
  url: string;
}
export class NovelChapterArrRes extends BaseRes {
  @ApiProperty({ description: '返回的数据', type: [NovelChapter] })
  data: NovelChapter[];
}

export class NovelSearchRes extends BaseRes {
  @ApiProperty({ description: '返回的数据', type: NovelSearch })
  data: NovelSearch;
}

export class NovelSearchArrRes extends BaseRes {
  @ApiProperty({ description: '返回的数据', type: [NovelSearch] })
  data: NovelSearch[];
}

// class BasePage {
//   @ApiProperty({ description: '结果集', type: [UserDto] })
//   records: UserDto[];

//   @ApiProperty({ description: '总数' })
//   total: number;
// }

// export class UserPageRes extends BaseRes {
//   @ApiProperty({ description: '返回的数据', type: BasePage })
//   data: {
//     records: UserDto[];
//     total: number;
//   };
// }
