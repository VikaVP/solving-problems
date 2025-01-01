'use client';

import ModeToggle from './mode-toggle';
import HyperText from './ui/hyper-text';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-10 w-full border-b bg-neutral-50 text-white dark:border-neutral-600 dark:bg-neutral-950">
      <div className="mx-auto max-w-[1440px] sm:px-8">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between sm:h-[62px] lg:h-16">
            <div className="flex items-center">
              <HyperText className="text-primary">Fancy Form</HyperText>
            </div>
            <div className="flex items-center gap-4">
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
