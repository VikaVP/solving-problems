import { Moon, Sun } from 'lucide-react';

import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useTheme } from './theme-provider';
import { useEffect, useState } from 'react';

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<string | undefined>('light');

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {currentTheme === 'light' ? (
            <Sun className="size-[1.2rem] rotate-0 scale-100 text-black transition-all" />
          ) : (
            <Moon className="absolute size-[1.2rem] rotate-90 scale-0 text-white transition-all dark:rotate-0 dark:scale-100" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
