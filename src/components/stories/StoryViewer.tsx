import { useState, useEffect, useRef, useCallback } from "react";
import { Story, StoryItem } from "@/data/storiesData";
import Icon from "@/components/ui/icon";

interface StoryViewerProps {
  stories: Story[];
  initialStoryIndex: number;
  onClose: () => void;
  onStorySeen: (storyId: string) => void;
}

const REACTIONS = ["❤️", "🔥", "😍", "👏", "😮", "🚀"];

export default function StoryViewer({ stories, initialStoryIndex, onClose, onStorySeen }: StoryViewerProps) {
  const [storyIdx, setStoryIdx] = useState(initialStoryIndex);
  const [itemIdx, setItemIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReactions, setShowReactions] = useState(false);
  const [sentReaction, setSentReaction] = useState<string | null>(null);
  const [showViews, setShowViews] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startXRef = useRef<number>(0);

  const story = stories[storyIdx];
  const item: StoryItem = story.items[itemIdx];
  const totalItems = story.items.length;
  const TICK = 50; // ms

  const goNext = useCallback(() => {
    if (itemIdx < totalItems - 1) {
      setItemIdx(i => i + 1);
      setProgress(0);
    } else if (storyIdx < stories.length - 1) {
      onStorySeen(story.id);
      setStoryIdx(i => i + 1);
      setItemIdx(0);
      setProgress(0);
    } else {
      onStorySeen(story.id);
      onClose();
    }
  }, [itemIdx, totalItems, storyIdx, stories.length, story.id, onClose, onStorySeen]);

  const goPrev = useCallback(() => {
    if (itemIdx > 0) {
      setItemIdx(i => i - 1);
      setProgress(0);
    } else if (storyIdx > 0) {
      setStoryIdx(i => i - 1);
      setItemIdx(0);
      setProgress(0);
    }
  }, [itemIdx, storyIdx]);

  useEffect(() => {
    setProgress(0);
  }, [storyIdx, itemIdx]);

  useEffect(() => {
    if (paused || showReply || showReactions) return;
    const duration = item.duration * 1000;
    intervalRef.current = setInterval(() => {
      setProgress(p => {
        const next = p + (TICK / duration) * 100;
        if (next >= 100) { clearInterval(intervalRef.current!); goNext(); return 100; }
        return next;
      });
    }, TICK);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, showReply, showReactions, item.duration, goNext]);

  const handleTouchStart = (e: React.TouchEvent) => { startXRef.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - startXRef.current;
    if (dx > 60) goPrev();
    else if (dx < -60) goNext();
  };

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (showReply || showReactions) return;
    const x = e.clientX / window.innerWidth;
    if (x < 0.35) goPrev();
    else goNext();
  };

  const sendReaction = (emoji: string) => {
    setSentReaction(emoji);
    setShowReactions(false);
    setTimeout(() => setSentReaction(null), 2000);
  };

  const sendReply = () => {
    if (!replyText.trim()) return;
    setReplyText("");
    setShowReply(false);
  };

  const isMe = story.userId === "me";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.95)" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Story card */}
      <div className="relative w-full max-w-sm h-full md:h-[90vh] md:rounded-3xl overflow-hidden animate-scale-in"
        style={{ background: "#000" }}>

        {/* Media */}
        {item.type === "image" && item.image && (
          <img src={item.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        )}
        {item.type === "text" && (
          <div className="absolute inset-0 flex items-center justify-center p-8"
            style={{ background: item.textBg || "linear-gradient(135deg,#667eea,#764ba2)" }}>
            <p className="text-white text-3xl font-display font-bold text-center leading-snug drop-shadow-lg">
              {item.text}
            </p>
          </div>
        )}

        {/* Dark overlay bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Tap zones (invisible, above content) */}
        <div className="absolute inset-0 flex" onClick={handleTap}>
          <div className="w-1/3 h-full" />
          <div className="flex-1 h-full" />
        </div>

        {/* Progress bars */}
        <div className="absolute top-0 left-0 right-0 p-3 flex gap-1 z-10 pointer-events-none">
          {story.items.map((_, i) => (
            <div key={i} className="flex-1 h-0.5 rounded-full overflow-hidden bg-white/30">
              <div
                className="h-full bg-white rounded-full transition-none"
                style={{
                  width: i < itemIdx ? "100%" : i === itemIdx ? `${progress}%` : "0%",
                  transition: i === itemIdx ? "none" : undefined,
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-6 left-0 right-0 px-3 flex items-center gap-2.5 z-10 pointer-events-none">
          <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${story.gradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ring-2 ring-white/60`}>
            {story.userName.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-body font-semibold leading-none">{story.userName}</p>
            <p className="text-white/60 text-[10px] font-body mt-0.5">{item.createdAt}</p>
          </div>
          {isMe && (
            <button
              className="pointer-events-auto flex items-center gap-1 text-white/80 text-xs font-body"
              onClick={() => setShowViews(v => !v)}
            >
              <Icon name="Eye" size={14} />
              {item.views}
            </button>
          )}
          <button
            className="pointer-events-auto w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white"
            onClick={(e) => { e.stopPropagation(); setPaused(p => !p); }}
          >
            <Icon name={paused ? "Play" : "Pause"} size={14} />
          </button>
          <button
            className="pointer-events-auto w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white"
            onClick={(e) => { e.stopPropagation(); onClose(); }}
          >
            <Icon name="X" size={14} />
          </button>
        </div>

        {/* Navigate prev/next story arrows (desktop) */}
        {storyIdx > 0 && (
          <button
            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm items-center justify-center text-white hover:bg-black/60 transition-colors"
            onClick={e => { e.stopPropagation(); goPrev(); }}
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
        )}
        {storyIdx < stories.length - 1 && (
          <button
            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm items-center justify-center text-white hover:bg-black/60 transition-colors"
            onClick={e => { e.stopPropagation(); goNext(); }}
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        )}

        {/* Reactions bar */}
        {item.reactions.length > 0 && (
          <div className="absolute top-20 right-3 z-10 flex flex-col gap-1 pointer-events-none">
            {item.reactions.map((r, i) => (
              <div key={i} className="flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5">
                <span className="text-sm">{r.emoji}</span>
                <span className="text-white text-[10px] font-body">{r.count}</span>
              </div>
            ))}
          </div>
        )}

        {/* Sent reaction float */}
        {sentReaction && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <span className="text-8xl animate-scale-in drop-shadow-2xl">{sentReaction}</span>
          </div>
        )}

        {/* Views overlay (for own stories) */}
        {showViews && isMe && (
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-3 p-6"
            onClick={e => { e.stopPropagation(); setShowViews(false); }}
          >
            <div className="flex items-center gap-2 text-white text-lg font-display font-bold">
              <Icon name="Eye" size={22} />
              {item.views} просмотров
            </div>
            <p className="text-white/60 text-sm font-body text-center">Нажмите чтобы закрыть</p>
          </div>
        )}

        {/* Bottom controls */}
        {!isMe && (
          <div className="absolute bottom-0 left-0 right-0 px-3 pb-6 pt-4 z-10">
            {showReactions && (
              <div className="flex justify-center gap-3 mb-3 animate-slide-up">
                {REACTIONS.map(emoji => (
                  <button
                    key={emoji}
                    onClick={e => { e.stopPropagation(); sendReaction(emoji); }}
                    className="text-3xl hover:scale-125 transition-transform drop-shadow"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            {showReply ? (
              <div className="flex gap-2 animate-slide-up" onClick={e => e.stopPropagation()}>
                <input
                  autoFocus
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendReply()}
                  placeholder={`Ответить ${story.userName}...`}
                  className="flex-1 bg-white/15 backdrop-blur-sm text-white placeholder:text-white/50 rounded-2xl px-4 py-2.5 text-sm font-body outline-none border border-white/20"
                />
                <button
                  onClick={e => { e.stopPropagation(); sendReply(); }}
                  className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-[var(--text-primary)] flex-shrink-0"
                >
                  <Icon name="Send" size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                <button
                  onClick={() => setShowReply(true)}
                  className="flex-1 bg-white/15 backdrop-blur-sm text-white/70 rounded-2xl px-4 py-2.5 text-sm font-body text-left border border-white/20"
                >
                  Ответить...
                </button>
                <button
                  onClick={() => { setShowReactions(r => !r); setPaused(true); }}
                  className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20"
                >
                  <span className="text-xl">😊</span>
                </button>
                <button className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 text-white">
                  <Icon name="Send" size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Story strip outside card (desktop) */}
      <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 gap-2">
        {stories.map((s, i) => (
          <button
            key={s.id}
            onClick={() => { setStoryIdx(i); setItemIdx(0); setProgress(0); }}
            className={`w-2 h-2 rounded-full transition-all ${i === storyIdx ? "bg-white scale-125" : "bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}
