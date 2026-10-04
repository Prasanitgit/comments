import { useState } from "react";
import CommentItem from "./CommentItem";

// IDEA: with 1000 comments, don't put 1000 rows on the page.
// Only draw the few rows the user can actually see.

const ROW_HEIGHT = 120; // every row is exactly 120px tall (this keeps the math simple)
const EXTRA_ROWS = 5; // extra rows above/below the screen so fast scrolling has no blank gaps

export default function CommentList({ comments, loading, hasMore, onReachEnd }) {
  // How far the user has scrolled down, in pixels
  const [scrollTop, setScrollTop] = useState(0);

  // 1. Which row is at the top of the screen right now?
  const firstVisibleRow = Math.floor(scrollTop / ROW_HEIGHT);

  // 2. How many rows fit on the screen?
  const rowsOnScreen = Math.ceil(window.innerHeight / ROW_HEIGHT);

  // 3. Which rows should we draw?
  const startRow = Math.max(0, firstVisibleRow - EXTRA_ROWS);
  const endRow = Math.min(comments.length, firstVisibleRow + rowsOnScreen + EXTRA_ROWS);
  const visibleComments = comments.slice(startRow, endRow);

  function handleScroll(e) {
    const box = e.currentTarget;
    setScrollTop(box.scrollTop);

    // Near the bottom? Ask the parent to load more comments.
    const distanceFromBottom = box.scrollHeight - box.scrollTop - box.clientHeight;
    if (distanceFromBottom < 300) {
      onReachEnd();
    }
  }

  return (
    // This box has the scrollbar
    <div onScroll={handleScroll} className="min-h-0 flex-1 overflow-y-auto">
      {/* This tall empty box makes the scrollbar act as if ALL comments exist */}
      <div className="relative" style={{ height: comments.length * ROW_HEIGHT }}>
        {visibleComments.map((comment, index) => (
          <div
            key={comment.id}
            className="absolute left-0 right-0"
            // Put each row at its correct place down the page
            style={{ top: (startRow + index) * ROW_HEIGHT, height: ROW_HEIGHT }}
          >
            <CommentItem comment={comment} />
          </div>
        ))}
      </div>

      <p className="p-4 text-center text-sm text-gray-500">
        {loading ? "Loading more comments..." : !hasMore ? "No more comments" : ""}
      </p>
    </div>
  );
}