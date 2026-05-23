export const CURRENT_USER = {
  id: "me",
  name: "Алексей Смирнов",
  username: "@alex_s",
  avatar: "",
  bio: "Фотограф и путешественник. Снимаю людей и места.",
  location: "Москва",
  followers: 1240,
  following: 386,
  posts: 47,
};

export const POSTS = [
  {
    id: "1",
    user: { name: "Мария К.", username: "@maria_k", avatar: "" },
    image: "https://cdn.poehali.dev/projects/6e5465ed-3612-4046-ac7f-fafa3c781591/files/56ad1729-77ad-4d5e-9d2d-8914f3c5822c.jpg",
    caption: "Утро начинается с хорошего кофе и чистых мыслей ☕",
    likes: 234,
    comments: 18,
    saves: 42,
    time: "2ч",
    tags: ["минимализм", "утро", "кофе"],
    liked: false,
    saved: false,
    height: "tall",
  },
  {
    id: "2",
    user: { name: "Дмитрий В.", username: "@dmitry_v", avatar: "" },
    image: "https://cdn.poehali.dev/projects/6e5465ed-3612-4046-ac7f-fafa3c781591/files/34be5271-f816-4e48-b161-a7ba0289ac7f.jpg",
    caption: "Архитектура говорит тогда, когда люди молчат",
    likes: 567,
    comments: 34,
    saves: 89,
    time: "4ч",
    tags: ["архитектура", "городскаяфотография"],
    liked: true,
    saved: false,
    height: "medium",
  },
  {
    id: "3",
    user: { name: "Анна Р.", username: "@anna_r", avatar: "" },
    image: "https://cdn.poehali.dev/projects/6e5465ed-3612-4046-ac7f-fafa3c781591/files/46c424ef-9aa5-4c6f-b4f7-445ff63110a8.jpg",
    caption: "Простота — это не отсутствие сложности, а её преодоление",
    likes: 891,
    comments: 56,
    saves: 134,
    time: "6ч",
    tags: ["дизайн", "минимализм", "вдохновение"],
    liked: false,
    saved: true,
    height: "short",
  },
  {
    id: "4",
    user: { name: "Павел Н.", username: "@pavel_n", avatar: "" },
    image: "https://cdn.poehali.dev/projects/6e5465ed-3612-4046-ac7f-fafa3c781591/files/56ad1729-77ad-4d5e-9d2d-8914f3c5822c.jpg",
    caption: "Новый день — новые возможности для творчества",
    likes: 123,
    comments: 9,
    saves: 27,
    time: "8ч",
    tags: ["творчество", "вдохновение"],
    liked: false,
    saved: false,
    height: "medium",
  },
  {
    id: "5",
    user: { name: "Елена М.", username: "@elena_m", avatar: "" },
    image: "https://cdn.poehali.dev/projects/6e5465ed-3612-4046-ac7f-fafa3c781591/files/34be5271-f816-4e48-b161-a7ba0289ac7f.jpg",
    caption: "Свет и тень создают настроение",
    likes: 445,
    comments: 31,
    saves: 67,
    time: "10ч",
    tags: ["фотография", "свет"],
    liked: true,
    saved: true,
    height: "tall",
  },
  {
    id: "6",
    user: { name: "Игорь С.", username: "@igor_s", avatar: "" },
    image: "https://cdn.poehali.dev/projects/6e5465ed-3612-4046-ac7f-fafa3c781591/files/46c424ef-9aa5-4c6f-b4f7-445ff63110a8.jpg",
    caption: "Геометрия в повседневном",
    likes: 312,
    comments: 22,
    saves: 55,
    time: "12ч",
    tags: ["геометрия", "абстракция"],
    liked: false,
    saved: false,
    height: "short",
  },
];

export const FRIENDS = [
  { id: "f1", name: "Мария Козлова", username: "@maria_k", mutual: 12, status: "friend", online: true },
  { id: "f2", name: "Дмитрий Волков", username: "@dmitry_v", mutual: 8, status: "friend", online: false },
  { id: "f3", name: "Анна Романова", username: "@anna_r", mutual: 5, status: "friend", online: true },
  { id: "f4", name: "Сергей Попов", username: "@sergey_p", mutual: 3, status: "request", online: false },
  { id: "f5", name: "Наташа Ли", username: "@natasha_l", mutual: 7, status: "request", online: true },
  { id: "f6", name: "Кирилл Б.", username: "@kirill_b", mutual: 2, status: "suggestion", online: false },
  { id: "f7", name: "Ольга Д.", username: "@olga_d", mutual: 15, status: "suggestion", online: true },
  { id: "f8", name: "Максим Т.", username: "@maxim_t", mutual: 4, status: "suggestion", online: false },
];

export const MESSAGES = [
  {
    id: "m1", name: "Мария Козлова", username: "@maria_k",
    lastMessage: "Отлично выглядит! Когда встретимся?", time: "10:24", unread: 2, online: true,
    messages: [
      { from: "them", text: "Привет! Как дела?", time: "10:10" },
      { from: "me", text: "Всё хорошо, спасибо! Занимаюсь проектом.", time: "10:15" },
      { from: "them", text: "Видела твои последние фото — потрясающе!", time: "10:20" },
      { from: "them", text: "Отлично выглядит! Когда встретимся?", time: "10:24" },
    ]
  },
  {
    id: "m2", name: "Дмитрий Волков", username: "@dmitry_v",
    lastMessage: "Посмотри мой новый пост 📷", time: "09:15", unread: 0, online: false,
    messages: [
      { from: "them", text: "Посмотри мой новый пост 📷", time: "09:15" },
    ]
  },
  {
    id: "m3", name: "Анна Романова", username: "@anna_r",
    lastMessage: "Спасибо за советы!", time: "Вчера", unread: 0, online: true,
    messages: [
      { from: "me", text: "Попробуй снимать при естественном освещении", time: "Вчера" },
      { from: "them", text: "Спасибо за советы!", time: "Вчера" },
    ]
  },
  {
    id: "m4", name: "Сергей Попов", username: "@sergey_p",
    lastMessage: "Увидимся на выставке?", time: "Пн", unread: 1, online: false,
    messages: [
      { from: "them", text: "Увидимся на выставке?", time: "Пн" },
    ]
  },
];

export const NOTIFICATIONS = [
  { id: "n1", type: "like", user: "Мария К.", text: "лайкнула ваш пост", time: "5 мин", read: false },
  { id: "n2", type: "comment", user: "Дмитрий В.", text: "прокомментировал: «Потрясающий снимок!»", time: "20 мин", read: false },
  { id: "n3", type: "friend", user: "Анна Р.", text: "приняла вашу заявку в друзья", time: "1ч", read: false },
  { id: "n4", type: "save", user: "Павел Н.", text: "сохранил ваш пост", time: "2ч", read: true },
  { id: "n5", type: "like", user: "Елена М.", text: "лайкнула ваш пост", time: "3ч", read: true },
  { id: "n6", type: "friend", user: "Кирилл Б.", text: "отправил вам заявку в друзья", time: "5ч", read: true },
  { id: "n7", type: "comment", user: "Игорь С.", text: "прокомментировал: «Вдохновляет!»", time: "6ч", read: true },
];
