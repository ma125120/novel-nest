const { upper } = require('../util');

const create = name => {
  const upName = upper(name);
  return `
import { Injectable, } from '@nestjs/common';
import { ${upName} } from './${name}.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Create${upName}Dto, ${upName}Dto } from './dto/index.dto'
import { PageDto, toPage } from '@/common/types/page.dto';

@Injectable()
export class ${upName}Service {
  constructor(
    @InjectRepository(${upName})
    private readonly repo: Repository<${upName}>,
  ) {}

  create(body: Create${upName}Dto): Promise<${upName}> {
    const ${name} = body as ${upName};

    return this.repo.save(${name});
  }

  async findAll(params: PageDto) {
    // const builder = this.repo.createQueryBuilder('user');
    // return builder.leftJoinAndSelect('user.papers', 'paper').take(1).skip(1).getManyAndCount();

    return this.repo.findAndCount(toPage(params));
  }

  async findAllWithDelete(): Promise<${upName}[]> {
    const builder = this.repo.createQueryBuilder()
    return builder.withDeleted().getMany()
  }

  findOne(id: string): Promise<${upName}> {
    return this.repo.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.repo.softDelete(id);
  }

  async deleteReal(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async update(body: ${upName}Dto) {
    const ${name} = body as ${upName};
    return this.repo.save(${name});
  }
}

export class ${upName}Module {}
`;
};

module.exports = create;