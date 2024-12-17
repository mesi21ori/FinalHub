import React, { useState, useRef, useEffect } from "react";

interface Comment {
  id: number;
  username: string;
  content: string;
  date: Date;
  likes: number;
  dislikes: number;
  initial: string;
  userVote: 'like' | 'dislike' | null; // 'like', 'dislike' or null
  replies: Reply[];
}

interface Reply {
  username: string;
  content: string;
  date: Date;
  initial: string;
}

const mockUser = {
  username: "YikihlSharma-ud2go",
};

// Sample comments with the defined interface
const sampleComments: Comment[] = [
  {
    id: 1,
    username: "YikihlSharma-ud2go",
    content: "Really loved this post! The insights are great!",
    date: new Date(Date.now() - 172800000), // 2 days ago
    likes: 0,
    dislikes: 0,
    initial: "Y",
    userVote: null,
    replies: [],
  },
  {
    id: 2,
    username: "TestUser2",
    content: "I think more details should be added to this section.",
    date: new Date(Date.now() - 86400000), // 1 day ago
    likes: 0,
    dislikes: 0,
    initial: "T",
    userVote: null,
    replies: [],
  },
];

const reportOptions = [
  "Spam",
  "Unwanted content",
  "Promote terrorism",
];

const getColorForInitial = (initial: string) => {
  const colors = [
    "bg-[#c4b6ab]",
    "bg-[#25110e]",
    "bg-[#c9bab9]",
    "bg-[#201d1a]",
    "bg-[#796953]",
    "bg-[#4c6444]",
    "bg-[#782b25]",
  ];
  const index = initial.charCodeAt(0) % colors.length;
  return colors[index];
};

const timeAgo = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval} year${interval === 1 ? "" : "s"} ago`;

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval} month${interval === 1 ? "" : "s"} ago`;

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval} day${interval === 1 ? "" : "s"} ago`;

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval} hour${interval === 1 ? "" : "s"} ago`;

  interval = Math.floor(seconds / 60);
  if (interval >= 1) return `${interval} minute${interval === 1 ? "" : "s"} ago`;

  return "Just now";
};

