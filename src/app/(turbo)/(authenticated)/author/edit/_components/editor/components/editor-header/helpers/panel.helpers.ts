import { ImperativePanelHandle } from "react-resizable-panels";

type TogglePanel = (panel: ImperativePanelHandle) => void;
export const togglePanel: TogglePanel = (panel) => panel.isCollapsed()
    ? panel.expand()
    : panel.collapse();
