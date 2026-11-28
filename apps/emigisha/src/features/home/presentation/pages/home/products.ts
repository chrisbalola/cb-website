import type { StaticImageData } from 'next/image';
import { clientConfig } from '@/core/config/client-config';
import menejaIcon from '@/assets/images/products/meneja.png';
import styleddocIcon from '@/assets/images/products/styleddoc.png';
import talatalaIcon from '@/assets/images/products/talatala.png';

export type ProductStatus = 'live' | 'building';

/** Key of the product under `home.products.items` in the translations */
export type ProductKey = 'meneja' | 'talatala' | 'styleddoc';

export type Product = {
  key: ProductKey;
  status: ProductStatus;
  /** The app's own icon, from its repo */
  icon: StaticImageData;
  href?: string;
};

/** The first product is shown as the large tile */
export const products: Product[] = [
  { key: 'meneja', status: 'live', icon: menejaIcon, href: clientConfig.links.meneja },
  { key: 'talatala', status: 'live', icon: talatalaIcon, href: clientConfig.links.talatala },
  { key: 'styleddoc', status: 'building', icon: styleddocIcon, href: clientConfig.links.styleddoc },
];
