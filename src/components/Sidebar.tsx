import { Page } from "@/pages/Index";
import Icon from "@/components/ui/icon";

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const navItems = [
  { id: "feed" as Page, icon: "Layout", label: "Лента" },
  { id: "search" as Page, icon: "Search", label: "Поиск" },
  { id: "friends" as Page, icon: "Users", label: "Друзья" },
  { id: "messages" as Page, icon: "MessageCircle", label: "Сообщения" },
  { id: "music" as Page, icon: "Music", label: "Музыка" },
  { id: "communities" as Page, icon: "Globe", label: "Сообщества" },
  { id: "notifications" as Page, icon: "Bell", label: "Уведомления" },
  { id: "profile" as Page, icon: "User", label: "Профиль" },
];

const Sidebar = ({ activePage, setActivePage, theme, toggleTheme }: SidebarProps) => {
  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 bg-[var(--bg-card)] border-r border-[var(--border-light)] z-40 transition-colors duration-300">
      <div className="px-6 py-7 flex items-center justify-between">
        <span className="font-display text-xl font-bold text-[var(--text-primary)] tracking-tight">Полка</span>
        <button
          onClick={toggleTheme}
          className="w-8 h-8 rounded-xl bg-[var(--bg-hover)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all"
          title={theme === "light" ? "Тёмная тема" : "Светлая тема"}
        >
          <Icon name={theme === "light" ? "Moon" : "Sun"} size={15} />
        </button>
      </div>

      <nav className="flex-1 px-3 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-200 text-left
                ${isActive
                  ? "bg-[var(--text-primary)] text-white"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
                }`}
            >
              <Icon name={item.icon} size={18} />
              <span className="font-body text-sm font-medium">{item.label}</span>
              {item.id === "notifications" && (
                <span className="ml-auto w-2 h-2 rounded-full bg-[var(--accent-red)]"></span>
              )}
              {item.id === "messages" && (
                <span className="ml-auto w-2 h-2 rounded-full bg-[var(--accent-red)]"></span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-3 pb-5">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[var(--bg-hover)] cursor-pointer transition-all">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--text-primary)] to-[var(--text-secondary)] flex items-center justify-center text-white text-xs font-bold">
            АС
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[var(--text-primary)] font-body truncate">Алексей С.</p>
            <p className="text-xs text-[var(--text-muted)] font-body">@alex_s</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
