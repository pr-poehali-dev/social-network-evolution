import { Page } from "@/pages/Index";
import Icon from "@/components/ui/icon";

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const navItems = [
  { id: "feed"          as Page, icon: "Layout",        label: "Лента" },
  { id: "search"        as Page, icon: "Search",        label: "Поиск" },
  { id: "friends"       as Page, icon: "Users",         label: "Друзья" },
  { id: "messages"      as Page, icon: "MessageCircle", label: "Сообщения", badge: true },
  { id: "music"         as Page, icon: "Music",         label: "Музыка" },
  { id: "communities"   as Page, icon: "Globe",         label: "Сообщества" },
  { id: "notifications" as Page, icon: "Bell",          label: "Уведомления", badge: true },
  { id: "profile"       as Page, icon: "User",          label: "Профиль" },
];

const Sidebar = ({ activePage, setActivePage, theme, toggleTheme }: SidebarProps) => {
  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 z-40 glass-nav transition-all duration-300">
      <div className="px-5 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[var(--text-primary)] flex items-center justify-center shadow-md">
            <span className="font-display text-[10px] font-bold" style={{ color: 'var(--bg-base)' }}>П</span>
          </div>
          <span className="font-display text-lg font-bold text-[var(--text-primary)] tracking-tight">Полка</span>
        </div>
        <button
          onClick={toggleTheme}
          title={theme === "light" ? "Тёмная тема" : "Светлая тема"}
          className="w-8 h-8 rounded-xl glass flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all hover:scale-105"
        >
          <Icon name={theme === "light" ? "Moon" : "Sun"} size={14} />
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl transition-all duration-200 text-left
                ${isActive
                  ? "nav-active"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
                }`}
            >
              <Icon name={item.icon} size={17} />
              <span className="font-body text-sm font-medium">{item.label}</span>
              {item.badge && !isActive && (
                <span className="ml-auto w-2 h-2 rounded-full bg-[var(--accent-red)]" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-3 pb-5 pt-3 border-t border-[var(--border-light)]">
        <button
          onClick={() => setActivePage("profile")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-[var(--bg-hover)] transition-all"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#4a4a8a] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md">
            АС
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-semibold text-[var(--text-primary)] font-body truncate">Алексей С.</p>
            <p className="text-xs text-[var(--text-muted)] font-body">@alex_s</p>
          </div>
          <Icon name="ChevronRight" size={14} className="text-[var(--text-muted)] flex-shrink-0" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
