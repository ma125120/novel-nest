
const baseDb = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'journal',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  autoLoadEntities: true,
  cli: {
    migrationsDir: 'migration',
  },
};
const db = {
  dev: {
    ...baseDb,
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'journal',
  },
  prod: {
    ...baseDb,
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'journal',
  },
};

export const getDbConfig = () => {
  const env = process.env.MY_ENV || 'dev';
  return db[env]
}