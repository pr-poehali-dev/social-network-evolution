import { Page } from "@/pages/Index";
import Icon from "@/components/ui/icon";

interface MobileNavProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const navItems = [
  { id: "feed"        as Page, icon: "Layout" },
  { id: "search"      as Page, icon: "Search" },
  { id: "communities" as Page, icon: "Globe" },
  { id: "music"       as Page, icon: "Music" },
  { id: "messages"    as Page, icon: "MessageCircle", badge: true },
  { id: "profile"     as Page, icon: "User" },
];

const MobileNav = ({ activePage, setActivePage }: MobileNavProps) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-bottom px-3 py-2 transition-all duration-300">
      <div className="flex justify-around max-w-sm mx-auto">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className="relative flex flex-col items-center p-2 rounded-2xl transition-all duration-200"
            >
              <div className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-200
                ${isActive
                  ? "bg-[var(--text-primary)] text-white shadow-md scale-105"
                  : "text-[var(--text-muted)]"
                }`}
              >
                <Icon name={item.icon} size={18} />
              </div>
              {item.badge && !isActive && (
                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[var(--accent-red)]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
