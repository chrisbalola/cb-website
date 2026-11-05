import { cn } from '@/shared/presentation/utils/shadcn';

interface IconProps {
  /** Path to the SVG file in public folder (e.g., "/icons/account-settings/your-account.svg") */
  src: string;
  /** Optional className for styling and coloring */
  className?: string;
  /** Size of the icon. Defaults to "1em" to inherit from font-size */
  size?: number | string;
}

/**
 * Icon - Displays SVG assets from public folder with dynamic coloring using CSS mask
 *
 * Features:
 * - Uses CSS mask to enable currentColor inheritance
 * - Works with text color classes (e.g., text-accent, text-foreground)
 * - Automatically scales with font-size when size not specified
 *
 * @example
 * ```tsx
 * <Icon src="/icons/account-settings/your-account.svg" className="text-accent" />
 * <Icon src="/icons/settings.svg" size={24} className="text-muted-foreground" />
 * ```
 */
export function Icon({ src, className, size = '1em' }: IconProps) {
  const sizeValue = typeof size === 'number' ? `${size}px` : size;

  return (
    <span
      className={cn('inline-block', className)}
      style={{
        width: sizeValue,
        height: sizeValue,
        backgroundColor: 'currentColor',
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
      }}
      aria-hidden="true"
    />
  );
}
