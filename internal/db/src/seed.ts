import { createCustomer } from './seeds/customer';
import { createLicense } from './seeds/license';
import { createLicenseUsage } from './seeds/licenseUsage';
import { createProduct } from './seeds/product';
import { createUser } from './seeds/user';

const main = async () => {
  console.log('Seed start');
  const user = await createUser();
  const product = await createProduct(user[0].id);
  const customer = await createCustomer(user[0].id);
  const license = await createLicense(
    user[0].id,
    product[0].id,
    customer[0].id,
  );
  const licenseUsage = await createLicenseUsage(license[0].id);
  console.log('Seed done');
};

main();
