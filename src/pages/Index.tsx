import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import FeedPage from "@/components/FeedPage";
import ProfilePage from "@/components/ProfilePage";
import FriendsPage from "@/components/FriendsPage";
import MessagesPage from "@/components/MessagesPage";
import SearchPage from "@/components/SearchPage";
import NotificationsPage from "@/components/NotificationsPage";
import MusicPage from "@/components/MusicPage";
import CommunitiesPage from "@/components/CommunitiesPage";
import MobileNav from "@/components/MobileNav";
import MusicPlayer from "@/components/MusicPlayer";

export type Page = "feed" | "profile" | "friends" | "messages" | "search" | "notifications" | "music" | "communities";

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover: string;
}

export interface PlayerState {
  track: Track | null;
  playing: boolean;
  progress: number;
  volume: number;
}

const Index = () => {
  const [activePage, setActivePage] = useState<Page>("feed");
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return (localStorage.getItem("polka-theme") as "light" | "dark") || "light";
  });
  const [player, setPlayer] = useState<PlayerState>({
    track: null, playing: false, progress: 0, volume: 80
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("polka-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "light" ? "dark" : "light");

  const renderPage = () => {
    switch (activePage) {
      case "feed": return <FeedPage />;
      case "profile": return <ProfilePage />;
      case "friends": return <FriendsPage />;
      case "messages": return <MessagesPage />;
      case "search": return <SearchPage />;
      case "notifications": return <NotificationsPage />;
      case "music": return <MusicPage player={player} setPlayer={setPlayer} />;
      case "communities": return <CommunitiesPage />;
      default: return <FeedPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex transition-colors duration-300">
      <Sidebar activePage={activePage} setActivePage={setActivePage} theme={theme} toggleTheme={toggleTheme} />
      <main className={`flex-1 ml-0 md:ml-64 min-h-screen transition-all duration-300 ${player.track ? "pb-24 md:pb-20" : "pb-20 md:pb-0"}`}>
        {renderPage()}
      </main>
      <MobileNav activePage={activePage} setActivePage={setActivePage} />
      {player.track && <MusicPlayer player={player} setPlayer={setPlayer} />}
    </div>
  );
};

export default Index;
