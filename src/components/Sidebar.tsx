import { Page } from "@/pages/Index";
import Icon from "@/components/ui/icon";

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const navItems = [
  { id: "feed" as Page, icon: "Layout", label: "Лента" },
  { id: "search" as Page, icon: "Search", label: "Поиск" },
  { id: "friends" as Page, icon: "Users", label: "Друзья" },
  { id: "messages" as Page, icon: "MessageCircle", label: "Сообщения" },
  { id: "notifications" as Page, icon: "Bell", label: "Уведомления" },
  { id: "profile" as Page, icon: "User", label: "Профиль" },
];

const Sidebar = ({ activePage, setActivePage }: SidebarProps) => {
  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 bg-white border-r border-[var(--border-light)] z-40">
      <div className="px-6 py-8">
        <span className="font-display text-xl font-bold text-[var(--text-primary)] tracking-tight">Связь</span>
      </div>

      <nav className="flex-1 px-3">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-200 text-left group
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

      <div className="px-3 pb-6">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[var(--bg-hover)] cursor-pointer transition-all">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--text-primary)] to-[var(--text-secondary)] flex items-center justify-center text-white text-xs font-bold">
            АС
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--text-primary)] font-body">Алексей С.</p>
            <p className="text-xs text-[var(--text-muted)] font-body">@alex_s</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
