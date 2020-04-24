const { upper } = require('../util');

const create = name => {
  const upName = upper(name);
  return `
import {
  // Column,
  Entity,
  PrimaryGeneratedColumn,
  // Index,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

@Entity()
export class ${upName} {
  constructor(partial: Partial<${upName}>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Expose()
  get note() {
    return 'note'
  };
  
  @CreateDateColumn()
  create_time?: string;

  @UpdateDateColumn()
  update_time?: string;

  @Exclude()
  @DeleteDateColumn()
  delete_time?: string;
}
`;
};


module.exports = create;