export const COMMUNITIES = [
  {
    id: "c1", name: "Минималистичный дизайн", description: "Всё о чистых линиях, белом пространстве и функциональной эстетике",
    members: 12400, category: "Дизайн", joined: true,
    cover: "https://cdn.poehali.dev/projects/6e5465ed-3612-4046-ac7f-fafa3c781591/files/56ad1729-77ad-4d5e-9d2d-8914f3c5822c.jpg",
    posts: [
      { id: "cp1", user: "Анна Р.", text: "Новая работа по типографике — что думаете?", likes: 87, comments: 12, time: "1ч", image: "https://cdn.poehali.dev/projects/6e5465ed-3612-4046-ac7f-fafa3c781591/files/46c424ef-9aa5-4c6f-b4f7-445ff63110a8.jpg" },
      { id: "cp2", user: "Кирилл Б.", text: "Принципы сетки в современном UI. Поделился статьёй — советую всем!", likes: 54, comments: 8, time: "3ч", image: null },
    ]
  },
  {
    id: "c2", name: "Уличная фотография", description: "Ловим момент. Живая фотография городов и людей",
    members: 8700, category: "Фото", joined: true,
    cover: "https://cdn.poehali.dev/projects/6e5465ed-3612-4046-ac7f-fafa3c781591/files/34be5271-f816-4e48-b161-a7ba0289ac7f.jpg",
    posts: [
      { id: "cp3", user: "Дмитрий В.", text: "Утренняя Москва в 6 утра. Тишина и туман.", likes: 143, comments: 21, time: "2ч", image: "https://cdn.poehali.dev/projects/6e5465ed-3612-4046-ac7f-fafa3c781591/files/34be5271-f816-4e48-b161-a7ba0289ac7f.jpg" },
    ]
  },
  {
    id: "c3", name: "Инди музыка", description: "Независимые артисты, демо-треки и обсуждения",
    members: 5300, category: "Музыка", joined: false,
    cover: "https://cdn.poehali.dev/projects/6e5465ed-3612-4046-ac7f-fafa3c781591/files/46c424ef-9aa5-4c6f-b4f7-445ff63110a8.jpg",
    posts: []
  },
  {
    id: "c4", name: "Продуктивность и фокус", description: "Методики, инструменты и опыт для глубокой работы",
    members: 19200, category: "Саморазвитие", joined: false,
    cover: "https://cdn.poehali.dev/projects/6e5465ed-3612-4046-ac7f-fafa3c781591/files/56ad1729-77ad-4d5e-9d2d-8914f3c5822c.jpg",
    posts: []
  },
];

export const CATEGORIES = ["Все", "Дизайн", "Фото", "Музыка", "Саморазвитие", "Технологии"];
