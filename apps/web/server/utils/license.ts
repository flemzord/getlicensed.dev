import { schema } from '@getlicensed/db';

export const generateLicenseKey: string = `license_${createRandomString(24)}`;

export function createRandomString(length: number) {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export interface License {
  id: string;
  name: string;
  token: string;
  productName: string;
  customerName: string;
  expirationDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const writeSuccessLicenseUsage = async (license: License) => {
  return useDB().insert(schema.licenseUsage).values({
    licenseId: license.id,
    type: 'LICENSE_VALIDATE',
    action: schema.licenseUsageActionEnum.enumValues[0],
  });
};

export const writeExpiredLicenseUsage = async (license: License) => {
  return useDB().insert(schema.licenseUsage).values({
    licenseId: license.id,
    type: 'LICENSE_VALIDATE',
    action: schema.licenseUsageActionEnum.enumValues[1],
  });
};
