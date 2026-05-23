import Icon from "@/components/ui/icon";

interface User {
  name: string;
  username: string;
  bio: string;
  location: string;
  posts: number;
  followers: number;
  following: number;
}

interface EditData {
  name: string;
  bio: string;
  location: string;
}

interface ProfileInfoProps {
  user: User;
  editing: boolean;
  editData: EditData;
  onEditDataChange: (data: EditData) => void;
  onSave: () => void;
  onCancelEdit: () => void;
  onStartEdit: () => void;
  onOpenBlockEditor: () => void;
}

export default function ProfileInfo({
  user,
  editing,
  editData,
  onEditDataChange,
  onSave,
  onCancelEdit,
  onStartEdit,
  onOpenBlockEditor,
}: ProfileInfoProps) {
  return (
    <div className="px-1 mb-5">
      {editing ? (
        <div className="space-y-2">
          <input
            value={editData.name}
            onChange={e => onEditDataChange({ ...editData, name: e.target.value })}
            className="w-full px-3 py-2.5 rounded-2xl border border-[var(--border-light)] text-base font-display font-bold bg-[var(--bg-card)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-blue)] transition-colors"
            placeholder="Имя"
          />
          <textarea
            value={editData.bio}
            onChange={e => onEditDataChange({ ...editData, bio: e.target.value })}
            className="w-full px-3 py-2.5 rounded-2xl border border-[var(--border-light)] text-sm font-body bg-[var(--bg-card)] text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent-blue)] resize-none transition-colors"
            rows={2}
            placeholder="О себе"
          />
          <input
            value={editData.location}
            onChange={e => onEditDataChange({ ...editData, location: e.target.value })}
            className="w-full px-3 py-2.5 rounded-2xl border border-[var(--border-light)] text-sm font-body bg-[var(--bg-card)] text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent-blue)] transition-colors"
            placeholder="Город"
          />
          <div className="flex gap-2">
            <button
              onClick={onSave}
              className="flex-1 py-2.5 bg-[var(--text-primary)] text-white rounded-2xl text-sm font-body font-medium hover:opacity-90 transition-opacity shadow-md"
            >
              Сохранить
            </button>
            <button
              onClick={onCancelEdit}
              className="px-4 py-2.5 glass-card rounded-2xl text-sm font-body text-[var(--text-secondary)]"
            >
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] leading-tight">{user.name}</h2>
              <p className="text-sm text-[var(--text-muted)] font-body mt-0.5">{user.username}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0 mt-1">
              <button
                onClick={onStartEdit}
                className="glass-card px-3.5 py-2 rounded-2xl text-sm font-body text-[var(--text-secondary)] flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors"
              >
                <Icon name="Pencil" size={13} /> Изменить
              </button>
              <button
                onClick={onOpenBlockEditor}
                className="glass-card px-3.5 py-2 rounded-2xl text-sm font-body text-[var(--text-secondary)] flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors"
              >
                <Icon name="LayoutGrid" size={13} /> Блоки
              </button>
            </div>
          </div>
          <p className="text-sm text-[var(--text-secondary)] font-body leading-relaxed mt-2 mb-2">{user.bio}</p>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1 text-xs text-[var(--text-muted)] font-body">
              <Icon name="MapPin" size={12} />
              <span>{user.location}</span>
            </div>
          </div>
        </>
      )}

      {/* Stats */}
      {!editing && (
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { label: "Публикаций",  value: user.posts },
            { label: "Подписчиков", value: user.followers },
            { label: "Подписок",    value: user.following },
          ].map(stat => (
            <div key={stat.label} className="glass-card rounded-2xl p-3 text-center">
              <p className="font-display text-xl font-bold text-[var(--text-primary)]">{stat.value.toLocaleString()}</p>
              <p className="text-[11px] text-[var(--text-muted)] font-body mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
