import { cn } from '@/shared/presentation/utils/shadcn';

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ label, title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn('mx-auto max-w-2xl text-center', className)}>
      <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">{label}</span>
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
