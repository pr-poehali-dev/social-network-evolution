import { Story } from "@/data/storiesData";
import Icon from "@/components/ui/icon";

interface StoriesBarProps {
  stories: Story[];
  onStoryClick: (index: number) => void;
  onAddStory: () => void;
}

export default function StoriesBar({ stories, onStoryClick, onAddStory }: StoriesBarProps) {
  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 mb-5">
      {/* My story / add story */}
      <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
        <button
          onClick={() => stories[0].userId === "me" ? onStoryClick(0) : onAddStory()}
          className="relative"
        >
          {/* Ring */}
          <div className={`w-[62px] h-[62px] rounded-2xl p-[2.5px] ${
            stories[0].userId === "me" && !stories[0].seen
              ? "bg-gradient-to-br from-[#f5576c] via-[#f093fb] to-[#4facfe]"
              : "bg-[var(--border-light)]"
          }`}>
            <div className={`w-full h-full rounded-[13px] bg-gradient-to-br ${stories[0].gradient} flex items-center justify-center text-white text-lg font-bold font-display overflow-hidden`}>
              {stories[0].userId === "me"
                ? stories[0].userName.split(" ").map(n => n[0]).join("").slice(0, 2)
                : "+"
              }
            </div>
          </div>
          {/* Add button */}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[var(--accent-blue)] rounded-full flex items-center justify-center border-2 border-[var(--bg-base)]">
            <Icon name="Plus" size={10} className="text-white" />
          </div>
        </button>
        <span className="text-[10px] font-body text-[var(--text-muted)] truncate w-16 text-center">Ваша</span>
      </div>

      {/* Other stories */}
      {stories.slice(1).map((story, i) => {
        const realIdx = i + 1;
        const hasUnseen = !story.seen;
        return (
          <div key={story.id} className="flex flex-col items-center gap-1.5 flex-shrink-0">
            <button onClick={() => onStoryClick(realIdx)} className="relative">
              {/* Gradient ring for unseen */}
              <div className={`w-[62px] h-[62px] rounded-2xl p-[2.5px] transition-all ${
                hasUnseen
                  ? "bg-gradient-to-br from-[#f5576c] via-[#f093fb] to-[#4facfe]"
                  : "bg-[var(--border-light)]"
              }`}>
                <div className={`w-full h-full rounded-[13px] bg-gradient-to-br ${story.gradient} flex items-center justify-center text-white text-sm font-bold font-display overflow-hidden relative`}>
                  {story.userName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  {/* Seen overlay */}
                  {!hasUnseen && (
                    <div className="absolute inset-0 bg-black/30 rounded-[13px]" />
                  )}
                </div>
              </div>

              {/* Unread dot */}
              {hasUnseen && (
                <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-[var(--accent-red)] rounded-full border-2 border-[var(--bg-base)]" />
              )}
            </button>
            <span className="text-[10px] font-body text-[var(--text-muted)] truncate w-16 text-center">
              {story.userName.split(" ")[0]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
