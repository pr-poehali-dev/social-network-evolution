import { useState, useRef } from "react";
import { CURRENT_USER, POSTS } from "@/data/mockData";
import { TRACKS } from "@/data/musicData";
import Icon from "@/components/ui/icon";

type BlockType = "posts" | "music" | "portfolio" | "services" | "reviews" | "links" | "products" | "donations" | "playlists" | "projects";
type ProfileVersion = "friends" | "clients" | "employers" | "subscribers" | "strangers";

interface ProfileBlock {
  id: string;
  type: BlockType;
  enabled: boolean;
  order: number;
}

const BLOCK_META: Record<BlockType, { icon: string; label: string; description: string; color: string }> = {
  posts:      { icon: "Grid3x3",      label: "Посты",             description: "Ваши публикации",       color: "#007aff" },
  music:      { icon: "Music",        label: "Музыка",            description: "Любимые треки",          color: "#af52de" },
  portfolio:  { icon: "Briefcase",    label: "Портфолио",         description: "Ваши работы",            color: "#ff9500" },
  services:   { icon: "Sparkles",     label: "Услуги",            description: "Что вы предлагаете",     color: "#34c759" },
  reviews:    { icon: "Star",         label: "Отзывы",            description: "Что говорят о вас",      color: "#ffd60a" },
  links:      { icon: "Link",         label: "Ссылки",            description: "Соцсети и сайты",        color: "#32ade6" },
  products:   { icon: "ShoppingBag",  label: "Товары",            description: "Магазин",               color: "#ff6b35" },
  donations:  { icon: "Heart",        label: "Донаты",            description: "Поддержать автора",      color: "#ff375f" },
  playlists:  { icon: "ListMusic",    label: "Плейлисты",         description: "Подборки треков",        color: "#30d158" },
  projects:   { icon: "Pin",          label: "Закреплённые",      description: "Важные проекты",         color: "#636366" },
};

const VERSION_META: Record<ProfileVersion, { icon: string; label: string; color: string }> = {
  friends:     { icon: "Users",    label: "Для друзей",      color: "#34c759" },
  clients:     { icon: "Briefcase",label: "Для клиентов",    color: "#007aff" },
  employers:   { icon: "Building2",label: "Для работодателей",color: "#af52de" },
  subscribers: { icon: "Bell",     label: "Для подписчиков", color: "#ff9500" },
  strangers:   { icon: "Globe",    label: "Для незнакомых",  color: "#636366" },
};

const DEFAULT_BLOCKS: ProfileBlock[] = [
  { id: "b-posts",     type: "posts",     enabled: true,  order: 0 },
  { id: "b-music",     type: "music",     enabled: true,  order: 1 },
  { id: "b-portfolio", type: "portfolio", enabled: true,  order: 2 },
  { id: "b-services",  type: "services",  enabled: false, order: 3 },
  { id: "b-reviews",   type: "reviews",   enabled: false, order: 4 },
  { id: "b-links",     type: "links",     enabled: true,  order: 5 },
  { id: "b-products",  type: "products",  enabled: false, order: 6 },
  { id: "b-donations", type: "donations", enabled: false, order: 7 },
  { id: "b-playlists", type: "playlists", enabled: false, order: 8 },
  { id: "b-projects",  type: "projects",  enabled: true,  order: 9 },
];

const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

