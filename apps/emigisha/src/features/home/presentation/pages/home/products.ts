import { clientConfig } from '@/core/config/client-config';

export type ProductStatus = 'live' | 'building';

export type Product = {
  /** Key of the product under `home.products.items` in the translations */
  key: string;
  status: ProductStatus;
  href?: string;
};

export const products: Product[] = [
  { key: 'meneja', status: 'live', href: clientConfig.links.meneja },
  { key: 'next', status: 'building' },
];

/** Number of products that have shipped. Drives the yellow marks in the hero. */
export const shippedCount = products.filter((product) => product.status === 'live').length;
