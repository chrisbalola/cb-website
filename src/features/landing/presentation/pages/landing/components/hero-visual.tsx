'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const PROJECTS = [
  { name: 'Meneja', status: 'live', color: 'bg-green-500' },
  { name: '???', status: 'building', color: 'bg-accent' },
  { name: '???', status: 'planning', color: 'bg-blue-500' },
];

export function HeroVisual() {
  const t = useTranslations('landing.hero.visual');

  return (
    <motion.div className="relative w-full max-w-sm" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
      <div className="rounded-2xl border bg-card p-6 shadow-lg">
        {/* Card Header */}
        <div className="mb-5 flex items-center justify-between">
          <span className="text-sm font-semibold">{t('title')}</span>
          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">{t('badge')}</span>
        </div>

        {/* Project Rows */}
        <div className="space-y-4">
          {PROJECTS.map((project) => (
            <div key={project.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`size-2.5 rounded-full ${project.color}`} />
                <span className="text-sm text-muted-foreground">{project.name}</span>
              </div>
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">{t(project.status)}</span>
            </div>
          ))}
        </div>

        {/* Activity bar chart */}
        <div className="mt-5 flex items-end gap-1.5">
          {[40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 68].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm bg-accent/20" style={{ height: `${h * 0.5}px` }}>
              <div className="w-full rounded-sm bg-accent/60" style={{ height: `${h * 0.35}px`, marginTop: `${h * 0.15}px` }} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
