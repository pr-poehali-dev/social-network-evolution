export type BlockType =
  | "posts" | "music" | "portfolio" | "services" | "reviews"
  | "links" | "products" | "donations" | "playlists" | "projects";

export type ProfileVersion =
  | "friends" | "clients" | "employers" | "subscribers" | "strangers";

export interface ProfileBlock {
  id: string;
  type: BlockType;
  enabled: boolean;
  order: number;
}

export const BLOCK_META: Record<BlockType, { icon: string; label: string; description: string; color: string }> = {
  posts:      { icon: "Grid3x3",     label: "Посты",          description: "Ваши публикации",    color: "#007aff" },
  music:      { icon: "Music",       label: "Музыка",         description: "Любимые треки",       color: "#af52de" },
  portfolio:  { icon: "Briefcase",   label: "Портфолио",      description: "Ваши работы",         color: "#ff9500" },
  services:   { icon: "Sparkles",    label: "Услуги",         description: "Что вы предлагаете",  color: "#34c759" },
  reviews:    { icon: "Star",        label: "Отзывы",         description: "Что говорят о вас",   color: "#ffd60a" },
  links:      { icon: "Link",        label: "Ссылки",         description: "Соцсети и сайты",     color: "#32ade6" },
  products:   { icon: "ShoppingBag", label: "Товары",         description: "Магазин",             color: "#ff6b35" },
  donations:  { icon: "Heart",       label: "Донаты",         description: "Поддержать автора",   color: "#ff375f" },
  playlists:  { icon: "ListMusic",   label: "Плейлисты",      description: "Подборки треков",     color: "#30d158" },
  projects:   { icon: "Pin",         label: "Закреплённые",   description: "Важные проекты",      color: "#636366" },
};

export const VERSION_META: Record<ProfileVersion, { icon: string; label: string; color: string }> = {
  friends:     { icon: "Users",     label: "Для друзей",           color: "#34c759" },
  clients:     { icon: "Briefcase", label: "Для клиентов",         color: "#007aff" },
  employers:   { icon: "Building2", label: "Для работодателей",    color: "#af52de" },
  subscribers: { icon: "Bell",      label: "Для подписчиков",      color: "#ff9500" },
  strangers:   { icon: "Globe",     label: "Для незнакомых",       color: "#636366" },
};

export const DEFAULT_BLOCKS: ProfileBlock[] = [
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

export const getInitials = (name: string) =>
  name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
