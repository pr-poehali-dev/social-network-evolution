export interface Story {
  id: string;
  userId: string;
  userName: string;
  userUsername: string;
  gradient: string;
  items: StoryItem[];
  seen: boolean;
}

export interface StoryItem {
  id: string;
  type: "image" | "text";
  image?: string;
  text?: string;
  textBg?: string;
  duration: number; // seconds
  createdAt: string;
  reactions: { emoji: string; count: number }[];
  views: number;
}

export const STORIES: Story[] = [
  {
    id: "s0",
    userId: "me",
    userName: "Алексей С.",
    userUsername: "@alex_s",
    gradient: "from-[#1a1a2e] to-[#4a4a8a]",
    seen: false,
    items: [
      {
        id: "si0-1",
        type: "image",
        image: "https://cdn.poehali.dev/projects/6e5465ed-3612-4046-ac7f-fafa3c781591/files/46c424ef-9aa5-4c6f-b4f7-445ff63110a8.jpg",
        duration: 5,
        createdAt: "Сейчас",
        reactions: [{ emoji: "🔥", count: 12 }, { emoji: "❤️", count: 8 }],
        views: 47,
      },
    ],
  },
  {
    id: "s1",
    userId: "f1",
    userName: "Мария К.",
    userUsername: "@maria_k",
    gradient: "from-[#ff6b6b] to-[#ee5a24]",
    seen: false,
    items: [
      {
        id: "si1-1",
        type: "image",
        image: "https://cdn.poehali.dev/projects/6e5465ed-3612-4046-ac7f-fafa3c781591/files/56ad1729-77ad-4d5e-9d2d-8914f3c5822c.jpg",
        duration: 5,
        createdAt: "10 мин",
        reactions: [{ emoji: "😍", count: 23 }, { emoji: "🔥", count: 15 }],
        views: 134,
      },
      {
        id: "si1-2",
        type: "text",
        text: "Доброе утро! ☀️\nКофе и вдохновение",
        textBg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        duration: 5,
        createdAt: "10 мин",
        reactions: [{ emoji: "❤️", count: 31 }],
        views: 98,
      },
    ],
  },
  {
    id: "s2",
    userId: "f2",
    userName: "Дмитрий В.",
    userUsername: "@dmitry_v",
    gradient: "from-[#4facfe] to-[#00f2fe]",
    seen: false,
    items: [
      {
        id: "si2-1",
        type: "image",
        image: "https://cdn.poehali.dev/projects/6e5465ed-3612-4046-ac7f-fafa3c781591/files/34be5271-f816-4e48-b161-a7ba0289ac7f.jpg",
        duration: 5,
        createdAt: "1ч",
        reactions: [{ emoji: "👏", count: 18 }, { emoji: "😮", count: 9 }],
        views: 201,
      },
    ],
  },
  {
    id: "s3",
    userId: "f3",
    userName: "Анна Р.",
    userUsername: "@anna_r",
    gradient: "from-[#43e97b] to-[#38f9d7]",
    seen: true,
    items: [
      {
        id: "si3-1",
        type: "text",
        text: "Новый проект\nв разработке 🎨",
        textBg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        duration: 5,
        createdAt: "3ч",
        reactions: [{ emoji: "🚀", count: 44 }],
        views: 312,
      },
    ],
  },
  {
    id: "s4",
    userId: "f5",
    userName: "Наташа Л.",
    userUsername: "@natasha_l",
    gradient: "from-[#fa709a] to-[#fee140]",
    seen: true,
    items: [
      {
        id: "si4-1",
        type: "image",
        image: "https://cdn.poehali.dev/projects/6e5465ed-3612-4046-ac7f-fafa3c781591/files/46c424ef-9aa5-4c6f-b4f7-445ff63110a8.jpg",
        duration: 5,
        createdAt: "5ч",
        reactions: [{ emoji: "💜", count: 67 }],
        views: 489,
      },
    ],
  },
  {
    id: "s5",
    userId: "f6",
    userName: "Кирилл Б.",
    userUsername: "@kirill_b",
    gradient: "from-[#a18cd1] to-[#fbc2eb]",
    seen: true,
    items: [
      {
        id: "si5-1",
        type: "text",
        text: "Хороших выходных\nвсем! 🎉",
        textBg: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
        duration: 5,
        createdAt: "6ч",
        reactions: [],
        views: 156,
      },
    ],
  },
];
