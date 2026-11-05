import { ThemeToggleButton } from '@/shared/presentation/components/misc/theme-toggle-button';
import { Letterhead } from './components/letterhead';
import { Letter } from './components/letter';
import { HomeFooter } from './components/home-footer';
import { PersonJsonLd } from './components/person-json-ld';

export function HomePage() {
  return (
    <div className="flex min-h-svh flex-col">
      <PersonJsonLd />
      <div className="fixed top-4 right-4">
        <ThemeToggleButton />
      </div>
      <main className="mx-auto w-full max-w-[40rem] flex-1 px-4 pt-[clamp(4rem,18vh,11rem)] pb-16">
        <Letterhead />
        <Letter />
      </main>
      <HomeFooter />
    </div>
  );
}