export default function CommentPage() {
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  const [showReportId, setShowReportId] = useState<number | null>(null);
  const [selectedReportOption, setSelectedReportOption] = useState<string>("");
  const [showReplies, setShowReplies] = useState<{ [key: number]: boolean }>({});
  const [replyContent, setReplyContent] = useState<{ [key: number]: string }>({});

  const reportRef = useRef<HTMLDivElement | null>(null);

  const toggleLike = (id: number) => {
    setComments((prevComments) =>
      prevComments.map((c) => {
        if (c.id === id) {
          if (c.userVote === "like") {
            return { ...c, likes: c.likes - 1, userVote: null };
          } else {
            return {
              ...c,
              likes: c.userVote === "dislike" ? c.likes + 1 : c.likes + 1,
              dislikes: c.userVote === "dislike" ? c.dislikes - 1 : c.dislikes,
              userVote: "like",
            };
          }
        }
        return c;
      })
    );
  };

  const toggleDislike = (id: number) => {
    setComments((prevComments) =>
      prevComments.map((c) => {
        if (c.id === id) {
          if (c.userVote === "dislike") {
            return { ...c, dislikes: c.dislikes - 1, userVote: null };
          } else {
            return {
              ...c,
              dislikes: c.userVote === "like" ? c.dislikes + 1 : c.dislikes + 1,
              likes: c.userVote === "like" ? c.likes - 1 : c.likes,
              userVote: "dislike",
            };
          }
        }
        return c;
      })
    );
  };

  const toggleReport = (id: number) => {
    setShowReportId((prevId) => (prevId === id ? null : id));
  };

  const toggleReplies = (commentId: number) => {
    setShowReplies((prevState) => ({ ...prevState, [commentId]: !prevState[commentId] }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (reportRef.current && !reportRef.current.contains(event.target as Node)) {
        setShowReportId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCommentSubmit = () => {
    setComments((prevComments) => [
      ...prevComments,
      {
        id: prevComments.length + 1,
        username: mockUser.username,
        content: comment,
        date: new Date(),
        likes: 0,
        dislikes: 0,
        initial: mockUser.username[0],
        userVote: null,
        replies: [],
      },
    ]);
    setComment("");
  };

  const handleReplySubmit = (commentId: number) => {
    setComments((prevComments) =>
      prevComments.map((c) => {
        if (c.id === commentId) {
          return {
            ...c,
            replies: [
              ...c.replies,
              { username: mockUser.username, content: replyContent[commentId], date: new Date(), initial: mockUser.username[0] },
            ],
          };
        }
        return c;
      })
    );
    setReplyContent({ ...replyContent, [commentId]: "" });
  };

  const handleReplyChange = (commentId: number, content: string) => {
    setReplyContent({ ...replyContent, [commentId]: content });
  };

  return (
    <div className="bg-[#F7F6E9] min-h-screen flex flex-col items-center justify-center">
      {/* Input for new comment */}
      <div className="bg-[#E5E5CB] p-6 rounded-lg shadow-lg w-full max-w-6xl mb-6">
        <h2 className="text-xl font-bold mb-4 text-[#3C2A21]">Add a Comment</h2>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
          className="w-full p-2 border border-[#3C2A21] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C2A21]"
        />
        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 bg-[#3C2A21] text-[#E5E5CB] rounded-lg">Cancel</button>
          <button onClick={handleCommentSubmit} className="ml-2 px-4 py-2 bg-[#3C2A21] text-[#D5CEA3] rounded-lg">
            Comment
          </button>
        </div>
      </div>

      {/* Display existing comments */}
      <div className="w-full max-w-6xl space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-[#E5E5CB] p-4 rounded-lg shadow flex justify-between items-start relative">
            <div className="flex items-start">
              <div className={`${getColorForInitial(comment.initial)} text-white rounded-full w-10 h-10 flex items-center justify-center mr-4`}>
                {comment.initial}
              </div>
              <div>
                <div>
                  <span className="text-[#3C2A21] font-semibold">@{comment.username}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    {timeAgo(comment.date)}
                  </span>
                  <p className="text-[#3C2A21] mt-2">{comment.content}</p>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  {/* Like Button */}
                  <button
                    onClick={() => toggleLike(comment.id)}
                    className={`flex items-center ${comment.userVote === 'like' ? 'text-red-600' : 'text-gray-500'}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 24 24"
                      fill={comment.userVote === 'like' ? "#3C2A21" : "none"}
                      stroke="#3C2A21"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      />
                    </svg>
                    <span className={`ml-1 ${comment.userVote === 'like' ? 'text-[#3C2A21]' : 'text-gray-500'}`}>
                      {comment.likes}
                    </span>
                  </button>
                  {/* Dislike Button */}
                  <button
                    onClick={() => toggleDislike(comment.id)}
                    className={`flex items-center ${comment.userVote === 'dislike' ? 'text-red-600' : 'text-gray-500'}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 24 24"
                      fill={comment.userVote === 'dislike' ? "#3C2A21" : "none"}
                      stroke="#3C2A21"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 2.65l1.45 1.32C18.6 8.64 22 11.72 22 15.5c0 3.08-2.42 5.5-5.5 5.5-1.74 0-3.41-.81-4.5-2.09C10.91 19.19 9.24 20 7.5 20 4.42 20 2 17.58 2 14.5c0-3.78 3.4-6.86 8.55-11.54L12 2.65z"
                      />
                    </svg>
                    <span className={`ml-1 ${comment.userVote === 'dislike' ? 'text-[#3C2A21]' : 'text-gray-500'}`}>
                      {comment.dislikes}
                    </span>
                  </button>
                </div>
                {/* Reply Section */}
                <button onClick={() => toggleReplies(comment.id)} className="mt-2 text-[#782b25]">
                  {showReplies[comment.id] ? "Hide Replies" : "Show Replies"}
                </button>
                {showReplies[comment.id] && (
                  <div className="mt-2 space-y-2">
                    {comment.replies.map((reply, index) => (
                      <div key={index} className="bg-[#D5CEA3] p-2 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className={`${getColorForInitial(reply.initial)} text-white rounded-full w-8 h-8 flex items-center justify-center`}>
                            {reply.initial}
                          </div>
                          <div>
                            <span className="text-[#3C2A21]">{reply.username}</span>
                            <span className="text-sm text-gray-500 ml-2">{timeAgo(reply.date)}</span>
                          </div>
                        </div>
                        <p className="text-[#3C2A21] mt-2">{reply.content}</p>
                      </div>
                    ))}
                    <textarea
                      value={replyContent[comment.id] || ""}
                      onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                      placeholder="Write a reply..."
                      className="w-full p-2 border border-[#3C2A21] rounded-lg mt-2"
                    />
                    <button
                      onClick={() => handleReplySubmit(comment.id)}
                      className="px-4 py-2 bg-[#3C2A21] text-[#E5E5CB] rounded-lg mt-2"
                    >
                      Submit Reply
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Report Button */}
            <button onClick={() => toggleReport(comment.id)} className="text-[#782b25] relative">Report</button>

            {/* Report Dropdown */}
            {showReportId === comment.id && (
              <div ref={reportRef} className="absolute top-10 right-0 bg-[#E5E5CB] shadow-lg rounded-lg p-4 w-48 z-10">
                {reportOptions.map((option, index) => (
                  <label key={index} className="block">
                    <input
                      type="radio"
                      name={`reportOption-${comment.id}`} // Backticks for template literals
                      value={option}
                      checked={selectedReportOption === option}
                      onChange={() => setSelectedReportOption(option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
                <button
                  className="mt-4 px-4 py-2 bg-[#3C2A21] text-[#D5CEA3] rounded-lg w-full"
                  onClick={() => {
                    console.log(`Reported ${comment.id} for ${selectedReportOption}`);
                    setShowReportId(null); // Close the dropdown after reporting
                  }}
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}