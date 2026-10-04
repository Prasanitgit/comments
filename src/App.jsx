import { useEffect, useRef, useState } from "react";
import CommentList from "./components/CommentList";
import { fetchComments, TOTAL_COMMENTS } from "./data/comments";

export default function App() {
  const [comments, setComments] = useState([]); // comments loaded so far
  const [loading, setLoading] = useState(false); // used to show "Loading..."
  const isLoadingRef = useRef(false); // stops two downloads from starting at once

  const hasMore = comments.length < TOTAL_COMMENTS;

  async function loadMore() {
    if (isLoadingRef.current || !hasMore) return;

    isLoadingRef.current = true;
    setLoading(true);

    const newComments = await fetchComments(comments.length);
    setComments((old) => [...old, ...newComments]);

    isLoadingRef.current = false;
    setLoading(false);
  }

  // Load the first page when the app opens
  useEffect(() => {
    loadMore();
  }, []);

  return (
    <div className="flex h-dvh flex-col bg-white text-gray-900">
      <header className="border-b border-gray-200 px-4 py-3">
        <h1 className="text-xl font-bold">{TOTAL_COMMENTS.toLocaleString()} Comments</h1>
        <p className="text-sm text-gray-500">Loaded {comments.length} so far</p>
      </header>

      <CommentList
        comments={comments}
        loading={loading}
        hasMore={hasMore}
        onReachEnd={loadMore}
      />
    </div>
  );
}