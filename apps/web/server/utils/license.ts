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
  name: string;
  token: string;
  productName: string;
  customerName: string;
  expirationDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const checkLicenseIsValid = async (license: License) => {
  if (license.expirationDate <= new Date()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'License expired',
    });
  }
  return license;
};
