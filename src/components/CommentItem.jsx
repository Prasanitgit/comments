// Shows ONE comment. It knows nothing about scrolling.

const AVATAR_COLORS = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-orange-500",
];

export default function CommentItem({ comment }) {
  const color = AVATAR_COLORS[comment.id % AVATAR_COLORS.length];

  return (
    <div className="flex h-full gap-3 overflow-hidden border-b border-gray-200 px-3 py-3 sm:px-4">
      {/* Round avatar with the first letter of the name */}
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-semibold text-white sm:h-10 sm:w-10 ${color}`}
      >
        {comment.author[0]}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-sm font-semibold">@{comment.author.toLowerCase()}</span>
          <span className="text-xs text-gray-400">#{comment.id}</span>
        </div>
        {/* line-clamp-3 = show at most 3 lines, so every row has the same height */}
        <p className="line-clamp-3 text-sm text-gray-700">{comment.text}</p>
      </div>
    </div>
  );
}