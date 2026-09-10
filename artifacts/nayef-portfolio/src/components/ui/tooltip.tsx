import * as React from 'react';

const TooltipProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
const Tooltip: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
const TooltipTrigger: React.FC<{ children?: React.ReactNode; asChild?: boolean }> = ({ children }) => <>{children}</>;
const TooltipContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <div ref={ref} {...props} />
));
TooltipContent.displayName = 'TooltipContent';

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
