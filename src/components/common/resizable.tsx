import * as React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { GripVertical, GripHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export const ResizablePanelGroup = React.forwardRef<
  React.ElementRef<typeof PanelGroup>,
  React.ComponentPropsWithoutRef<typeof PanelGroup>
>(({ className, ...props }, ref) => (
  <PanelGroup
    ref={ref}
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
));
ResizablePanelGroup.displayName = "ResizablePanelGroup";

export const ResizablePanel = React.forwardRef<
  React.ElementRef<typeof Panel>,
  React.ComponentPropsWithoutRef<typeof Panel>
>(({ className, ...props }, ref) => (
  <Panel ref={ref} className={cn("overflow-hidden", className)} {...props} />
));
ResizablePanel.displayName = "ResizablePanel";

export const ResizableHandle = ({
  withHandle = false,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <PanelResizeHandle
    className={cn(
      "relative flex w-[1px] items-center justify-center bg-border-subtle transition-colors duration-150",
      "hover:bg-accent hover:w-[2px] focus-visible:bg-accent focus-visible:outline-none",
      "data-[panel-group-direction=vertical]:h-[1px] data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:hover:h-[2px]",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-5 w-3 items-center justify-center rounded-xs border border-border-contrast bg-surface-raised shadow-none text-content-muted hover:text-accent">
        <GripVertical className="h-3 w-3" />
      </div>
    )}
  </PanelResizeHandle>
);
ResizableHandle.displayName = "ResizableHandle";
