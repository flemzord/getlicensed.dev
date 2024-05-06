// @vitest-environment nuxt
import { expect, test } from 'vitest';
import { createRandomString } from '~/server/utils/license';

test('check if random string is generated correctly', () => {
  const length = 10;
  const randomString = createRandomString(length);
  expect(randomString).toHaveLength(length);
  expect(randomString).toMatch(/^[A-Za-z0-9]+$/);
});
