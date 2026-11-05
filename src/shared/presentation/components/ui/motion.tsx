'use client';

import { type HTMLMotionProps, type Variants, motion } from 'framer-motion';
import { type ReactNode, forwardRef } from 'react';
import { cn } from '@/shared/presentation/utils/shadcn';

// ─── Shared Variants ───────────────────────────────────────────────────────────

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

// ─── FadeUp Component ──────────────────────────────────────────────────────────

interface FadeUpProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
}

export const FadeUp = forwardRef<HTMLDivElement, FadeUpProps>(({ children, className, ...props }, ref) => (
  <motion.div
    ref={ref}
    variants={fadeUpVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-80px' }}
    className={cn(className)}
    {...props}
  >
    {children}
  </motion.div>
));
FadeUp.displayName = 'FadeUp';
