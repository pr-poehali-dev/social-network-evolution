import { useState } from "react";
import { NOTIFICATIONS } from "@/data/mockData";
import Icon from "@/components/ui/icon";

const iconMap: Record<string, string> = {
  like: "Heart",
  comment: "MessageCircle",
  friend: "UserPlus",
  save: "Bookmark",
};

const colorMap: Record<string, string> = {
  like: "text-red-400 bg-red-50",
  comment: "text-blue-400 bg-blue-50",
  friend: "text-green-400 bg-green-50",
  save: "text-amber-400 bg-amber-50",
};

const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unread = notifications.filter(n => !n.read);

  return (
    <div className="mesh-bg min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Уведомления</h1>
            {unread.length > 0 && (
              <p className="text-xs font-body text-[var(--text-muted)] mt-0.5">{unread.length} непрочитанных</p>
            )}
          </div>
          {unread.length > 0 && (
            <button
              onClick={markAllRead}
              className="text-xs font-body text-[var(--text-secondary)] border border-[var(--border-light)] px-3 py-1.5 rounded-xl hover:bg-[var(--bg-hover)] transition-colors"
            >
              Прочитать все
            </button>
          )}
        </div>

        {unread.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-body font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Новые</p>
            <div className="space-y-2">
              {unread.map(n => (
                <NotifCard key={n.id} n={n} />
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="text-xs font-body font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Ранее</p>
          <div className="space-y-2">
            {notifications.filter(n => n.read).map(n => (
              <NotifCard key={n.id} n={n} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const NotifCard = ({ n }: { n: { id: string; type: string; user: string; text: string; time: string; read: boolean } }) => (
  <div className={`flex items-center gap-3 p-4 rounded-3xl border transition-all duration-300 animate-fade-in
    ${!n.read ? "glass-card shadow-sm" : "bg-transparent border-transparent hover:bg-[var(--bg-hover)]"}`}>
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${colorMap[n.type] || "text-gray-400 bg-gray-50"}`}>
      <Icon name={iconMap[n.type] || "Bell"} size={16} />
    </div>
    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gray-500 to-gray-300 flex items-center justify-center text-white text-xs font-bold font-display flex-shrink-0">
      {getInitials(n.user)}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-body text-[var(--text-primary)] leading-snug">
        <span className="font-semibold">{n.user}</span>{" "}
        <span className="text-[var(--text-secondary)]">{n.text}</span>
      </p>
      <p className="text-xs font-body text-[var(--text-muted)] mt-0.5">{n.time} назад</p>
    </div>
    {!n.read && (
      <span className="w-2 h-2 rounded-full bg-[var(--text-primary)] flex-shrink-0"></span>
    )}
  </div>
);

export default NotificationsPage;
