import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import FeedPage from "@/components/FeedPage";
import ProfilePage from "@/components/ProfilePage";
import FriendsPage from "@/components/FriendsPage";
import MessagesPage from "@/components/MessagesPage";
import SearchPage from "@/components/SearchPage";
import NotificationsPage from "@/components/NotificationsPage";
import MobileNav from "@/components/MobileNav";

export type Page = "feed" | "profile" | "friends" | "messages" | "search" | "notifications";

const Index = () => {
  const [activePage, setActivePage] = useState<Page>("feed");

  const renderPage = () => {
    switch (activePage) {
      case "feed": return <FeedPage />;
      case "profile": return <ProfilePage />;
      case "friends": return <FriendsPage />;
      case "messages": return <MessagesPage />;
      case "search": return <SearchPage />;
      case "notifications": return <NotificationsPage />;
      default: return <FeedPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 ml-0 md:ml-64 pb-20 md:pb-0 min-h-screen">
        {renderPage()}
      </main>
      <MobileNav activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
};

export default Index;
