import { useState } from "react";
import { CURRENT_USER, POSTS } from "@/data/mockData";
import Icon from "@/components/ui/icon";

const ProfilePage = () => {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(CURRENT_USER);
  const [editData, setEditData] = useState({ name: user.name, bio: user.bio, location: user.location });
  const [activeTab, setActiveTab] = useState<"posts" | "saved">("posts");

  const saveProfile = () => {
    setUser(prev => ({ ...prev, ...editData }));
    setEditing(false);
  };

  const myPosts = POSTS.slice(0, 3);
  const savedPosts = POSTS.filter(p => p.saved);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Профиль</h1>
        <button
          onClick={() => setEditing(!editing)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border-light)] text-sm font-body text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
        >
          <Icon name={editing ? "X" : "Pencil"} size={14} />
          {editing ? "Отмена" : "Редактировать"}
        </button>
      </div>

      <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-light)] p-6 mb-5">
        <div className="flex items-start gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-400 flex items-center justify-center text-white text-2xl font-bold font-display">
              АС
            </div>
            {editing && (
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-[var(--text-primary)] rounded-full flex items-center justify-center text-white shadow-md">
                <Icon name="Camera" size={12} />
              </button>
            )}
          </div>

          <div className="flex-1">
            {editing ? (
              <div className="space-y-2">
                <input
                  value={editData.name}
                  onChange={e => setEditData(d => ({ ...d, name: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border-light)] text-sm font-body bg-[var(--bg-base)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)]"
                  placeholder="Имя"
                />
                <textarea
                  value={editData.bio}
                  onChange={e => setEditData(d => ({ ...d, bio: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border-light)] text-sm font-body bg-[var(--bg-base)] text-[var(--text-secondary)] focus:outline-none focus:border-[var(--text-primary)] resize-none"
                  rows={2}
                  placeholder="О себе"
                />
                <input
                  value={editData.location}
                  onChange={e => setEditData(d => ({ ...d, location: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border-light)] text-sm font-body bg-[var(--bg-base)] text-[var(--text-secondary)] focus:outline-none focus:border-[var(--text-primary)]"
                  placeholder="Город"
                />
                <button
                  onClick={saveProfile}
                  className="w-full py-2 bg-[var(--text-primary)] text-white rounded-xl text-sm font-body font-medium hover:opacity-90 transition-opacity"
                >
                  Сохранить
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-display text-xl font-bold text-[var(--text-primary)] mb-1">{user.name}</h2>
                <p className="text-sm text-[var(--text-muted)] font-body mb-2">{user.username}</p>
                <p className="text-sm text-[var(--text-secondary)] font-body leading-relaxed mb-2">{user.bio}</p>
                <div className="flex items-center gap-1 text-xs text-[var(--text-muted)] font-body">
                  <Icon name="MapPin" size={12} />
                  <span>{user.location}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {!editing && (
          <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-[var(--border-light)]">
            {[
              { label: "Публикаций", value: user.posts },
              { label: "Подписчиков", value: user.followers },
              { label: "Подписок", value: user.following },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-xl font-bold text-[var(--text-primary)]">{stat.value.toLocaleString()}</p>
                <p className="text-xs text-[var(--text-muted)] font-body">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-1 mb-5 bg-[var(--bg-card)] rounded-xl p-1 border border-[var(--border-light)]">
        {(["posts", "saved"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-lg text-sm font-body font-medium transition-all duration-200
              ${activeTab === tab
                ? "bg-[var(--text-primary)] text-white"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
          >
            {tab === "posts" ? "Публикации" : "Сохранённые"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {(activeTab === "posts" ? myPosts : savedPosts).map(post => (
          <div key={post.id} className="aspect-square rounded-xl overflow-hidden group cursor-pointer relative">
            <img src={post.image} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex items-center gap-2 text-white text-xs font-body">
                <Icon name="Heart" size={14} />
                <span>{post.likes}</span>
              </div>
            </div>
          </div>
        ))}
        {(activeTab === "posts" ? myPosts : savedPosts).length === 0 && (
          <div className="col-span-3 text-center py-12 text-[var(--text-muted)] font-body text-sm">
            Пока ничего нет
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
