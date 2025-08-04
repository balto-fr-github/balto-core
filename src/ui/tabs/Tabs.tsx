import { cn } from "../../utils/cn";
import { Tab } from "./Tab";

export type TabData = {
  id: string;
  label: string;
  disabled?: boolean;
  className?: string;
};

export type TabsProps = {
  tabs: TabData[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
};

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className,
}) => {
  const handleTabClick = (tabId: string) => {
    if (tabId === activeTab) return;

    onTabChange(tabId);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          label={tab.label}
          isActive={activeTab === tab.id}
          onClick={() => handleTabClick(tab.id)}
          disabled={tab.disabled}
          className={tab.className}
        />
      ))}
    </div>
  );
};
