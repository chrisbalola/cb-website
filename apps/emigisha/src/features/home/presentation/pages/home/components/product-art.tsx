import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/shared/presentation/utils/shadcn';
import { ProductKey } from '../products';

const BARS = [40, 62, 48, 80, 55, 92, 35];
const HIGHLIGHTED_BAR = 5;

/** Meneja's month view on a phone, cut off by the bottom of the tile */
function MenejaArt() {
  const t = useTranslations('home.products.menejaScreen');
  const rows = [
    { label: t('sales'), amount: t('salesAmount'), incoming: true },
    { label: t('stock'), amount: t('stockAmount'), incoming: false },
    { label: t('rent'), amount: t('rentAmount'), incoming: false },
  ];

  return (
    <div className="-mb-7 h-[340px] w-[250px] rounded-t-[40px] bg-navy px-3 pt-3 shadow-[0_30px_60px_-20px_rgba(14,42,71,0.45)] min-[860px]:h-[470px] min-[860px]:w-[340px]">
      <div className="h-full overflow-hidden rounded-t-[30px] bg-[#f7f9fb] px-4 py-5 text-left text-[#0e2a47]">
        <p className="text-[0.6875rem] text-[#6b7c91]">{t('period')}</p>
        <p className="font-display text-[1.9rem] leading-[1.1] font-semibold tracking-[-0.03em]">
          {t('balance')} <small className="text-[0.9rem] font-medium text-[#6b7c91]">{t('currency')}</small>
        </p>
        <div className="my-4 flex h-[120px] items-end gap-2">
          {BARS.map((height, index) => (
            <span
              key={index}
              style={{ height: `${height}%` }}
              className={cn(
                'flex-1 origin-bottom animate-grow rounded-t-md rounded-b-[3px]',
                index === HIGHLIGHTED_BAR ? 'bg-accent' : 'bg-[#dce3ec]'
              )}
            />
          ))}
        </div>
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between border-t border-[#e6ebf1] py-[0.7rem] text-xs">
            <span className="flex items-center gap-2 font-medium">
              <span className="grid size-[26px] place-items-center rounded-lg bg-[#eceff3] text-[0.7rem]">{row.incoming ? '↓' : '↑'}</span>
              {row.label}
            </span>
            <span className={cn('font-semibold', row.incoming && 'text-[#1f7a4d]')}>{row.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Portrait({ className }: { className: string }) {
  return (
    <span className={cn('relative block overflow-hidden rounded-2xl shadow-[0_10px_24px_-10px_rgba(14,42,71,0.4)]', className)}>
      <span className="absolute top-[22%] left-[31%] h-[30%] w-[38%] rounded-full bg-white/85" />
      <span className="absolute bottom-[-8%] left-[12%] h-[42%] w-[76%] rounded-t-full bg-white/85" />
    </span>
  );
}

/** Three studio portraits made from one selfie */
function TalatalaArt() {
  return (
    <div className="flex items-end gap-2.5">
      <Portrait className="h-[120px] w-[92px] translate-y-1.5 -rotate-6 bg-linear-160 from-[#f2b33d] to-[#e07a1f]" />
      <Portrait className="z-10 h-[136px] w-[104px] bg-linear-160 from-[#2c5c8f] to-[#0e2a47]" />
      <Portrait className="h-[120px] w-[92px] translate-y-1.5 rotate-6 bg-linear-160 from-[#9fb4cc] to-[#5e7894]" />
    </div>
  );
}

function StyledPage({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'h-[128px] w-[96px] overflow-hidden rounded-[10px] border border-[#dce3ec] bg-white min-[860px]:h-[170px] min-[860px]:w-[130px]',
        className
      )}
    >
      <div className="relative h-[54px] bg-navy">
        <span className="absolute top-4 right-3 size-[22px] rounded-full bg-accent" />
      </div>
      <div className="flex flex-col gap-1.5 px-3 py-2.5">
        <span className="h-[7px] w-[70%] rounded-xs bg-navy" />
        <span className="h-1 rounded-xs bg-[#dce3ec]" />
        <span className="h-1 w-[85%] rounded-xs bg-[#dce3ec]" />
        <span className="h-1 rounded-xs bg-[#dce3ec]" />
        <span className="h-1 w-[60%] rounded-xs bg-[#dce3ec]" />
      </div>
    </div>
  );
}

const PLAIN_LINES = ['60%', '100%', '100%', '80%', '100%', '50%', '100%', '70%'];

/** A plain page turned into a designed one */
function StyledDocArt() {
  return (
    <div className="flex items-center gap-3 min-[860px]:gap-[18px]">
      <div className="flex h-[128px] w-[96px] flex-col gap-1.5 rounded-[10px] border border-dashed bg-muted p-3.5 min-[860px]:h-[170px] min-[860px]:w-[130px]">
        {PLAIN_LINES.map((width, index) => (
          <span key={index} style={{ width }} className="h-1 rounded-xs bg-border" />
        ))}
      </div>
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-navy">
        <ArrowRight className="size-[18px]" />
      </span>
      <div className="isolate flex">
        <StyledPage className="shadow-[0_18px_40px_-14px_rgba(14,42,71,0.4)]" />
        <StyledPage className="-z-10 -ml-[70px] rotate-[4deg] min-[860px]:-ml-[60px]" />
      </div>
    </div>
  );
}

export function ProductArt({ productKey }: { productKey: ProductKey }) {
  switch (productKey) {
    case 'meneja':
      return <MenejaArt />;
    case 'talatala':
      return <TalatalaArt />;
    case 'styleddoc':
      return <StyledDocArt />;
  }
}
