import React from "react";
import { Keyboard, X } from "lucide-react";

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: "H", desc: "Activate Pan tool on image canvas" },
    { key: "B", desc: "Activate Inspect region selection tool" },
    { key: "F", desc: "Fit satellite image to current canvas viewport" },
    { key: "R", desc: "Reset canvas zoom and pan offsets to 100%" },
    { key: "L", desc: "Toggle layers panel and opacity controls" },
    { key: "+ / -", desc: "Incrementally zoom viewport in or out" },
    { key: "← / →", desc: "Scrub Temporal Comparison slider divider (1% step)" },
    { key: "Home / End", desc: "Jump Temporal slider to 0% (Before) or 100% (After)" },
    { key: "Esc", desc: "Close dialog or dismiss popovers" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 select-none">
      <div className="w-full max-w-md bg-surface-raised border border-border-contrast rounded-xs shadow-2xl p-4 flex flex-col gap-4 text-xs font-sans">
        <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-accent" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-content-primary">
              Workstation Keyboard Shortcuts
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xs hover:bg-surface-hover text-content-muted hover:text-content-primary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col divide-y divide-border-subtle">
          {shortcuts.map((s, idx) => (
            <div
              key={idx}
              className="py-2 flex items-center justify-between text-xs"
            >
              <span className="text-content-secondary">{s.desc}</span>
              <kbd className="px-2 py-0.5 rounded-xs bg-surface border border-border-contrast font-mono text-accent font-semibold text-[11px]">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-border-subtle flex justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-xs bg-surface hover:bg-surface-hover border border-border-contrast text-content-primary font-mono text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
