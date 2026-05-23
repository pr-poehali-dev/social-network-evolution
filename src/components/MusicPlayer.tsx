import { useState, useEffect, useRef } from "react";
import { PlayerState, Track } from "@/pages/Index";
import { TRACKS } from "@/data/musicData";
import Icon from "@/components/ui/icon";

interface MusicPlayerProps {
  player: PlayerState;
  setPlayer: React.Dispatch<React.SetStateAction<PlayerState>>;
}

const fmt = (s: number) => `${Math.floor(s / 60)}:${(Math.round(s) % 60).toString().padStart(2, "0")}`;

const MusicPlayer = ({ player, setPlayer }: MusicPlayerProps) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  useEffect(() => {
    if (player.playing) {
      intervalRef.current = setInterval(() => {
        setPlayer(p => {
          if (!p.track) return p;
          const next = p.progress + 1;
          if (next >= p.track.duration) {
            if (repeat) return { ...p, progress: 0 };
            const idx = TRACKS.findIndex(t => t.id === p.track!.id);
            const nextTrack = TRACKS[shuffle ? Math.floor(Math.random() * TRACKS.length) : (idx + 1) % TRACKS.length];
            return { ...p, track: nextTrack, progress: 0 };
          }
          return { ...p, progress: next };
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [player.playing, shuffle, repeat, setPlayer]);

  const togglePlay = () => setPlayer(p => ({ ...p, playing: !p.playing }));
  const close = () => setPlayer(p => ({ ...p, track: null, playing: false, progress: 0 }));

  const skipTrack = (dir: 1 | -1) => {
    const idx = TRACKS.findIndex(t => t.id === player.track?.id);
    const next = TRACKS[(idx + dir + TRACKS.length) % TRACKS.length];
    setPlayer(p => ({ ...p, track: next, progress: 0, playing: true }));
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!player.track) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    setPlayer(p => ({ ...p, progress: Math.round(ratio * (p.track?.duration ?? 0)) }));
  };

  if (!player.track) return null;
  const progress = player.track.duration > 0 ? (player.progress / player.track.duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 md:left-64 z-50 bg-[var(--bg-card)] border-t border-[var(--border-light)] px-4 py-3 animate-fade-in transition-colors duration-300">
      <div className="max-w-3xl mx-auto flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
          <img src={player.track.cover} alt={player.track.title} className="w-full h-full object-cover" />
        </div>

        <div className="w-36 min-w-0 hidden sm:block">
          <p className="text-sm font-body font-medium text-[var(--text-primary)] truncate">{player.track.title}</p>
          <p className="text-xs font-body text-[var(--text-muted)] truncate">{player.track.artist}</p>
        </div>

        <div className="flex-1 flex flex-col gap-1.5">
          <div className="flex items-center justify-center gap-3">
            <button onClick={() => setShuffle(s => !s)}
              className={`transition-colors ${shuffle ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"}`}>
              <Icon name="Shuffle" size={15} />
            </button>
            <button onClick={() => skipTrack(-1)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              <Icon name="SkipBack" size={18} />
            </button>
            <button onClick={togglePlay}
              className="w-9 h-9 bg-[var(--text-primary)] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-sm">
              <Icon name={player.playing ? "Pause" : "Play"} size={16} />
            </button>
            <button onClick={() => skipTrack(1)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              <Icon name="SkipForward" size={18} />
            </button>
            <button onClick={() => setRepeat(r => !r)}
              className={`transition-colors ${repeat ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"}`}>
              <Icon name="Repeat" size={15} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-body text-[var(--text-muted)] w-7 text-right">{fmt(player.progress)}</span>
            <div className="flex-1 h-1 bg-[var(--bg-hover)] rounded-full cursor-pointer relative" onClick={seek}>
              <div className="h-full bg-[var(--text-primary)] rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-[10px] font-body text-[var(--text-muted)] w-7">{fmt(player.track.duration)}</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <Icon name="Volume2" size={14} className="text-[var(--text-muted)]" />
          <div className="w-20 h-1 bg-[var(--bg-hover)] rounded-full cursor-pointer" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const vol = Math.round(((e.clientX - rect.left) / rect.width) * 100);
            setPlayer(p => ({ ...p, volume: vol }));
          }}>
            <div className="h-full bg-[var(--text-primary)] rounded-full" style={{ width: `${player.volume}%` }} />
          </div>
        </div>

        <button onClick={close} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex-shrink-0">
          <Icon name="X" size={16} />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
