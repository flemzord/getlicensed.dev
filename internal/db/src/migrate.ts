import { runMigrate } from './index';

runMigrate()
  .then(() => {
    console.log('Database migrations fully done');
  })
  .catch((err) => {
    console.error('Database migrations failed', err);
  });