export default function ProfilePage() {
  const [user, setUser] = useState(CURRENT_USER);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ name: user.name, bio: user.bio, location: user.location });
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<ProfileBlock[]>(DEFAULT_BLOCKS);
  const [showBlockEditor, setShowBlockEditor] = useState(false);
  const [activeVersion, setActiveVersion] = useState<ProfileVersion>("friends");
  const [showVersionPicker, setShowVersionPicker] = useState(false);
  const coverRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);

  const saveProfile = () => { setUser(prev => ({ ...prev, ...editData })); setEditing(false); };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCoverImage(url);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarImage(url);
  };

  const toggleBlock = (id: string) =>
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, enabled: !b.enabled } : b));

  const enabledBlocks = [...blocks].filter(b => b.enabled).sort((a, b) => a.order - b.order);

  const vMeta = VERSION_META[activeVersion];

  return (
    <div className="mesh-bg min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* ── Cover + Avatar ── */}
        <div className="relative mb-16">
          {/* Cover */}
          <div
            className="cover-upload h-44 rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] relative"
            onClick={() => editing && coverRef.current?.click()}
            style={coverImage ? { backgroundImage: `url(${coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
          >
            {!coverImage && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 opacity-30">
                  <div className="w-12 h-12 rounded-full border-2 border-white/40 flex items-center justify-center">
                    <Icon name="ImagePlus" size={20} className="text-white" />
                  </div>
                </div>
              </div>
            )}
            {editing && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-10">
                <div className="glass px-4 py-2 rounded-full flex items-center gap-2 text-white text-sm font-body">
                  <Icon name="Camera" size={14} />
                  Сменить обложку
                </div>
              </div>
            )}
            <input ref={coverRef} type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Avatar */}
          <div className="absolute -bottom-10 left-5 flex items-end gap-3">
            <div
              className={`relative w-20 h-20 rounded-2xl shadow-[var(--shadow-float)] border-4 overflow-hidden ${editing ? "cursor-pointer" : ""}`}
              style={{ borderColor: 'var(--bg-base)' }}
              onClick={() => editing && avatarRef.current?.click()}
            >
              {avatarImage ? (
                <img src={avatarImage} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] to-[#4a4a8a] flex items-center justify-center text-white text-2xl font-bold font-display">
                  {getInitials(user.name)}
                </div>
              )}
              {editing && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Icon name="Camera" size={16} className="text-white" />
                </div>
              )}
              <input ref={avatarRef} type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
            </div>
          </div>

          {/* Top-right actions */}
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={() => setShowVersionPicker(v => !v)}
              className="glass px-3 py-1.5 rounded-full text-xs font-body font-medium flex items-center gap-1.5 text-white"
            >
              <Icon name={vMeta.icon} size={12} />
              {vMeta.label}
              <Icon name="ChevronDown" size={11} />
            </button>
          </div>

          {/* Version picker */}
          {showVersionPicker && (
            <div className="absolute top-12 right-3 z-20 glass-card rounded-2xl p-2 w-52 animate-scale-in">
              {(Object.entries(VERSION_META) as [ProfileVersion, typeof VERSION_META[ProfileVersion]][]).map(([key, meta]) => (
                <button
                  key={key}
                  onClick={() => { setActiveVersion(key); setShowVersionPicker(false); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-body transition-all text-left
                    ${activeVersion === key ? "bg-[var(--bg-hover)]" : "hover:bg-[var(--bg-hover)]"}`}
                >
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: meta.color + '22' }}>
                    <Icon name={meta.icon} size={13} style={{ color: meta.color }} />
                  </div>
                  <span className="text-[var(--text-primary)]">{meta.label}</span>
                  {activeVersion === key && <Icon name="Check" size={13} className="ml-auto text-[var(--accent-blue)]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── User info ── */}
        <div className="px-1 mb-5">
          {editing ? (
            <div className="space-y-2">
              <input value={editData.name} onChange={e => setEditData(d => ({ ...d, name: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-2xl border border-[var(--border-light)] text-base font-display font-bold bg-[var(--bg-card)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-blue)] transition-colors"
                placeholder="Имя" />
              <textarea value={editData.bio} onChange={e => setEditData(d => ({ ...d, bio: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-2xl border border-[var(--border-light)] text-sm font-body bg-[var(--bg-card)] text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent-blue)] resize-none transition-colors"
                rows={2} placeholder="О себе" />
              <input value={editData.location} onChange={e => setEditData(d => ({ ...d, location: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-2xl border border-[var(--border-light)] text-sm font-body bg-[var(--bg-card)] text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent-blue)] transition-colors"
                placeholder="Город" />
              <div className="flex gap-2">
                <button onClick={saveProfile} className="flex-1 py-2.5 bg-[var(--text-primary)] text-white rounded-2xl text-sm font-body font-medium hover:opacity-90 transition-opacity shadow-md">
                  Сохранить
                </button>
                <button onClick={() => setEditing(false)} className="px-4 py-2.5 glass-card rounded-2xl text-sm font-body text-[var(--text-secondary)]">
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
                  <button onClick={() => setEditing(true)}
                    className="glass-card px-3.5 py-2 rounded-2xl text-sm font-body text-[var(--text-secondary)] flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors">
                    <Icon name="Pencil" size={13} /> Изменить
                  </button>
                  <button onClick={() => setShowBlockEditor(true)}
                    className="glass-card px-3.5 py-2 rounded-2xl text-sm font-body text-[var(--text-secondary)] flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors">
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
                { label: "Публикаций",  value: user.posts,     icon: "Grid3x3" },
                { label: "Подписчиков", value: user.followers,  icon: "Users" },
                { label: "Подписок",    value: user.following,  icon: "UserCheck" },
              ].map(stat => (
                <div key={stat.label} className="glass-card rounded-2xl p-3 text-center">
                  <p className="font-display text-xl font-bold text-[var(--text-primary)]">{stat.value.toLocaleString()}</p>
                  <p className="text-[11px] text-[var(--text-muted)] font-body mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Blocks ── */}
        <div className="space-y-4">
          {enabledBlocks.map(block => (
            <ProfileBlockComponent key={block.id} type={block.type} />
          ))}
        </div>
      </div>

      {/* Block editor modal */}
      {showBlockEditor && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
          onClick={() => setShowBlockEditor(false)}
        >
          <div
            className="w-full md:max-w-md bg-[var(--bg-card-solid)] md:rounded-3xl rounded-t-3xl p-5 animate-slide-up shadow-[var(--shadow-float)]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">Блоки профиля</h3>
              <button onClick={() => setShowBlockEditor(false)} className="w-8 h-8 rounded-xl bg-[var(--bg-hover)] flex items-center justify-center text-[var(--text-muted)]">
                <Icon name="X" size={14} />
              </button>
            </div>
            <p className="text-xs font-body text-[var(--text-muted)] mb-4">Включите нужные блоки — они появятся в вашем профиле</p>
            <div className="space-y-2 max-h-96 overflow-y-auto scrollbar-hide">
              {blocks.map(block => {
                const meta = BLOCK_META[block.type];
                return (
                  <div key={block.id}
                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
                    onClick={() => toggleBlock(block.id)}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: meta.color + '18' }}>
                      <Icon name={meta.icon} size={17} style={{ color: meta.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-body font-semibold text-[var(--text-primary)]">{meta.label}</p>
                      <p className="text-xs font-body text-[var(--text-muted)] truncate">{meta.description}</p>
                    </div>
                    <div className={`w-10 h-6 rounded-full transition-all duration-200 flex items-center flex-shrink-0 px-0.5
                      ${block.enabled ? "bg-[var(--accent-blue)] justify-end" : "bg-[var(--bg-hover)] border border-[var(--border-light)] justify-start"}`}>
                      <div className="w-5 h-5 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Individual block renderers ── */
function ProfileBlockComponent({ type }: { type: BlockType }) {
  const meta = BLOCK_META[type];
  const myPosts = POSTS.slice(0, 6);

  const blockHeader = (
    <div className="flex items-center gap-2.5 mb-3">
      <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: meta.color + '18' }}>
        <Icon name={meta.icon} size={14} style={{ color: meta.color }} />
      </div>
      <span className="font-body font-semibold text-sm text-[var(--text-primary)]">{meta.label}</span>
      <Icon name="ChevronRight" size={14} className="ml-auto text-[var(--text-muted)]" />
    </div>
  );

  if (type === "posts") return (
    <div className="glass-card rounded-3xl p-4 animate-fade-in">
      {blockHeader}
      <div className="grid grid-cols-3 gap-1.5">
        {myPosts.map(post => (
          <div key={post.id} className="aspect-square rounded-2xl overflow-hidden group cursor-pointer relative">
            <img src={post.image} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
        ))}
      </div>
    </div>
  );

  if (type === "music") return (
    <div className="glass-card rounded-3xl p-4 animate-fade-in">
      {blockHeader}
      <div className="space-y-2">
        {TRACKS.slice(0, 3).map(track => (
          <div key={track.id} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-[var(--bg-hover)] transition-colors cursor-pointer">
            <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0">
              <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-body font-medium text-[var(--text-primary)] truncate">{track.title}</p>
              <p className="text-xs font-body text-[var(--text-muted)] truncate">{track.artist}</p>
            </div>
            <Icon name="Play" size={14} className="text-[var(--text-muted)] flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );

  if (type === "portfolio") return (
    <div className="glass-card rounded-3xl p-4 animate-fade-in">
      {blockHeader}
      <div className="grid grid-cols-2 gap-2">
        {POSTS.slice(0, 4).map((post, i) => (
          <div key={post.id} className={`rounded-2xl overflow-hidden cursor-pointer relative ${i === 0 ? "col-span-2 h-40" : "h-28"}`}>
            <img src={post.image} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <p className="absolute bottom-2 left-2 text-xs text-white font-body font-medium">{post.tags[0] || "Работа"}</p>
          </div>
        ))}
      </div>
    </div>
  );

  if (type === "services") return (
    <div className="glass-card rounded-3xl p-4 animate-fade-in">
      {blockHeader}
      <div className="space-y-2">
        {["Фотосъёмка от 5 000 ₽", "Ретушь от 1 500 ₽", "Видеомонтаж от 8 000 ₽"].map((svc, i) => (
          <div key={i} className="flex items-center justify-between px-3 py-2.5 rounded-2xl border border-[var(--border-light)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer">
            <span className="text-sm font-body text-[var(--text-primary)]">{svc}</span>
            <Icon name="ArrowUpRight" size={14} className="text-[var(--text-muted)]" />
          </div>
        ))}
      </div>
    </div>
  );

  if (type === "reviews") return (
    <div className="glass-card rounded-3xl p-4 animate-fade-in">
      {blockHeader}
      <div className="space-y-2">
        {[
          { user: "Мария К.", text: "Отличный фотограф, всё понравилось!", rating: 5 },
          { user: "Дмитрий В.", text: "Очень профессионально и быстро.", rating: 5 },
        ].map((rev, i) => (
          <div key={i} className="p-3 rounded-2xl bg-[var(--bg-hover)]">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-gray-500 to-gray-300 flex items-center justify-center text-white text-[9px] font-bold">
                {rev.user[0]}
              </div>
              <span className="text-xs font-body font-semibold text-[var(--text-primary)]">{rev.user}</span>
              <div className="ml-auto flex gap-0.5">
                {Array.from({ length: rev.rating }).map((_, j) => (
                  <Icon key={j} name="Star" size={10} className="text-[var(--accent-orange)] fill-current" />
                ))}
              </div>
            </div>
            <p className="text-xs font-body text-[var(--text-secondary)]">{rev.text}</p>
          </div>
        ))}
      </div>
    </div>
  );

  if (type === "links") return (
    <div className="glass-card rounded-3xl p-4 animate-fade-in">
      {blockHeader}
      <div className="space-y-2">
        {[
          { icon: "Instagram", label: "Instagram", url: "@alex_s", color: "#e1306c" },
          { icon: "Globe",     label: "Сайт",      url: "alex-s.ru",  color: "#007aff" },
          { icon: "Send",      label: "Telegram",  url: "@alex_s",    color: "#0088cc" },
        ].map((link, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-2xl border border-[var(--border-light)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer">
            <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: link.color + '18' }}>
              <Icon name={link.icon} size={14} style={{ color: link.color }} />
            </div>
            <div>
              <p className="text-xs font-body font-semibold text-[var(--text-primary)]">{link.label}</p>
              <p className="text-[10px] font-body text-[var(--text-muted)]">{link.url}</p>
            </div>
            <Icon name="ExternalLink" size={13} className="ml-auto text-[var(--text-muted)]" />
          </div>
        ))}
      </div>
    </div>
  );

  if (type === "projects") return (
    <div className="glass-card rounded-3xl p-4 animate-fade-in">
      {blockHeader}
      <div className="space-y-2">
        {[
          { title: "Выставка «Тишина»",     desc: "Персональная фотовыставка, 2024", tag: "Фото" },
          { title: "Проект «Город ночью»",  desc: "Серия из 40 снимков", tag: "Серия" },
        ].map((proj, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-2xl border border-[var(--border-light)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-700 to-gray-500 flex items-center justify-center text-white flex-shrink-0">
              <Icon name="Pin" size={15} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-body font-semibold text-[var(--text-primary)] truncate">{proj.title}</p>
              <p className="text-xs font-body text-[var(--text-muted)] truncate">{proj.desc}</p>
            </div>
            <span className="text-[10px] font-body text-[var(--text-secondary)] bg-[var(--bg-hover)] px-2 py-1 rounded-lg flex-shrink-0">{proj.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );

  if (type === "donations") return (
    <div className="glass-card rounded-3xl p-4 animate-fade-in">
      {blockHeader}
      <div className="text-center py-3">
        <p className="text-sm font-body text-[var(--text-secondary)] mb-3">Поддержите работу автора</p>
        <div className="flex gap-2 justify-center flex-wrap">
          {[100, 300, 500, 1000].map(amount => (
            <button key={amount} className="glass-pill px-4 py-2 rounded-full text-sm font-body font-medium text-[var(--text-primary)] hover:scale-105 transition-all">
              {amount} ₽
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if (type === "products") return (
    <div className="glass-card rounded-3xl p-4 animate-fade-in">
      {blockHeader}
      <div className="grid grid-cols-2 gap-2">
        {[
          { name: "Пресет «Утро»",    price: "299 ₽", img: POSTS[0].image },
          { name: "Курс по свету",    price: "1 990 ₽", img: POSTS[1].image },
        ].map((p, i) => (
          <div key={i} className="rounded-2xl overflow-hidden border border-[var(--border-light)] cursor-pointer hover:shadow-md transition-all">
            <div className="h-24 overflow-hidden">
              <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-2.5">
              <p className="text-xs font-body font-semibold text-[var(--text-primary)] truncate">{p.name}</p>
              <p className="text-xs font-body text-[var(--accent-blue)] mt-0.5">{p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (type === "playlists") return (
    <div className="glass-card rounded-3xl p-4 animate-fade-in">
      {blockHeader}
      <div className="grid grid-cols-2 gap-2">
        {[{ name: "Для работы", count: 15 }, { name: "Вечернее", count: 8 }].map((pl, i) => (
          <div key={i} className="rounded-2xl overflow-hidden border border-[var(--border-light)] cursor-pointer hover:bg-[var(--bg-hover)] transition-all">
            <div className="h-20 overflow-hidden">
              <img src={POSTS[i % POSTS.length].image} alt={pl.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-2.5">
              <p className="text-xs font-body font-semibold text-[var(--text-primary)]">{pl.name}</p>
              <p className="text-[10px] font-body text-[var(--text-muted)]">{pl.count} треков</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="glass-card rounded-3xl p-4 animate-fade-in">
      {blockHeader}
      <p className="text-sm font-body text-[var(--text-muted)] text-center py-4">Раздел в разработке</p>
    </div>
  );
}
