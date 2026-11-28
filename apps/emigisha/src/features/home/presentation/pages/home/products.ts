import { clientConfig } from '@/core/config/client-config';

export type ProductStatus = 'live' | 'building';

/** Key of the product under `home.products.items` in the translations */
export type ProductKey = 'meneja' | 'talatala' | 'styleddoc';

export type Product = {
  key: ProductKey;
  status: ProductStatus;
  href?: string;
};

/** The first product is shown as the large tile */
export const products: Product[] = [
  { key: 'meneja', status: 'live', href: clientConfig.links.meneja },
  { key: 'talatala', status: 'live', href: clientConfig.links.talatala },
  { key: 'styleddoc', status: 'building', href: clientConfig.links.styleddoc },
];
