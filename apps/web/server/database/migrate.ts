import { dbMigrate } from '~/server/database/db';

export const runMigrate = async () => {
  console.log('Running database migrations...');

  await dbMigrate()
    .then(() => {
      console.log('Database migrations done');
    })
    .catch((err) => {
      console.error('Database migrations failed', err);
    });
};

await runMigrate();
