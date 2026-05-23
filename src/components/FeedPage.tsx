import { useState } from "react";
import { POSTS } from "@/data/mockData";
import Icon from "@/components/ui/icon";

const interests = ["Все", "Фото", "Дизайн", "Архитектура", "Путешествия", "Еда", "Спорт"];

const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

const FeedPage = () => {
  const [posts, setPosts] = useState(POSTS);
  const [activeInterest, setActiveInterest] = useState("Все");

  const toggleLike = (id: string) => {
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));
  };

  const toggleSave = (id: string) => {
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, saved: !p.saved } : p
    ));
  };

  const leftCol = posts.filter((_, i) => i % 2 === 0);
  const rightCol = posts.filter((_, i) => i % 2 === 1);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Лента</h1>
        <button className="w-9 h-9 rounded-xl bg-[var(--bg-card)] border border-[var(--border-light)] flex items-center justify-center hover:bg-[var(--bg-hover)] transition-colors">
          <Icon name="Sliders" size={16} className="text-[var(--text-secondary)]" />
        </button>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
        {interests.map((interest) => (
          <button
            key={interest}
            onClick={() => setActiveInterest(interest)}
            className={`px-4 py-1.5 rounded-full text-sm font-body whitespace-nowrap transition-all duration-200
              ${activeInterest === interest
                ? "bg-[var(--text-primary)] text-white"
                : "bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-light)] hover:border-[var(--text-secondary)]"
              }`}
          >
            {interest}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-3">
          {leftCol.map((post) => (
            <PostCard key={post.id} post={post} onLike={toggleLike} onSave={toggleSave} />
          ))}
        </div>
        <div className="flex flex-col gap-3 mt-6">
          {rightCol.map((post) => (
            <PostCard key={post.id} post={post} onLike={toggleLike} onSave={toggleSave} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface Post {
  id: string; user: { name: string; username: string; avatar: string };
  image: string; caption: string; likes: number; comments: number; saves: number;
  time: string; tags: string[]; liked: boolean; saved: boolean; height: string;
}
const PostCard = ({ post, onLike, onSave }: { post: Post; onLike: (id: string) => void; onSave: (id: string) => void }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className="group relative bg-[var(--bg-card)] rounded-2xl overflow-hidden border border-[var(--border-light)] hover:shadow-md transition-all duration-300 cursor-pointer animate-fade-in"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className={`relative overflow-hidden ${post.height === "tall" ? "h-64" : post.height === "medium" ? "h-48" : "h-36"}`}>
        <img
          src={post.image}
          alt={post.caption}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-opacity duration-300 ${showActions ? "opacity-100" : "opacity-0"}`} />
        <div className={`absolute top-2 right-2 flex gap-1 transition-all duration-200 ${showActions ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}>
          <button
            onClick={(e) => { e.stopPropagation(); onSave(post.id); }}
            className={`w-7 h-7 rounded-lg flex items-center justify-center backdrop-blur-sm transition-colors
              ${post.saved ? "bg-[var(--text-primary)] text-white" : "bg-white/80 text-[var(--text-primary)]"}`}
          >
            <Icon name="Bookmark" size={13} />
          </button>
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">
            {getInitials(post.user.name)}
          </div>
          <span className="text-xs text-[var(--text-muted)] font-body truncate">{post.user.name}</span>
        </div>

        <p className="text-xs text-[var(--text-secondary)] font-body leading-relaxed line-clamp-2 mb-2">{post.caption}</p>

        <div className="flex items-center justify-between">
          <button
            onClick={() => onLike(post.id)}
            className={`flex items-center gap-1 transition-all duration-200 ${post.liked ? "text-[var(--accent-red)]" : "text-[var(--text-muted)]"}`}
          >
            <Icon name={post.liked ? "Heart" : "Heart"} size={13} className={post.liked ? "fill-current" : ""} />
            <span className="text-xs font-body">{post.likes}</span>
          </button>
          <div className="flex items-center gap-1 text-[var(--text-muted)]">
            <Icon name="MessageCircle" size={13} />
            <span className="text-xs font-body">{post.comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;