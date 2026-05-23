import { Page } from "@/pages/Index";
import Icon from "@/components/ui/icon";

interface MobileNavProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const navItems = [
  { id: "feed" as Page, icon: "Layout" },
  { id: "search" as Page, icon: "Search" },
  { id: "music" as Page, icon: "Music" },
  { id: "communities" as Page, icon: "Globe" },
  { id: "messages" as Page, icon: "MessageCircle" },
  { id: "profile" as Page, icon: "User" },
];

const MobileNav = ({ activePage, setActivePage }: MobileNavProps) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--bg-card)] border-t border-[var(--border-light)] z-40 px-2 py-2 transition-colors duration-300">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 relative
                ${isActive ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}`}
            >
              <Icon name={item.icon} size={20} />
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[var(--text-primary)]"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
