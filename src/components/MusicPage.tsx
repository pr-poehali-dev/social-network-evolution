import { useState } from "react";
import { TRACKS, PLAYLISTS } from "@/data/musicData";
import { PlayerState, Track } from "@/pages/Index";
import Icon from "@/components/ui/icon";

interface MusicPageProps {
  player: PlayerState;
  setPlayer: React.Dispatch<React.SetStateAction<PlayerState>>;
}

const fmt = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

const MusicPage = ({ player, setPlayer }: MusicPageProps) => {
  const [tab, setTab] = useState<"tracks" | "playlists" | "artists">("tracks");
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState<Set<string>>(new Set(["t1", "t3"]));

  const playTrack = (track: Track) => {
    setPlayer(p => ({
      ...p,
      track,
      playing: p.track?.id === track.id ? !p.playing : true,
      progress: p.track?.id === track.id ? p.progress : 0,
    }));
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  };

  const filtered = TRACKS.filter(t =>
    !search || t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.artist.toLowerCase().includes(search.toLowerCase())
  );

  const artists = Array.from(new Set(TRACKS.map(t => t.artist))).map(name => ({
    name,
    count: TRACKS.filter(t => t.artist === name).length,
    cover: TRACKS.find(t => t.artist === name)!.cover,
  }));

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Музыка</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--text-primary)] text-white rounded-xl text-sm font-body font-medium hover:opacity-90 transition-opacity">
          <Icon name="Plus" size={14} />
          Загрузить
        </button>
      </div>

      <div className="flex items-center gap-2 px-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border-light)] rounded-2xl mb-5 focus-within:border-[var(--text-primary)] transition-colors">
        <Icon name="Search" size={15} className="text-[var(--text-muted)]" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Треки, исполнители..."
          className="flex-1 bg-transparent text-sm font-body text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
        />
      </div>

      <div className="flex gap-1 mb-6 bg-[var(--bg-card)] rounded-xl p-1 border border-[var(--border-light)]">
        {(["tracks", "playlists", "artists"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-lg text-sm font-body font-medium transition-all duration-200
              ${tab === t ? "bg-[var(--text-primary)] text-white" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>
            {t === "tracks" ? "Треки" : t === "playlists" ? "Плейлисты" : "Исполнители"}
          </button>
        ))}
      </div>

      {tab === "tracks" && (
        <div className="space-y-1">
          {filtered.map((track, idx) => {
            const isPlaying = player.track?.id === track.id && player.playing;
            const isCurrent = player.track?.id === track.id;
            return (
              <div key={track.id}
                onClick={() => playTrack(track)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group
                  ${isCurrent ? "bg-[var(--bg-hover)]" : "hover:bg-[var(--bg-hover)]"}`}>
                <span className={`w-5 text-center text-xs font-body flex-shrink-0
                  ${isCurrent ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] group-hover:hidden"}`}>
                  {isPlaying ? <Icon name="Volume2" size={14} /> : isCurrent ? <Icon name="Pause" size={14} /> : idx + 1}
                </span>
                <span className="hidden group-hover:block w-5 text-center flex-shrink-0 text-[var(--text-muted)]">
                  {isCurrent && !isPlaying ? <Icon name="Play" size={14} /> : !isCurrent ? <Icon name="Play" size={14} /> : null}
                </span>

                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-body font-medium truncate ${isCurrent ? "text-[var(--text-primary)]" : "text-[var(--text-primary)]"}`}>
                    {track.title}
                  </p>
                  <p className="text-xs font-body text-[var(--text-muted)] truncate">{track.artist} — {track.album}</p>
                </div>

                <button onClick={e => toggleLike(track.id, e)}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100
                    ${liked.has(track.id) ? "opacity-100 text-[var(--accent-red)]" : "text-[var(--text-muted)] hover:text-[var(--accent-red)]"}`}>
                  <Icon name="Heart" size={14} className={liked.has(track.id) ? "fill-current" : ""} />
                </button>

                <span className="text-xs font-body text-[var(--text-muted)] w-9 text-right flex-shrink-0">{fmt(track.duration)}</span>
              </div>
            );
          })}
        </div>
      )}

      {tab === "playlists" && (
        <div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {PLAYLISTS.map(pl => (
              <div key={pl.id} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-all group">
                <div className="relative h-32 overflow-hidden">
                  <img src={pl.cover} alt={pl.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <button className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0">
                    <Icon name="Play" size={14} className="text-[var(--text-primary)] ml-0.5" />
                  </button>
                </div>
                <div className="p-3">
                  <p className="font-body font-semibold text-sm text-[var(--text-primary)]">{pl.name}</p>
                  <p className="font-body text-xs text-[var(--text-muted)]">{pl.count} треков</p>
                </div>
              </div>
            ))}
            <button className="bg-[var(--bg-card)] border border-dashed border-[var(--border-light)] rounded-2xl h-full min-h-[160px] flex flex-col items-center justify-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:border-[var(--text-muted)] transition-all cursor-pointer">
              <Icon name="Plus" size={20} />
              <span className="text-xs font-body">Новый плейлист</span>
            </button>
          </div>

          <p className="text-xs font-body font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Понравившиеся</p>
          <div className="space-y-1">
            {TRACKS.filter(t => liked.has(t.id)).map(track => (
              <div key={track.id} onClick={() => playTrack(track)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-[var(--bg-hover)] transition-colors group">
                <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body font-medium text-[var(--text-primary)] truncate">{track.title}</p>
                  <p className="text-xs font-body text-[var(--text-muted)] truncate">{track.artist}</p>
                </div>
                <span className="text-xs font-body text-[var(--text-muted)]">{fmt(track.duration)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "artists" && (
        <div className="grid grid-cols-2 gap-3">
          {artists.map(artist => (
            <div key={artist.name} className="bg-[var(--bg-card)] border border-[var(--border-light)] rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <img src={artist.cover} alt={artist.name} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <p className="font-body font-semibold text-sm text-[var(--text-primary)] truncate">{artist.name}</p>
                <p className="font-body text-xs text-[var(--text-muted)]">{artist.count} трека</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MusicPage;