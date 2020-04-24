import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QueryNovelDto, QueryChapterDto } from './common/types/dto';
import { NovelSearchArrRes, NovelChapterArrRes } from './common/types/res';

@ApiTags('爬取小说')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({
    summary: '小说搜索',
  })
  @ApiResponse({
    type: NovelSearchArrRes,
    status: 200,
  })
  @Get(`/novel/search`)
  search(@Query() query: QueryNovelDto) {
    return this.appService.search(query.name);
  }

  @ApiOperation({
    summary: '小说章节列表',
  })
  @ApiResponse({
    type: NovelChapterArrRes,
    status: 200,
  })
  @Get(`/novel/chapter`)
  getChapter(@Query() query: QueryChapterDto) {
    return this.appService.getChapter(query.url);
  }
}
