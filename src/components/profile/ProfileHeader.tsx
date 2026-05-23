import { useRef } from "react";
import Icon from "@/components/ui/icon";
import { ProfileVersion, VERSION_META, getInitials } from "./ProfileTypes";

interface ProfileHeaderProps {
  userName: string;
  editing: boolean;
  coverImage: string | null;
  avatarImage: string | null;
  activeVersion: ProfileVersion;
  showVersionPicker: boolean;
  onCoverChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleVersionPicker: () => void;
  onSelectVersion: (v: ProfileVersion) => void;
}

export default function ProfileHeader({
  userName,
  editing,
  coverImage,
  avatarImage,
  activeVersion,
  showVersionPicker,
  onCoverChange,
  onAvatarChange,
  onToggleVersionPicker,
  onSelectVersion,
}: ProfileHeaderProps) {
  const coverRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);

  const vMeta = VERSION_META[activeVersion];

  return (
    <div className="relative mb-16">
      {/* Cover */}
      <div
        className="cover-upload h-44 rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] relative"
        onClick={() => editing && coverRef.current?.click()}
        style={coverImage ? { backgroundImage: `url(${coverImage})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
      >
        {!coverImage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 opacity-30">
              <div className="w-12 h-12 rounded-full border-2 border-white/40 flex items-center justify-center">
                <Icon name="ImagePlus" size={20} className="text-white" />
              </div>
            </div>
          </div>
        )}
        {editing && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-10">
            <div className="glass px-4 py-2 rounded-full flex items-center gap-2 text-white text-sm font-body">
              <Icon name="Camera" size={14} />
              Сменить обложку
            </div>
          </div>
        )}
        <input ref={coverRef} type="file" accept="image/*" onChange={onCoverChange} className="hidden" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Avatar */}
      <div className="absolute -bottom-10 left-5 flex items-end gap-3">
        <div
          className={`relative w-20 h-20 rounded-2xl shadow-[var(--shadow-float)] border-4 overflow-hidden ${editing ? "cursor-pointer" : ""}`}
          style={{ borderColor: "var(--bg-base)" }}
          onClick={() => editing && avatarRef.current?.click()}
        >
          {avatarImage ? (
            <img src={avatarImage} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] to-[#4a4a8a] flex items-center justify-center text-white text-2xl font-bold font-display">
              {getInitials(userName)}
            </div>
          )}
          {editing && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Icon name="Camera" size={16} className="text-white" />
            </div>
          )}
          <input ref={avatarRef} type="file" accept="image/*" onChange={onAvatarChange} className="hidden" />
        </div>
      </div>

      {/* Version picker button */}
      <div className="absolute top-3 right-3 flex gap-2">
        <button
          onClick={onToggleVersionPicker}
          className="glass px-3 py-1.5 rounded-full text-xs font-body font-medium flex items-center gap-1.5 text-white"
        >
          <Icon name={vMeta.icon} size={12} />
          {vMeta.label}
          <Icon name="ChevronDown" size={11} />
        </button>
      </div>

      {/* Version picker dropdown */}
      {showVersionPicker && (
        <div className="absolute top-12 right-3 z-20 glass-card rounded-2xl p-2 w-52 animate-scale-in">
          {(Object.entries(VERSION_META) as [ProfileVersion, typeof VERSION_META[ProfileVersion]][]).map(([key, meta]) => (
            <button
              key={key}
              onClick={() => onSelectVersion(key)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-body transition-all text-left
                ${activeVersion === key ? "bg-[var(--bg-hover)]" : "hover:bg-[var(--bg-hover)]"}`}
            >
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: meta.color + "22" }}>
                <Icon name={meta.icon} size={13} style={{ color: meta.color }} />
              </div>
              <span className="text-[var(--text-primary)]">{meta.label}</span>
              {activeVersion === key && <Icon name="Check" size={13} className="ml-auto text-[var(--accent-blue)]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
