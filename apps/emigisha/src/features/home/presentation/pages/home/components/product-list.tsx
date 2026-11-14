import { useTranslations } from 'next-intl';
import { cn } from '@/shared/presentation/utils/shadcn';
import { Product, products } from '../products';

const rowClassName =
  'grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 border-b py-[1.125rem] min-[52rem]:grid-cols-[9rem_1fr_auto] min-[52rem]:gap-4';

function ProductRow({ product }: { product: Product }) {
  const t = useTranslations('home.products');
  const isLive = product.status === 'live';

  const content = (
    <>
      <strong
        className={cn(
          'font-display text-[1.375rem] leading-[1.1] font-semibold decoration-accent decoration-2 underline-offset-4 group-hover:underline',
          !isLive && 'text-muted-foreground'
        )}
      >
        {t(`items.${product.key}.name`)}
      </strong>
      <span className={cn('font-medium whitespace-nowrap min-[52rem]:order-last', !isLive && 'text-muted-foreground')}>
        <span
          aria-hidden
          className={cn('mr-2.5 inline-block size-[0.55rem] rotate-45', isLive ? 'bg-accent' : 'border-[1.5px] border-muted-foreground')}
        />
        {t(`status.${product.status}`)}
      </span>
      <span className="col-span-full text-muted-foreground min-[52rem]:col-span-1">{t(`items.${product.key}.description`)}</span>
    </>
  );

  if (!product.href) {
    return <li className={rowClassName}>{content}</li>;
  }

  return (
    <li>
      <a
        href={product.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(rowClassName, 'group focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent')}
      >
        {content}
      </a>
    </li>
  );
}

export function ProductList() {
  return (
    <ul id="products" className="scroll-mt-8 border-t border-foreground">
      {products.map((product) => (
        <ProductRow key={product.key} product={product} />
      ))}
    </ul>
  );
}
