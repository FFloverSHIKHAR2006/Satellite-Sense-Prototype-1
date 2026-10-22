import React, { useState } from "react";
import {
  ListChecks,
  Compass,
  GitBranch,
  SplitSquareVertical,
  Clock,
  FlaskConical,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  Cpu,
} from "lucide-react";
import { RadarReticleLogo } from "@/components/common/RadarReticleLogo";
import { useWorkstation, WorkstationPage } from "@/context/WorkstationContext";
import { cn } from "@/lib/utils";

interface NavItem {
  id: WorkstationPage;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

export const NavigationRail: React.FC = () => {
  const { activePage, setActivePage } = useWorkstation();
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems: NavItem[] = [
    {
      id: "landing",
      label: "Cosmic Portal",
      icon: Sparkles,
      badge: "LIVE",
    },
    {
      id: "caption-review",
      label: "Caption Review",
      icon: ListChecks,
      badge: "5A",
    },
    {
      id: "single-image",
      label: "Workstation",
      icon: Compass,
    },
    {
      id: "scene-graph",
      label: "Scene Graph",
      icon: GitBranch,
    },
    {
      id: "temporal-compare",
      label: "Temporal Compare",
      icon: SplitSquareVertical,
    },
    {
      id: "history",
      label: "History",
      icon: Clock,
    },
    {
      id: "experiments",
      label: "Experiments",
      icon: FlaskConical,
    },
  ];

  return (
    <aside
      className={cn(
        "h-full bg-panel border-r border-border-subtle flex flex-col justify-between transition-all duration-200 z-30 select-none",
        isExpanded ? "w-52" : "w-12"
      )}
    >
      {/* Brand Icon & Title */}
      <div className="flex flex-col">
        <div className="h-10 flex items-center px-3 border-b border-border-subtle gap-2.5 overflow-hidden">
          <RadarReticleLogo size={22} showSweep={true} />
          {isExpanded && (
            <span className="font-mono text-xs font-semibold tracking-wider text-content-primary whitespace-nowrap">
              SATELLITESENSE
            </span>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col py-2 gap-1 px-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={cn(
                  "relative flex items-center h-9 rounded-xs transition-colors group",
                  isExpanded ? "px-2.5 gap-3" : "justify-center px-0",
                  isActive
                    ? "bg-surface-raised text-accent border border-border-contrast"
                    : "text-content-secondary hover:text-content-primary hover:bg-surface-hover"
                )}
                title={!isExpanded ? item.label : undefined}
                aria-label={item.label}
              >
                {isActive && (
                  <span className="absolute left-0 top-1 bottom-1 w-0.5 bg-accent rounded-r-xs" />
                )}
                <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-accent" : "text-content-secondary group-hover:text-content-primary")} />

                {isExpanded && (
                  <span className="text-xs font-medium truncate flex-1 text-left">
                    {item.label}
                  </span>
                )}

                {isExpanded && item.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-xs bg-accent/20 text-accent border border-accent/40">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Rail Collapse Toggle */}
      <div className="p-1 border-t border-border-subtle">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "w-full h-8 flex items-center rounded-xs text-content-secondary hover:text-content-primary hover:bg-surface-hover transition-colors",
            isExpanded ? "px-2.5 gap-2 text-xs" : "justify-center"
          )}
          title={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {isExpanded ? (
            <>
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px]">Collapse</span>
            </>
          ) : (
            <ChevronRight className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </aside>
  );
};
