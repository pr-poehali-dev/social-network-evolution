import { useState } from "react";
import { MESSAGES } from "@/data/mockData";
import Icon from "@/components/ui/icon";

const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

type CallState = "none" | "audio" | "video";

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [chats, setChats] = useState(MESSAGES);
  const [callState, setCallState] = useState<CallState>("none");
  const [callDuration, setCallDuration] = useState(0);

  const activeChat = chats.find(c => c.id === selectedChat);

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;
    setChats(prev => prev.map(c =>
      c.id === selectedChat
        ? { ...c, lastMessage: newMessage, messages: [...c.messages, { from: "me", text: newMessage, time: "Сейчас" }] }
        : c
    ));
    setNewMessage("");
  };

  const startCall = (type: "audio" | "video") => {
    setCallState(type);
    let sec = 0;
    const interval = setInterval(() => {
      sec++;
      setCallDuration(sec);
    }, 1000);
    setTimeout(() => { clearInterval(interval); setCallState("none"); setCallDuration(0); }, 30000);
  };

  const endCall = () => { setCallState("none"); setCallDuration(0); };

  const formatDuration = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="mesh-bg min-h-screen h-screen flex transition-all duration-300" style={{ height: "calc(100vh - 80px)" }}>
      <div className={`${selectedChat ? "hidden md:flex" : "flex"} flex-col w-full md:w-80 border-r border-[var(--border-light)] bg-[var(--bg-card-solid)] transition-all duration-300`}>
        <div className="px-4 py-5 border-b border-[var(--border-light)]">
          <h1 className="font-display text-xl font-bold text-[var(--text-primary)]">Сообщения</h1>
        </div>
        <div className="px-3 py-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-[var(--bg-base)] rounded-xl border border-[var(--border-light)]">
            <Icon name="Search" size={14} className="text-[var(--text-muted)]" />
            <input className="flex-1 bg-transparent text-sm font-body text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none" placeholder="Поиск..." />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map(chat => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-[var(--bg-hover)] transition-colors text-left
                ${selectedChat === chat.id ? "bg-[var(--bg-hover)]" : ""}`}
            >
              <div className="relative flex-shrink-0">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gray-500 to-gray-300 flex items-center justify-center text-white text-sm font-bold font-display">
                  {getInitials(chat.name)}
                </div>
                {chat.online && <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-sm font-body font-semibold text-[var(--text-primary)] truncate">{chat.name}</p>
                  <span className="text-xs text-[var(--text-muted)] font-body flex-shrink-0 ml-2">{chat.time}</span>
                </div>
                <p className="text-xs text-[var(--text-muted)] font-body truncate">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <span className="w-5 h-5 bg-[var(--text-primary)] text-white text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0">
                  {chat.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {selectedChat && activeChat ? (
        <div className="flex-1 flex flex-col relative transition-all duration-300">
          {callState !== "none" && (
            <div className="absolute inset-0 bg-[var(--text-primary)] z-10 flex flex-col items-center justify-center text-white animate-fade-in">
              <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center text-3xl font-bold font-display mb-4">
                {getInitials(activeChat.name)}
              </div>
              <p className="font-display text-xl font-bold mb-1">{activeChat.name}</p>
              <p className="font-body text-sm text-white/60 mb-1">{callState === "video" ? "Видеозвонок" : "Аудиозвонок"}</p>
              <p className="font-body text-lg font-medium text-white/80">{formatDuration(callDuration)}</p>
              <div className="flex gap-4 mt-8">
                <button className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Icon name="MicOff" size={20} />
                </button>
                {callState === "video" && (
                  <button className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Icon name="VideoOff" size={20} />
                  </button>
                )}
                <button onClick={endCall} className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                  <Icon name="PhoneOff" size={20} />
                </button>
              </div>
            </div>
          )}

          <div className="px-4 py-3 border-b border-[var(--border-light)] bg-[var(--bg-card-solid)] flex items-center justify-between transition-all duration-300">
            <div className="flex items-center gap-3">
              <button onClick={() => setSelectedChat(null)} className="md:hidden text-[var(--text-secondary)] mr-1">
                <Icon name="ArrowLeft" size={18} />
              </button>
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-500 to-gray-300 flex items-center justify-center text-white text-sm font-bold font-display">
                  {getInitials(activeChat.name)}
                </div>
                {activeChat.online && <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full"></span>}
              </div>
              <div>
                <p className="font-body font-semibold text-sm text-[var(--text-primary)]">{activeChat.name}</p>
                <p className="text-xs font-body text-[var(--text-muted)]">{activeChat.online ? "В сети" : "Не в сети"}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <button onClick={() => startCall("audio")} className="w-8 h-8 rounded-xl hover:bg-[var(--bg-hover)] flex items-center justify-center text-[var(--text-secondary)] transition-colors">
                <Icon name="Phone" size={16} />
              </button>
              <button onClick={() => startCall("video")} className="w-8 h-8 rounded-xl hover:bg-[var(--bg-hover)] flex items-center justify-center text-[var(--text-secondary)] transition-colors">
                <Icon name="Video" size={16} />
              </button>
              <button className="w-8 h-8 rounded-xl hover:bg-[var(--bg-hover)] flex items-center justify-center text-[var(--text-secondary)] transition-colors">
                <Icon name="MoreVertical" size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {activeChat.messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm font-body leading-relaxed
                  ${msg.from === "me"
                    ? "bg-[var(--text-primary)] text-white rounded-br-sm"
                    : "bg-[var(--bg-card)] border border-[var(--border-light)] text-[var(--text-primary)] rounded-bl-sm"
                  }`}>
                  <p>{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.from === "me" ? "text-white/50 text-right" : "text-[var(--text-muted)]"}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 py-3 border-t border-[var(--border-light)] bg-[var(--bg-card-solid)] transition-all duration-300">
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-xl bg-[var(--bg-hover)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
                <Icon name="Paperclip" size={16} />
              </button>
              <button className="w-9 h-9 rounded-xl bg-[var(--bg-hover)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
                <Icon name="Video" size={16} />
              </button>
              <input
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder="Написать сообщение..."
                className="flex-1 px-4 py-2 bg-[var(--bg-base)] border border-[var(--border-light)] rounded-xl text-sm font-body text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--text-primary)] transition-colors"
              />
              <button
                onClick={sendMessage}
                className="w-9 h-9 bg-[var(--text-primary)] rounded-xl flex items-center justify-center text-white hover:opacity-90 transition-opacity"
              >
                <Icon name="Send" size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center text-[var(--text-muted)] flex-col gap-3">
          <Icon name="MessageCircle" size={40} className="opacity-20" />
          <p className="font-body text-sm">Выберите диалог</p>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
