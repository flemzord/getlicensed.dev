// @vitest-environment nuxt
import { expect, test } from 'vitest';
import {
  type License,
  checkLicenseIsValid,
  createRandomString,
} from '~/server/utils/license';

test('check if license is expired', async () => {
  const today = new Date();
  const dateOffset = 24 * 60 * 60 * 1000 * 5; //5 days

  const license: License = {
    name: 'test',
    token: 'test',
    productName: 'test',
    customerName: 'test',
    expirationDate: new Date(today.setTime(today.getTime() - dateOffset)),
    createdAt: today,
    updatedAt: today,
  };
  await expect(checkLicenseIsValid(license)).rejects.toThrowError(
    'License expired',
  );
});

test('check if license is valid', async () => {
  const today = new Date();
  const dateOffset = 24 * 60 * 60 * 1000 * 5; //5 days

  const license: License = {
    name: 'test',
    token: 'test',
    productName: 'test',
    customerName: 'test',
    expirationDate: new Date(today.setTime(today.getTime() + dateOffset)),
    createdAt: today,
    updatedAt: today,
  };
  const result = await checkLicenseIsValid(license);
  expect(result).toEqual(license);
});

test('check if random string is generated correctly', () => {
  const length = 10;
  const randomString = createRandomString(length);
  expect(randomString).toHaveLength(length);
  expect(randomString).toMatch(/^[A-Za-z0-9]+$/);
});
