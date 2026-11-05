'use client';

import { AnimatePresence, motion } from 'framer-motion';

interface ModuleVisualProps {
  activeTab: string;
}

const MODULE_COLORS: Record<string, { primary: string; secondary: string; accent: string }> = {
  finance: { primary: 'bg-accent/20', secondary: 'bg-accent/10', accent: 'bg-accent' },
  products: { primary: 'bg-blue-500/20', secondary: 'bg-blue-500/10', accent: 'bg-blue-500' },
  services: { primary: 'bg-emerald-500/20', secondary: 'bg-emerald-500/10', accent: 'bg-emerald-500' },
};

export function ModuleVisual({ activeTab }: ModuleVisualProps) {
  const colors = MODULE_COLORS[activeTab] ?? MODULE_COLORS.finance;

  return (
    <div className="relative flex h-72 items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="flex w-full max-w-xs flex-col gap-3"
        >
          {/* Card 1 */}
          <div className={`rounded-xl ${colors.primary} p-4`}>
            <div className="flex items-center gap-3">
              <div className={`size-8 rounded-lg ${colors.accent}`} />
              <div className="flex-1 space-y-1.5">
                <div className={`h-2.5 w-3/4 rounded-full ${colors.secondary}`} />
                <div className={`h-2 w-1/2 rounded-full ${colors.secondary}`} />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className={`rounded-xl ${colors.primary} p-4`}>
            <div className="flex items-center gap-3">
              <div className={`size-8 rounded-lg ${colors.accent} opacity-70`} />
              <div className="flex-1 space-y-1.5">
                <div className={`h-2.5 w-2/3 rounded-full ${colors.secondary}`} />
                <div className={`h-2 w-5/6 rounded-full ${colors.secondary}`} />
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className={`rounded-xl ${colors.primary} p-4`}>
            <div className="flex items-center gap-3">
              <div className={`size-8 rounded-lg ${colors.accent} opacity-50`} />
              <div className="flex-1 space-y-1.5">
                <div className={`h-2.5 w-1/2 rounded-full ${colors.secondary}`} />
                <div className={`h-2 w-2/3 rounded-full ${colors.secondary}`} />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
