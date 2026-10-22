import React, { useState } from "react";
import { WorkstationProvider, useWorkstation } from "@/context/WorkstationContext";
import { NavigationRail } from "@/components/layout/NavigationRail";
import { TopStatusBar } from "@/components/layout/TopStatusBar";
import { LandingPage } from "@/pages/LandingPage";
import { CaptionReviewPage } from "@/pages/CaptionReviewPage";
import { SingleImageWorkstationPage } from "@/pages/SingleImageWorkstationPage";
import { SceneGraphPage } from "@/pages/SceneGraphPage";
import { TemporalComparisonPage } from "@/pages/TemporalComparisonPage";
import { HistoryPage } from "@/pages/HistoryPage";
import { ExperimentsPage } from "@/pages/ExperimentsPage";
import { KeyboardShortcutsModal } from "@/components/common/KeyboardShortcutsModal";

const WorkstationMainContent: React.FC = () => {
  const { activePage } = useWorkstation();
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  // When on landing page, display the full-bleed cosmic landing interface
  if (activePage === "landing") {
    return <LandingPage />;
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-workstation">
      {/* 40px Top Status Bar */}
      <TopStatusBar onOpenShortcuts={() => setIsShortcutsOpen(true)} />

      {/* Main Docked Area: Nav Rail + Active Page */}
      <div className="flex-1 flex flex-row overflow-hidden">
        <NavigationRail />

        <main className="flex-1 flex flex-col h-full overflow-hidden">
          {activePage === "caption-review" && <CaptionReviewPage />}
          {activePage === "single-image" && <SingleImageWorkstationPage />}
          {activePage === "scene-graph" && <SceneGraphPage />}
          {activePage === "temporal-compare" && <TemporalComparisonPage />}
          {activePage === "history" && <HistoryPage />}
          {activePage === "experiments" && <ExperimentsPage />}
        </main>
      </div>

      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <WorkstationProvider>
      <WorkstationMainContent />
    </WorkstationProvider>
  );
}

export default App;
