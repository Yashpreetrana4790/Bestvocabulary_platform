'use client';

import { TooltipProvider } from '@/components/ui/tooltip';

export function TooltipProviderWrapper({ children }) {
  return (
    <TooltipProvider delayDuration={300} skipDelayDuration={0}>
      {children}
    </TooltipProvider>
  );
}
