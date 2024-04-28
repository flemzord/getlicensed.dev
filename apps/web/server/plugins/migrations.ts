import { runMigrate } from '~/server/database/migrate';

export default defineNitroPlugin(async () => {
  if (!import.meta.dev) return;

  await runMigrate();
});
