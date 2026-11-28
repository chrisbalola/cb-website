import { useTranslations } from 'next-intl';
import { cn } from '@/shared/presentation/utils/shadcn';
import { containerClassName, eyebrowClassName, focusRingClassName, sectionTitleClassName } from '../class-names';
import { Product, products } from '../products';
import { ProductArt } from './product-art';

const TRAITS = ['mobileMoney', 'slowNetworks', 'anyPhone', 'localLanguages'] as const;

const tileClassName =
  'relative flex flex-col overflow-hidden rounded-[26px] border bg-card p-6 text-left shadow-[0_1px_2px_rgba(14,42,71,0.06),0_12px_32px_-12px_rgba(14,42,71,0.18)] min-[860px]:rounded-[32px] min-[860px]:p-7';

function StatusChip({ status }: { status: Product['status'] }) {
  const t = useTranslations('home.products.status');
  const isLive = status === 'live';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-[0.45rem] rounded-full px-[0.7rem] py-[0.3rem] text-[0.8125rem] font-medium whitespace-nowrap',
        isLive ? 'bg-live text-foreground' : 'bg-muted text-muted-foreground'
      )}
    >
      <span aria-hidden className={cn('size-[7px] rounded-full border-[1.5px]', isLive ? 'border-accent bg-accent' : 'border-current')} />
      {t(status)}
    </span>
  );
}

function ProductTile({ product, featured }: { product: Product; featured: boolean }) {
  const t = useTranslations('home.products.items');
  const className = cn(
    tileClassName,
    featured && 'bg-linear-to-b from-card to-muted min-[860px]:col-span-7 min-[860px]:row-span-2',
    !featured && 'min-[860px]:col-span-5'
  );

  const content = (
    <>
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-[1.75rem] leading-none font-semibold tracking-[-0.035em]">{t(`${product.key}.name`)}</h3>
        <StatusChip status={product.status} />
      </div>
      <p className="mt-2 max-w-[26rem] text-muted-foreground">{t(`${product.key}.description`)}</p>
      <div aria-hidden className="mt-auto flex items-end justify-center pt-6">
        <ProductArt productKey={product.key} />
      </div>
    </>
  );

  if (!product.href) {
    return <div className={className}>{content}</div>;
  }

  return (
    <a
      href={product.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(className, 'transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-1', focusRingClassName)}
    >
      {content}
    </a>
  );
}

function EveryoneTile() {
  const t = useTranslations('home.products.everyone');

  return (
    <div className="flex flex-col gap-6 rounded-[26px] bg-accent p-6 text-navy min-[860px]:col-span-12 min-[860px]:flex-row min-[860px]:items-end min-[860px]:justify-between min-[860px]:rounded-[32px] min-[860px]:p-7">
      <div>
        <h3 className="max-w-[13ch] font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-none font-semibold tracking-[-0.035em]">{t('title')}</h3>
        <p className="mt-3 max-w-[22rem] text-[#3d3015]">{t('body')}</p>
      </div>
      <ul className="flex flex-wrap gap-2 min-[860px]:justify-end">
        {TRAITS.map((trait) => (
          <li key={trait} className="rounded-full bg-navy/10 px-[0.85rem] py-[0.4rem] text-sm font-medium">
            {t(`traits.${trait}`)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProductsSection() {
  const t = useTranslations('home.products');

  return (
    <section id="products" className="scroll-mt-4 py-[clamp(5rem,10vw,8rem)]">
      <div className={containerClassName}>
        <div className="mb-12 grid items-end gap-8 min-[860px]:grid-cols-2">
          <div>
            <p className={cn(eyebrowClassName, 'text-muted-foreground')}>{t('eyebrow')}</p>
            <h2 className={cn(sectionTitleClassName, 'mt-4')}>{t('title')}</h2>
          </div>
          <p className="max-w-[30rem] text-muted-foreground min-[860px]:justify-self-end">{t('intro')}</p>
        </div>
        <div className="grid gap-4 min-[860px]:grid-cols-12 min-[860px]:grid-rows-[repeat(2,minmax(300px,auto))_auto]">
          {products.map((product, index) => (
            <ProductTile key={product.key} product={product} featured={index === 0} />
          ))}
          <EveryoneTile />
        </div>
      </div>
    </section>
  );
}
