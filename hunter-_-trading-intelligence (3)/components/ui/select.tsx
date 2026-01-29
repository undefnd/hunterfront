
import React from 'react';
import { cn } from '../../lib/utils';

export const Select = ({ children, value, onValueChange }: any) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full" onClick={() => setIsOpen(!isOpen)}>
      {React.Children.map(children, child => {
        if (child.type === SelectTrigger) return React.cloneElement(child, { value });
        if (child.type === SelectContent && isOpen) return React.cloneElement(child, { onValueChange, setIsOpen });
        return null;
      })}
    </div>
  );
};

export const SelectTrigger = ({ className, value, children }: any) => (
  <div className={cn("flex h-9 w-full items-center justify-between rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground cursor-pointer hover:bg-white/10", className)}>
    <span>{value || children}</span>
  </div>
);

export const SelectValue = ({ placeholder }: any) => <span>{placeholder}</span>;

export const SelectContent = ({ children, onValueChange, setIsOpen }: any) => (
  <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-white/10 bg-zinc-950 p-1 shadow-xl">
    {React.Children.map(children, child => React.cloneElement(child, { onClick: (val: string) => { onValueChange(val); setIsOpen(false); } }))}
  </div>
);

export const SelectItem = ({ value, children, onClick }: any) => (
  <div onClick={() => onClick(value)} className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-white/10 text-foreground">
    {children}
  </div>
);
