import { useState, useRef } from "react";
import { StoryItem } from "@/data/storiesData";
import Icon from "@/components/ui/icon";

interface StoryCreatorProps {
  onClose: () => void;
  onPublish: (item: StoryItem) => void;
}

const TEXT_GRADIENTS = [
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
  "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
];

const STICKER_EMOJIS = ["🔥", "❤️", "😍", "✨", "🎉", "💫", "🌟", "🎨", "🚀", "💜", "🌈", "⚡"];

type Mode = "choose" | "image" | "text";

export default function StoryCreator({ onClose, onPublish }: StoryCreatorProps) {
  const [mode, setMode] = useState<Mode>("choose");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [storyText, setStoryText] = useState("");
  const [selectedGradient, setSelectedGradient] = useState(TEXT_GRADIENTS[0]);
  const [stickers, setStickers] = useState<{ emoji: string; x: number; y: number }[]>([]);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    setMode("image");
  };

  const addSticker = (emoji: string) => {
    setStickers(prev => [...prev, { emoji, x: 40 + Math.random() * 20, y: 35 + Math.random() * 20 }]);
    setShowStickerPicker(false);
  };

  const publish = () => {
    const item: StoryItem = {
      id: `si-new-${Date.now()}`,
      type: mode === "text" ? "text" : "image",
      image: imagePreview ?? undefined,
      text: mode === "text" ? storyText : undefined,
      textBg: mode === "text" ? selectedGradient : undefined,
      duration: 5,
      createdAt: "Сейчас",
      reactions: [],
      views: 0,
    };
    onPublish(item);
    onClose();
  };

  const canPublish = (mode === "image" && imagePreview) || (mode === "text" && storyText.trim());

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)" }}
    >
      <div className="w-full md:max-w-sm h-full md:h-auto md:rounded-3xl overflow-hidden animate-slide-up flex flex-col"
        style={{ background: "#111" }}>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white">
            <Icon name="X" size={16} />
          </button>
          <h3 className="text-white font-display font-bold text-base">Новая история</h3>
          <button
            onClick={publish}
            disabled={!canPublish}
            className="px-4 py-1.5 bg-[var(--accent-blue)] text-white rounded-2xl text-sm font-body font-medium disabled:opacity-30 transition-opacity"
          >
            Опубликовать
          </button>
        </div>

        {/* Choose mode */}
        {mode === "choose" && (
          <div className="flex-1 flex flex-col items-center justify-center gap-5 p-8">
            <p className="text-white/60 text-sm font-body">Выберите тип истории</p>
            <div className="grid grid-cols-2 gap-4 w-full">
              <button
                onClick={() => fileRef.current?.click()}
                className="aspect-square rounded-3xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center gap-3 hover:border-white/40 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Icon name="ImagePlus" size={28} className="text-white" />
                </div>
                <span className="text-white text-sm font-body font-medium">Фото</span>
              </button>
              <button
                onClick={() => setMode("text")}
                className="aspect-square rounded-3xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center gap-3 hover:border-white/40 transition-colors"
                style={{ background: "linear-gradient(135deg,rgba(102,126,234,0.2),rgba(118,75,162,0.2))" }}
              >
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Icon name="Type" size={28} className="text-white" />
                </div>
                <span className="text-white text-sm font-body font-medium">Текст</span>
              </button>
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
          </div>
        )}

        {/* Image preview mode */}
        {mode === "image" && imagePreview && (
          <div className="flex-1 flex flex-col">
            <div ref={previewRef} className="flex-1 relative overflow-hidden" style={{ minHeight: 340 }}>
              <img src={imagePreview} alt="preview" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
              {stickers.map((s, i) => (
                <span
                  key={i}
                  className="absolute text-4xl select-none cursor-pointer"
                  style={{ left: `${s.x}%`, top: `${s.y}%`, transform: "translate(-50%,-50%)" }}
                >
                  {s.emoji}
                </span>
              ))}
            </div>

            {/* Toolbar */}
            <div className="px-4 py-3 border-t border-white/10 flex items-center gap-3">
              <button
                onClick={() => { setImagePreview(null); setMode("choose"); setStickers([]); }}
                className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white"
              >
                <Icon name="Trash2" size={16} />
              </button>
              <button
                onClick={() => fileRef.current?.click()}
                className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white"
              >
                <Icon name="RefreshCw" size={16} />
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowStickerPicker(s => !s)}
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-xl"
                >
                  😊
                </button>
                {showStickerPicker && (
                  <div className="absolute bottom-12 left-0 bg-[var(--bg-card-solid)] rounded-2xl p-3 grid grid-cols-6 gap-2 shadow-[var(--shadow-float)] animate-scale-in z-10">
                    {STICKER_EMOJIS.map(emoji => (
                      <button key={emoji} onClick={() => addSticker(emoji)} className="text-2xl hover:scale-125 transition-transform">
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
              <div className="flex-1" />
              <span className="text-white/40 text-xs font-body">Нажмите «Опубликовать»</span>
            </div>
          </div>
        )}

        {/* Text mode */}
        {mode === "text" && (
          <div className="flex-1 flex flex-col">
            {/* Preview */}
            <div
              className="flex-1 flex items-center justify-center p-8 relative"
              style={{ background: selectedGradient, minHeight: 300 }}
            >
              {storyText ? (
                <p className="text-white text-2xl font-display font-bold text-center leading-snug drop-shadow-lg">
                  {storyText}
                </p>
              ) : (
                <p className="text-white/40 text-lg font-body text-center">Введите текст истории...</p>
              )}
            </div>

            {/* Text input */}
            <div className="px-4 py-3 border-t border-white/10">
              <textarea
                autoFocus
                value={storyText}
                onChange={e => setStoryText(e.target.value)}
                placeholder="Что вы хотите сказать?"
                maxLength={120}
                rows={2}
                className="w-full bg-white/10 text-white placeholder:text-white/40 rounded-2xl px-3 py-2.5 text-sm font-body outline-none border border-white/10 resize-none"
              />
              <p className="text-white/30 text-[10px] font-body text-right mt-1">{storyText.length}/120</p>
            </div>

            {/* Gradient picker */}
            <div className="px-4 pb-4">
              <p className="text-white/40 text-[10px] font-body uppercase tracking-wider mb-2">Фон</p>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {TEXT_GRADIENTS.map((grad, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedGradient(grad)}
                    className={`w-8 h-8 rounded-xl flex-shrink-0 transition-all ${selectedGradient === grad ? "ring-2 ring-white scale-110" : "opacity-70"}`}
                    style={{ background: grad }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
