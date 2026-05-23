import { useState } from "react";
import { POSTS, FRIENDS } from "@/data/mockData";
import Icon from "@/components/ui/icon";

const tags = ["Минимализм", "Фотография", "Архитектура", "Дизайн", "Путешествия", "Еда", "Природа", "Арт"];

const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredPeople = FRIENDS.filter(f =>
    !query || f.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPosts = POSTS.filter(p =>
    !query || p.caption.toLowerCase().includes(query.toLowerCase()) ||
    (activeTag && p.tags.some(t => t.toLowerCase().includes(activeTag.toLowerCase())))
  );

  const showPeople = query.length > 0;
  const showPosts = query.length === 0 || filteredPosts.length > 0;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-5">Поиск</h1>

      <div className="flex items-center gap-2 px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-light)] rounded-2xl mb-5 focus-within:border-[var(--text-primary)] transition-colors">
        <Icon name="Search" size={16} className="text-[var(--text-muted)]" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Люди, посты, теги..."
          className="flex-1 bg-transparent text-sm font-body text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
        />
        {query && (
          <button onClick={() => setQuery("")} className="text-[var(--text-muted)] hover:text-[var(--text-secondary)]">
            <Icon name="X" size={14} />
          </button>
        )}
      </div>

      {!query && (
        <div className="mb-6">
          <p className="text-xs font-body font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Популярные теги</p>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`px-3 py-1.5 rounded-full text-sm font-body transition-all duration-200
                  ${activeTag === tag
                    ? "bg-[var(--text-primary)] text-white"
                    : "bg-[var(--bg-card)] border border-[var(--border-light)] text-[var(--text-secondary)] hover:border-[var(--text-secondary)]"
                  }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {showPeople && filteredPeople.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-body font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Люди</p>
          <div className="space-y-2">
            {filteredPeople.slice(0, 3).map(person => (
              <div key={person.id} className="flex items-center gap-3 p-3 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-light)] hover:shadow-sm transition-all cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-500 to-gray-300 flex items-center justify-center text-white font-bold text-sm font-display">
                  {getInitials(person.name)}
                </div>
                <div className="flex-1">
                  <p className="font-body font-semibold text-sm text-[var(--text-primary)]">{person.name}</p>
                  <p className="font-body text-xs text-[var(--text-muted)]">{person.username} · {person.mutual} общих</p>
                </div>
                <button className="text-xs font-body text-[var(--text-secondary)] border border-[var(--border-light)] px-3 py-1.5 rounded-xl hover:bg-[var(--bg-hover)] transition-colors">
                  Добавить
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showPosts && (
        <div>
          {!query && <p className="text-xs font-body font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
            {activeTag ? `#${activeTag}` : "Рекомендуем"}
          </p>}
          {query && <p className="text-xs font-body font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Посты</p>}
          <div className="grid grid-cols-3 gap-2">
            {(activeTag ? POSTS.filter(p => p.tags.some(t => t.toLowerCase().includes(activeTag!.toLowerCase()))) : POSTS).map(post => (
              <div key={post.id} className="aspect-square rounded-xl overflow-hidden group cursor-pointer relative">
                <img src={post.image} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex items-center gap-2 text-white text-xs">
                    <Icon name="Heart" size={13} />
                    <span className="font-body">{post.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
