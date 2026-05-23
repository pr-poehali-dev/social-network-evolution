import { useState } from "react";
import { FRIENDS } from "@/data/mockData";
import Icon from "@/components/ui/icon";

type FriendStatus = "friend" | "request" | "suggestion";

interface Friend {
  id: string; name: string; username: string; mutual: number; status: FriendStatus; online: boolean;
}

const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

const FriendsPage = () => {
  const [friends, setFriends] = useState<Friend[]>(FRIENDS);
  const [activeTab, setActiveTab] = useState<"friends" | "requests" | "suggestions">("friends");

  const myFriends = friends.filter(f => f.status === "friend");
  const requests = friends.filter(f => f.status === "request");
  const suggestions = friends.filter(f => f.status === "suggestion");

  const acceptRequest = (id: string) => {
    setFriends(prev => prev.map(f => f.id === id ? { ...f, status: "friend" } : f));
  };

  const declineRequest = (id: string) => {
    setFriends(prev => prev.filter(f => f.id !== id));
  };

  const addFriend = (id: string) => {
    setFriends(prev => prev.map(f => f.id === id ? { ...f, status: "request" } : f));
  };

  const tabs = [
    { id: "friends" as const, label: "Друзья", count: myFriends.length },
    { id: "requests" as const, label: "Заявки", count: requests.length },
    { id: "suggestions" as const, label: "Знакомые", count: suggestions.length },
  ];

  const listMap = { friends: myFriends, requests, suggestions };
  const current = listMap[activeTab];

  return (
    <div className="mesh-bg min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-6">Друзья</h1>

        <div className="flex gap-1 mb-6 glass-card rounded-2xl p-1 transition-all duration-300">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 rounded-2xl text-sm font-body font-medium transition-all duration-200 flex items-center justify-center gap-1.5
                ${activeTab === tab.id
                  ? "bg-[var(--text-primary)] text-white"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? "bg-white/20 text-white" : "bg-[var(--bg-hover)] text-[var(--text-muted)]"}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {current.map(friend => (
            <div key={friend.id} className="glass-card rounded-3xl p-4 flex items-center gap-4 animate-fade-in transition-all duration-300">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-500 to-gray-300 flex items-center justify-center text-white font-bold text-sm font-display">
                  {getInitials(friend.name)}
                </div>
                {friend.online && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-body font-semibold text-sm text-[var(--text-primary)] truncate">{friend.name}</p>
                <p className="font-body text-xs text-[var(--text-muted)] truncate">{friend.username}</p>
                <p className="font-body text-xs text-[var(--text-muted)] mt-0.5">{friend.mutual} общих друга</p>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                {activeTab === "friends" && (
                  <>
                    <button className="w-9 h-9 rounded-xl bg-[var(--bg-hover)] border border-[var(--border-light)] flex items-center justify-center hover:bg-[var(--bg-base)] transition-colors text-[var(--text-secondary)]">
                      <Icon name="MessageCircle" size={15} />
                    </button>
                    <button className="w-9 h-9 rounded-xl bg-[var(--bg-hover)] border border-[var(--border-light)] flex items-center justify-center hover:bg-[var(--bg-base)] transition-colors text-[var(--text-secondary)]">
                      <Icon name="Phone" size={15} />
                    </button>
                  </>
                )}
                {activeTab === "requests" && (
                  <>
                    <button
                      onClick={() => acceptRequest(friend.id)}
                      className="px-3 py-1.5 bg-[var(--text-primary)] text-white rounded-2xl text-xs font-body font-medium hover:opacity-90 transition-opacity"
                    >
                      Принять
                    </button>
                    <button
                      onClick={() => declineRequest(friend.id)}
                      className="w-8 h-8 rounded-xl bg-[var(--bg-hover)] border border-[var(--border-light)] flex items-center justify-center hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors text-[var(--text-muted)]"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </>
                )}
                {activeTab === "suggestions" && (
                  <button
                    onClick={() => addFriend(friend.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-[var(--border-light)] text-[var(--text-secondary)] rounded-2xl text-xs font-body hover:bg-[var(--bg-hover)] transition-colors"
                  >
                    <Icon name="UserPlus" size={13} />
                    Добавить
                  </button>
                )}
              </div>
            </div>
          ))}

          {current.length === 0 && (
            <div className="text-center py-16 text-[var(--text-muted)] font-body text-sm">
              <Icon name="Users" size={32} className="mx-auto mb-3 opacity-30" />
              <p>Здесь пока пусто</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
