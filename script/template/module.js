const { upper } = require('../util');

const create = name => {
  const upName = upper(name);
  return `
import { Module } from '@nestjs/common';
import { ${upName}Service } from './${name}.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${upName} } from './${name}.entity';
import { ${upName}ClientController } from './controller/client.controller'
import { ${upName}ServerController } from './controller/server.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([${upName}]),
  ],
  providers: [${upName}Service],
  controllers: [${upName}ClientController, ${upName}ServerController]
})
export class ${upName}Module {}
`;
};

module.exports = create;