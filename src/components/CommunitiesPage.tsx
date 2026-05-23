import { useState } from "react";
import { COMMUNITIES, CATEGORIES } from "@/data/communitiesData";
import Icon from "@/components/ui/icon";

type View = "list" | "community";

const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

const CommunitiesPage = () => {
  const [communities, setCommunities] = useState(COMMUNITIES);
  const [view, setView] = useState<View>("list");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tab, setTab] = useState<"all" | "mine">("all");
  const [category, setCategory] = useState("Все");
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState<Record<string, { id: string; user: string; text: string; likes: number; comments: number; time: string; image: null; liked: boolean }[]>>({});
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const selected = communities.find(c => c.id === selectedId);

  const toggleJoin = (id: string) => {
    setCommunities(prev => prev.map(c => c.id === id ? { ...c, joined: !c.joined, members: c.joined ? c.members - 1 : c.members + 1 } : c));
  };

  const openCommunity = (id: string) => { setSelectedId(id); setView("community"); };
  const goBack = () => { setView("list"); setSelectedId(null); };

  const submitPost = (communityId: string) => {
    if (!newPost.trim()) return;
    const post = { id: `up-${Date.now()}`, user: "Алексей С.", text: newPost, likes: 0, comments: 0, time: "Сейчас", image: null, liked: false };
    setPosts(prev => ({ ...prev, [communityId]: [post, ...(prev[communityId] || [])] }));
    setNewPost("");
  };

  const toggleLikePost = (postId: string) => {
    setLikedPosts(prev => {
      const next = new Set(prev);
      if (next.has(postId)) { next.delete(postId); } else { next.add(postId); }
      return next;
    });
  };

  const filtered = communities.filter(c =>
    (tab === "all" || c.joined) &&
    (category === "Все" || c.category === category)
  );

  if (view === "community" && selected) {
    const allPosts = [...(posts[selected.id] || []), ...selected.posts];
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <button onClick={goBack} className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-5 font-body text-sm">
          <Icon name="ArrowLeft" size={16} />
          Назад
        </button>

        <div className="relative h-36 rounded-2xl overflow-hidden mb-5">
          <img src={selected.cover} alt={selected.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <p className="font-display font-bold text-white text-lg">{selected.name}</p>
              <p className="text-white/70 text-xs font-body">{selected.members.toLocaleString()} участников · {selected.category}</p>
            </div>
            <button
              onClick={() => toggleJoin(selected.id)}
              className={`px-4 py-2 rounded-xl text-sm font-body font-medium transition-all
                ${selected.joined
                  ? "bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm"
                  : "bg-white text-[var(--text-primary)] hover:opacity-90"
                }`}
            >
              {selected.joined ? "Вы участник" : "Вступить"}
            </button>
          </div>
        </div>

        <p className="text-sm font-body text-[var(--text-secondary)] mb-5">{selected.description}</p>

        {selected.joined && (
          <div className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-2xl p-4 mb-5">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                АС
              </div>
              <div className="flex-1">
                <textarea
                  value={newPost}
                  onChange={e => setNewPost(e.target.value)}
                  placeholder="Поделитесь чем-нибудь с сообществом..."
                  className="w-full bg-[var(--bg-base)] border border-[var(--border-light)] rounded-xl px-3 py-2 text-sm font-body text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--text-primary)] resize-none transition-colors"
                  rows={2}
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => submitPost(selected.id)}
                    disabled={!newPost.trim()}
                    className="px-4 py-1.5 bg-[var(--text-primary)] text-white rounded-xl text-sm font-body font-medium disabled:opacity-40 hover:opacity-90 transition-opacity"
                  >
                    Опубликовать
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {allPosts.length === 0 && (
            <div className="text-center py-12 text-[var(--text-muted)] font-body text-sm">
              <Icon name="FileText" size={32} className="mx-auto mb-3 opacity-20" />
              <p>Пока нет публикаций</p>
            </div>
          )}
          {allPosts.map((post: typeof allPosts[0]) => (
            <div key={post.id} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-2xl p-4 animate-fade-in">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gray-500 to-gray-300 flex items-center justify-center text-white text-xs font-bold font-display">
                  {getInitials(post.user)}
                </div>
                <div>
                  <p className="text-sm font-body font-semibold text-[var(--text-primary)]">{post.user}</p>
                  <p className="text-xs font-body text-[var(--text-muted)]">{post.time}</p>
                </div>
              </div>
              <p className="text-sm font-body text-[var(--text-secondary)] leading-relaxed mb-3">{post.text}</p>
              {post.image && (
                <div className="rounded-xl overflow-hidden mb-3 h-48">
                  <img src={post.image} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex items-center gap-4 pt-2 border-t border-[var(--border-light)]">
                <button onClick={() => toggleLikePost(post.id)}
                  className={`flex items-center gap-1.5 text-xs font-body transition-colors
                    ${likedPosts.has(post.id) ? "text-[var(--accent-red)]" : "text-[var(--text-muted)] hover:text-[var(--accent-red)]"}`}>
                  <Icon name="Heart" size={14} className={likedPosts.has(post.id) ? "fill-current" : ""} />
                  <span>{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                </button>
                <button className="flex items-center gap-1.5 text-xs font-body text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                  <Icon name="MessageCircle" size={14} />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center gap-1.5 text-xs font-body text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors ml-auto">
                  <Icon name="Share2" size={14} />
                  Поделиться
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Сообщества</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--text-primary)] text-white rounded-xl text-sm font-body font-medium hover:opacity-90 transition-opacity">
          <Icon name="Plus" size={14} />
          Создать
        </button>
      </div>

      <div className="flex gap-1 mb-5 bg-[var(--bg-card)] rounded-xl p-1 border border-[var(--border-light)]">
        <button onClick={() => setTab("all")}
          className={`flex-1 py-2 rounded-lg text-sm font-body font-medium transition-all ${tab === "all" ? "bg-[var(--text-primary)] text-white" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>
          Все
        </button>
        <button onClick={() => setTab("mine")}
          className={`flex-1 py-2 rounded-lg text-sm font-body font-medium transition-all ${tab === "mine" ? "bg-[var(--text-primary)] text-white" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>
          Мои ({communities.filter(c => c.joined).length})
        </button>
      </div>

      <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-body whitespace-nowrap transition-all duration-200
              ${category === cat
                ? "bg-[var(--text-primary)] text-white"
                : "bg-[var(--bg-card)] border border-[var(--border-light)] text-[var(--text-secondary)] hover:border-[var(--text-secondary)]"
              }`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(c => (
          <div key={c.id} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-2xl overflow-hidden hover:shadow-md transition-all animate-fade-in">
            <div className="flex gap-4 p-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer" onClick={() => openCommunity(c.id)}>
                <img src={c.cover} alt={c.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 cursor-pointer" onClick={() => openCommunity(c.id)}>
                    <p className="font-body font-semibold text-sm text-[var(--text-primary)] truncate">{c.name}</p>
                    <p className="font-body text-xs text-[var(--text-muted)] mb-1">{c.members.toLocaleString()} участников · {c.category}</p>
                    <p className="font-body text-xs text-[var(--text-secondary)] line-clamp-2">{c.description}</p>
                  </div>
                  <button
                    onClick={() => toggleJoin(c.id)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-body font-medium transition-all
                      ${c.joined
                        ? "bg-[var(--bg-hover)] text-[var(--text-secondary)] border border-[var(--border-light)] hover:border-red-300 hover:text-red-500"
                        : "bg-[var(--text-primary)] text-white hover:opacity-90"
                      }`}
                  >
                    {c.joined ? "Вы в сообществе" : "Вступить"}
                  </button>
                </div>
              </div>
            </div>
            {c.posts.length > 0 && (
              <div className="border-t border-[var(--border-light)] px-4 py-2.5 flex items-center justify-between cursor-pointer hover:bg-[var(--bg-hover)] transition-colors" onClick={() => openCommunity(c.id)}>
                <p className="text-xs font-body text-[var(--text-muted)]">
                  Последнее: <span className="text-[var(--text-secondary)]">{c.posts[0].text.slice(0, 40)}...</span>
                </p>
                <Icon name="ChevronRight" size={14} className="text-[var(--text-muted)]" />
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[var(--text-muted)] font-body text-sm">
            <Icon name="Globe" size={32} className="mx-auto mb-3 opacity-20" />
            <p>Сообщества не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunitiesPage;
