import React, { useState, useRef, useEffect } from "react";

const mockUser = {
  username: "YikihlSharma-ud2go",
};

const sampleComments = [
  {
    id: 1,
    username: "YikihlSharma-ud2go",
    content: "Really loved this post! The insights are great!",
    date: new Date(Date.now() - 172800000), // 2 days ago
    likes: 0,
    dislikes: 0,
    initial: "Y",
    userVote: null as 'like' | 'dislike' | null,
    replies: [] as Array<{ username: string; content: string; date: Date }>,
  },
  {
    id: 2,
    username: "TestUser2",
    content: "I think more details should be added to this section.",
    date: new Date(Date.now() - 86400000), // 1 day ago
    likes: 0,
    dislikes: 0,
    initial: "T",
    userVote: null as 'like' | 'dislike' | null,
    replies: [] as Array<{ username: string; content: string; date: Date }>,
  },
];

const reportOptions = [
  "Spam",
  "Unwanted content",
  "Promote terrorism",
];

const getColorForInitial = (initial: string) => {
  const colors = [
    "bg-yellow-500",
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-orange-500",
  ];
  const index = initial.charCodeAt(0) % colors.length;
  return colors[index];
};

const timeAgo = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval} year${interval === 1 ? '' : 's'} ago`;

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval} month${interval === 1 ? '' : 's'} ago`;

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval} day${interval === 1 ? '' : 's'} ago`;

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval} hour${interval === 1 ? '' : 's'} ago`;

  interval = Math.floor(seconds / 60);
  if (interval >= 1) return `${interval} minute${interval === 1 ? '' : 's'} ago`;

  return 'Just now';
};

export default function CommentPage() {
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState(sampleComments);
  const [showReportId, setShowReportId] = useState<number | null>(null);
  const [selectedReportOption, setSelectedReportOption] = useState<string>("");
  const [showReplies, setShowReplies] = useState<{ [key: number]: boolean }>({});
  const [replyContent, setReplyContent] = useState<{ [key: number]: string }>({});

  const reportRef = useRef<HTMLDivElement | null>(null);

  const toggleLike = (id: number) => {
    setComments((prevComments) =>
      prevComments.map((c) => {
        if (c.id === id) {
          if (c.userVote === 'like') {
            return { ...c, likes: c.likes - 1, userVote: null };
          } else {
            return {
              ...c,
              likes: c.userVote === 'dislike' ? c.likes + 1 : c.likes + 1,
              dislikes: c.userVote === 'dislike' ? c.dislikes - 1 : c.dislikes,
              userVote: 'like',
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
          if (c.userVote === 'dislike') {
            return { ...c, dislikes: c.dislikes - 1, userVote: null };
          } else {
            return {
              ...c,
              dislikes: c.userVote === 'like' ? c.dislikes + 1 : c.dislikes + 1,
              likes: c.userVote === 'like' ? c.likes - 1 : c.likes,
              userVote: 'dislike',
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
    setShowReplies((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
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
    if (comment.trim() === "") return; // Prevent empty comments
    setComments((prev) => [
      ...prev,
      {
        id: prev.length + 1,
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
    if (replyContent[commentId]?.trim() === "") return; // Prevent empty replies
    setComments((prevComments) =>
      prevComments.map((c) => {
        if (c.id === commentId) {
          return {
            ...c,
            replies: [
              ...c.replies,
              { username: mockUser.username, content: replyContent[commentId], date: new Date() },
            ],
          };
        }
        return c;
      })
    );
    setReplyContent((prev) => ({ ...prev, [commentId]: "" }));
  };

  const handleReplyChange = (commentId: number, content: string) => {
    setReplyContent((prev) => ({ ...prev, [commentId]: content }));
  };

  return (
    <div className="bg-[#E5E5CB] min-h-screen flex flex-col items-center justify-center">
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
            <div className="flex items-center">
              <div className={`${getColorForInitial(comment.initial)} text-white rounded-full w-10 h-10 flex items-center justify-center mr-4`}>
                {comment.initial}
              </div>
              <div>
                <span className="text-[#3C2A21] font-semibold">{comment.username}</span>
                <p className="text-gray-600">{comment.content}</p>
                <span className="text-gray-400 text-sm">{timeAgo(comment.date)}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex space-x-2">
                <button onClick={() => toggleLike(comment.id)}>👍 {comment.likes}</button>
                <button onClick={() => toggleDislike(comment.id)}>👎 {comment.dislikes}</button>
                <button onClick={() => toggleReplies(comment.id)}>Reply</button>
                <button onClick={() => toggleReport(comment.id)}>Report</button>
              </div>
            </div>
            {showReportId === comment.id && (
              <div ref={reportRef} className="absolute right-0 bg-white border rounded-md shadow-lg p-4">
                <h4 className="font-bold">Report Comment</h4>
                {reportOptions.map((option) => (
                  <button key={option} onClick={() => { setSelectedReportOption(option); toggleReport(comment.id); }} className="block w-full text-left">
                    {option}
                  </button>
                ))}
              </div>
            )}
            {showReplies[comment.id] && (
              <div className="mt-4">
                {comment.replies.map((reply, index) => (
                  <div key={index} className="bg-gray-200 p-2 rounded-md mt-2">
                    <span className="font-semibold">{reply.username}:</span> {reply.content}
                    <span className="text-gray-400 text-sm"> {timeAgo(reply.date)}</span>
                  </div>
                ))}
                <div className="flex mt-2">
                  <textarea
                    value={replyContent[comment.id] || ""}
                    onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                    placeholder="Write your reply here..."
                    className="w-full p-2 border border-[#3C2A21] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C2A21]"
                  />
                  <button onClick={() => handleReplySubmit(comment.id)} className="ml-2 px-4 py-2 bg-[#3C2A21] text-[#D5CEA3] rounded-lg">Reply</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
