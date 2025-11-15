export default function AnswerFeedback({ onLike, onDislike }) {
  return (
    <div className="flex gap-2 mt-1">
      <button
        onClick={onLike}
        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
      >
        👍 Like
      </button>
      <button
        onClick={onDislike}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        👎 Dislike
      </button>
    </div>
  );
}