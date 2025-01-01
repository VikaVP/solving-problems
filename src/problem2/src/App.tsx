import './App.css';
import { ThemeProvider } from './components/theme-provider';
import { Navbar } from './components/navbar';
import DotPattern from './components/ui/dot-pattern';
import { cn } from './lib/utils';
import Convert from './components/convert';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <div className="relative flex w-full h-[100vh] overflow-hidden bg-background px-4 py-20">
        <div className="size-full overflow-y-auto overflow-x-hidden mt-12 flex items-center flex-col">
          <h3 className="font-heading text-pretty text-center text-[29px] font-semibold tracking-tighter sm:text-[32px] md:text-[46px] mt-4">
            CONVERT CURRENCY
          </h3>
          <Convert />
        </div>
        <DotPattern
          className={cn(
            '[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]'
          )}
        />
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
