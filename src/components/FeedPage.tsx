import { useState } from "react";
import { POSTS } from "@/data/mockData";
import Icon from "@/components/ui/icon";

const interests = ["Все", "Фото", "Дизайн", "Архитектура", "Путешествия", "Еда", "Арт"];

const getInitials = (name: string) =>
  name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

interface Post {
  id: string;
  user: { name: string; username: string; avatar: string };
  image: string; caption: string; likes: number; comments: number;
  saves: number; time: string; tags: string[]; liked: boolean; saved: boolean; height: string;
}

const FeedPage = () => {
  const [posts, setPosts] = useState(POSTS);
  const [activeInterest, setActiveInterest] = useState("Все");
  const [openPost, setOpenPost] = useState<Post | null>(null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Record<string, { user: string; text: string; time: string }[]>>({});

  const toggleLike = (id: string) =>
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));

  const toggleSave = (id: string) =>
    setPosts(prev => prev.map(p => p.id === id ? { ...p, saved: !p.saved } : p));

  const addComment = (postId: string) => {
    if (!commentText.trim()) return;
    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), { user: "Алексей С.", text: commentText, time: "Сейчас" }]
    }));
    setCommentText("");
  };

  const leftCol = posts.filter((_, i) => i % 2 === 0);
  const rightCol = posts.filter((_, i) => i % 2 === 1);

  return (
    <div className="mesh-bg min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Лента</h1>
            <p className="text-xs text-[var(--text-muted)] font-body mt-0.5">Персонально для вас</p>
          </div>
          <div className="flex gap-2">
            <button className="w-9 h-9 rounded-2xl glass flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all hover:scale-105">
              <Icon name="Bell" size={16} />
            </button>
            <button className="w-9 h-9 rounded-2xl glass flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all hover:scale-105">
              <Icon name="Sliders" size={16} />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
          {interests.map((interest) => (
            <button
              key={interest}
              onClick={() => setActiveInterest(interest)}
              className={`px-4 py-1.5 rounded-full text-xs font-body font-medium whitespace-nowrap transition-all duration-200
                ${activeInterest === interest
                  ? "bg-[var(--text-primary)] text-white shadow-md"
                  : "glass-pill text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
            >
              {interest}
            </button>
          ))}
        </div>

        {/* Pinterest Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-3">
            {leftCol.map((post, i) => (
              <PostCard key={post.id} post={post} delay={i * 60}
                onLike={toggleLike} onSave={toggleSave} onClick={() => setOpenPost(post)} />
            ))}
          </div>
          <div className="flex flex-col gap-3 mt-8">
            {rightCol.map((post, i) => (
              <PostCard key={post.id} post={post} delay={i * 60 + 30}
                onLike={toggleLike} onSave={toggleSave} onClick={() => setOpenPost(post)} />
            ))}
          </div>
        </div>
      </div>

      {/* Post Modal */}
      {openPost && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
          onClick={() => setOpenPost(null)}
        >
          <div
            className="w-full md:max-w-lg bg-[var(--bg-card-solid)] md:rounded-3xl rounded-t-3xl overflow-hidden animate-slide-up shadow-[var(--shadow-float)] max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative h-64 flex-shrink-0">
              <img src={openPost.image} alt={openPost.caption} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <button
                onClick={() => setOpenPost(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
              >
                <Icon name="X" size={14} />
              </button>
              {/* Like / save */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-[9px] font-bold">
                    {getInitials(openPost.user.name)}
                  </div>
                  <span className="text-white text-xs font-body font-medium">{openPost.user.name}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { toggleLike(openPost.id); setOpenPost(p => p ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p); }}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full backdrop-blur-sm text-xs font-body transition-all
                      ${openPost.liked ? "bg-[var(--accent-red)] text-white" : "bg-white/20 text-white"}`}>
                    <Icon name="Heart" size={12} className={openPost.liked ? "fill-current" : ""} />
                    {openPost.likes}
                  </button>
                  <button onClick={() => { toggleSave(openPost.id); setOpenPost(p => p ? { ...p, saved: !p.saved } : p); }}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full backdrop-blur-sm text-xs font-body transition-all
                      ${openPost.saved ? "bg-white text-[var(--text-primary)]" : "bg-white/20 text-white"}`}>
                    <Icon name="Bookmark" size={12} />
                  </button>
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="px-4 py-3 border-b border-[var(--border-light)]">
              <p className="text-sm font-body text-[var(--text-secondary)] leading-relaxed">{openPost.caption}</p>
              <div className="flex gap-1.5 mt-2">
                {openPost.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-body text-[var(--accent-blue)] bg-[var(--accent-blue)]/10 px-2 py-0.5 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0">
              {(comments[openPost.id] || []).length === 0 && (
                <p className="text-center text-xs text-[var(--text-muted)] font-body py-4">Первым оставь комментарий</p>
              )}
              {(comments[openPost.id] || []).map((c, i) => (
                <div key={i} className="flex gap-2.5 animate-fade-in">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[var(--text-primary)] to-[var(--text-secondary)] flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">
                    {getInitials(c.user)}
                  </div>
                  <div className="flex-1 bg-[var(--bg-hover)] rounded-2xl rounded-tl-sm px-3 py-2">
                    <p className="text-xs font-body font-semibold text-[var(--text-primary)] mb-0.5">{c.user}</p>
                    <p className="text-xs font-body text-[var(--text-secondary)] leading-relaxed">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment input */}
            <div className="px-4 py-3 border-t border-[var(--border-light)] flex gap-2">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#4a4a8a] flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">
                АС
              </div>
              <div className="flex-1 flex gap-2">
                <input
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addComment(openPost.id)}
                  placeholder="Комментарий..."
                  className="flex-1 bg-[var(--bg-hover)] rounded-2xl px-3 py-2 text-sm font-body text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:bg-[var(--bg-card)] transition-colors border border-transparent focus:border-[var(--border-light)]"
                />
                <button
                  onClick={() => addComment(openPost.id)}
                  disabled={!commentText.trim()}
                  className="w-8 h-8 bg-[var(--text-primary)] rounded-xl flex items-center justify-center text-white disabled:opacity-30 hover:opacity-90 transition-opacity"
                >
                  <Icon name="Send" size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PostCard = ({ post, delay, onLike, onSave, onClick }: {
  post: Post; delay: number;
  onLike: (id: string) => void; onSave: (id: string) => void;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="group glass-card rounded-3xl overflow-hidden cursor-pointer animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`relative overflow-hidden ${post.height === "tall" ? "h-60" : post.height === "medium" ? "h-44" : "h-32"}`}>
      <img
        src={post.image}
        alt={post.caption}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
        <button
          onClick={e => { e.stopPropagation(); onSave(post.id); }}
          className={`w-7 h-7 rounded-xl backdrop-blur-md flex items-center justify-center transition-all
            ${post.saved ? "bg-white text-[var(--text-primary)]" : "bg-black/30 text-white hover:bg-white/90 hover:text-[var(--text-primary)]"}`}
        >
          <Icon name="Bookmark" size={12} />
        </button>
      </div>
    </div>

    <div className="p-3">
      <div className="flex items-center gap-1.5 mb-1.5">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0">
          {post.user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
        </div>
        <span className="text-[11px] text-[var(--text-muted)] font-body truncate">{post.user.name}</span>
        <span className="text-[10px] text-[var(--text-muted)] font-body ml-auto">{post.time}</span>
      </div>
      <p className="text-xs text-[var(--text-secondary)] font-body leading-relaxed line-clamp-2 mb-2">{post.caption}</p>
      <div className="flex items-center gap-3">
        <button
          onClick={e => { e.stopPropagation(); onLike(post.id); }}
          className={`flex items-center gap-1 text-[11px] font-body transition-all ${post.liked ? "text-[var(--accent-red)]" : "text-[var(--text-muted)] hover:text-[var(--accent-red)]"}`}
        >
          <Icon name="Heart" size={12} className={post.liked ? "fill-current" : ""} />
          {post.likes}
        </button>
        <div className="flex items-center gap-1 text-[11px] font-body text-[var(--text-muted)]">
          <Icon name="MessageCircle" size={12} />
          {post.comments}
        </div>
      </div>
    </div>
  </div>
);

export default FeedPage;
