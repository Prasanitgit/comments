// Fake data + a fake "API" so you can test without a backend.

export const TOTAL_COMMENTS = 1000; // how many comments exist in total
export const PAGE_SIZE = 20; // how many we "download" at a time

const NAMES = ["Aarav", "Priya", "Liam", "Sofia", "Kenji", "Meera", "Noah", "Ananya"];

const SENTENCES = [
  "This was exactly the explanation I needed.",
  "I watched it twice and still learned something new.",
  "Can you make a follow-up video about performance?",
  "Subscribed after the first minute.",
  "I tried this in my own project and it worked.",
  "Please slow down a little when you show the code.",
  "Thanks for keeping it practical.",
];

// Builds one comment. Comment number 0, 1, 2 ... gets a different length of text.
function makeComment(i) {
  const sentenceCount = (i % 5) + 1; // 1 to 5 sentences
  let text = "";
  for (let k = 0; k < sentenceCount; k++) {
    text += SENTENCES[(i + k) % SENTENCES.length] + " ";
  }
  return {
    id: i + 1,
    author: NAMES[i % NAMES.length],
    text: text.trim(),
  };
}

// Pretends to call a server. "offset" = how many comments we already have.
export function fetchComments(offset) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const end = Math.min(offset + PAGE_SIZE, TOTAL_COMMENTS);
      const list = [];
      for (let i = offset; i < end; i++) {
        list.push(makeComment(i));
      }
      resolve(list);
    }, 500); // wait half a second, like a real network call
  });
}