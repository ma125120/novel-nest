const { upper } = require('../util')

const create = (name) => {
  const upName = upper(name)
  return `
import { Controller, Post, Body, Get, Param, Delete, Put, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ${upName}Service } from './${name}.service';
import { Create${upName}Dto, ${upName}Dto } from './dto/index.dto';
import { ${upName}Res, ${upName}ArrRes } from './dto/res';
import { ${upName} } from './${name}.entity';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('${name}')
@Controller('${name}')
export class ${upName}Controller {
  constructor(private readonly service: ${upName}Service) {}

  @ApiOperation({
    summary: '新建${name}',
    description: '新建${name}',
  })
  @ApiResponse({
    type: ${upName}Res,
    status: 201,
  })
  @Post()
  create(@Body() body: Create${upName}Dto): Promise<${upName}> {
    return this.service.create(body);
  }

  @ApiOperation({
    summary: '更新${name}',
    description: '更新${name}',
  })
  @ApiResponse({
    type: ${upName}Res,
    status: 201,
  })
  @Put()
  update(@Body() body: ${upName}Dto): Promise<${upName}> {
    return this.service.update(body);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: '查询所有${name}',
    description: '查询所有${name}',
  })
  @ApiResponse({
    status: 200,
    description: '${name}数组',
    // isArray: true,
    type: ${upName}ArrRes,
  })
  @Get()
  findAll(): Promise<${upName}[]> {
    return this.service.findAll();
  }

  @Get('/all')
  findAllWithDelete(): Promise<${upName}[]> {
    return this.service.findAllWithDelete();
  }

  @ApiOperation({
    summary: '根据id查询${name}',
    description: '根据id查询${name}',
  })
  @ApiResponse({
    status: 200,
    description: '${name}',
    type: ${upName}Res,
  })
  @Get(':id')
  find(@Param('id') id: string): Promise<${upName}> {
    return this.service.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }

  @Delete(\`/real/:id\`)
  deleteReal(@Param('id') id: string): Promise<void> {
    return this.service.deleteReal(id);
  }
}
`;
}

module.exports = create;