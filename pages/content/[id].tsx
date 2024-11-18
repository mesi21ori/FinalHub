// pages/content/[id].tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import '../../src/app/globals.css';
import Link from "next/link";

interface Content {
    id: number;
    title: string;
    description: string;
    fileUrl: string;
    contentType: string;
    accessLevel: string;
}

interface User {
    username: string;
}

interface Comment {
    id: number;
    text: string;
    userId: number;
    contentId: number;
    user?: User;
}

const ContentDetail: React.FC = () => {
    const [content, setContent] = useState<Content | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>('');
    const [reportReason, setReportReason] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [reportingCommentId, setReportingCommentId] = useState<number | null>(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            const fetchContentDetail = async () => {
                try {
                    const response = await axios.get(`/api/content/${id}`);
                    setContent(response.data);
                } catch (error) {
                    console.error("Error fetching content:", error);
                    setError("Failed to load content.");
                } finally {
                    setLoading(false);
                }
            };

            const fetchComments = async () => {
                try {
                    const response = await axios.get(`/api/comments?contentId=${id}`);
                    setComments(response.data);
                } catch (error) {
                    console.error("Error fetching comments:", error);
                    setError("Failed to load comments.");
                }
            };

            fetchContentDetail();
            fetchComments();
        }
    }, [id]);

    const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userId = parseInt(localStorage.getItem('userId') || '', 10);
        const contentId = parseInt(id as string, 10);

        if (isNaN(userId) || isNaN(contentId)) {
            setError("Invalid user or content ID.");
            return;
        }

        try {
            const response = await axios.post('/api/comments', { text: newComment, contentId, userId });
            setComments([...comments, { ...response.data, user: { username: localStorage.getItem('userFname') || 'Unknown' } }]);
            setNewComment('');
        } catch (error) {
            console.error("Error submitting comment:", error);
            setError("Error submitting comment. Please try again.");
        }
    };


    const handleReportSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userId = parseInt(localStorage.getItem('userId') || '', 10);
        const reason = reportReason.trim();
        const commentId = reportingCommentId;

        if (!commentId || isNaN(userId) || !reason) {
            setError('Invalid data, please check your inputs.');
            return;
        }

        try {
            const response = await axios.post('/api/users/report', {
                commentId,
                userId,
                reason,
            });
            console.log(response.data);
            alert("Report submitted successfully!");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Error submitting report:", error.response || error.message);
                setError("Error submitting report. Please try again.");
            } else {

                console.error("Unknown error:", error);
                setError("An unexpected error occurred.");
            }
        }
    };


    const renderMedia = () => {
        if (!content) return null;

        const defaultCover = 'https://via.placeholder.com/300x200.png?text=Default+Cover';

        switch (content.contentType.toLowerCase()) {
            case 'photo':
                return <img src={content.fileUrl} alt={content.title} className="w-full h-auto max-w-md rounded-lg shadow-md" />;
            case 'video':
                return (
                    <video controls className="w-full h-auto max-w-md rounded-lg shadow-md">
                        <source src={content.fileUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                );
            case 'book':
                return (
                    <div className="text-center">
                        <img src={defaultCover} alt="Book Cover" className="w-full h-auto max-w-md rounded-lg shadow-md mb-2" />
                        <a href={content.fileUrl} target="_blank" rel="noopener noreferrer" className="text-[#3C2A21] underline">
                            Click here to view the book
                        </a>
                    </div>
                );
            case 'music':
                return (
                    <div className="text-center">
                        <img src={defaultCover} alt="Audio Cover" className="w-full h-auto max-w-md rounded-lg shadow-md mb-2" />
                        <audio controls className="w-full">
                            <source src={content.fileUrl} type="audio/mpeg" />
                            Your browser does not support the audio tag.
                        </audio>
                    </div>
                );
            case 'text':
                return (
                    <div className="text-center">
                        <img src={defaultCover} alt="Text Cover" className="w-full h-auto max-w-md rounded-lg shadow-md mb-2" />
                        <a href={content.fileUrl} target="_blank" rel="noopener noreferrer" className="text-[#3C2A21] underline">
                            Click here to view the text file
                        </a>
                    </div>
                );
            default:
                return <p>Unsupported content type.</p>;
        }
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;
    if (!content) return <div className="text-center">No content found.</div>;

    return (
        <div>
            <header className="w-full bg-[#3C2A21] text-[#E5E5CB] p-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl">Logo</h1>
                    <Link href="/content" className="text-[#E5E5CB]">
                        Back
                    </Link>
                </div>
            </header>
            <div className="max-w-4xl mx-auto p-4">
                <h1 className="text-3xl md:text-4xl font-bold text-[#3C2A21] text-center my-8">{content.title}</h1>
                <div className="flex justify-center mb-8">{renderMedia()}</div>
                <p className="text-lg leading-relaxed text-[#3C2A21] text-center mb-12">{content.description}</p>

                <div className="bg-[#E5E5CB] p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
                    <h2 className="text-xl font-bold text-[#3C2A21] mb-4">Comments</h2>
                    <form onSubmit={handleCommentSubmit} className="mb-6">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="w-full p-3 border border-[#3C2A21] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C2A21]"
                            required
                        />
                        <button type="submit" className="mt-2 px-4 py-2 bg-[#3C2A21] text-white rounded-lg">
                            Submit
                        </button>
                    </form>
                    <ul>
                        {comments.map((comment) => (
                            <li key={comment.id} className="mb-4 p-4 bg-[#E5E5CB] rounded-lg shadow-md flex justify-between items-center">
                                <div>
                                    <p className="text-[#3C2A21] font-semibold">{comment.user ? comment.user.username : 'Unknown User'}:</p>
                                    <p className="text-gray-700">{comment.text}</p>
                                </div>
                                <button
                                    onClick={() => setReportingCommentId(comment.id)}
                                    className="mt-2 text-sm text-blue-500 hover:underline"
                                >
                                    Report
                                </button>
                            </li>
                        ))}
                    </ul>

                </div>

                {reportingCommentId && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold mb-4">Report Comment</h3>
                            <textarea
                                value={reportReason}
                                onChange={(e) => setReportReason(e.target.value)}
                                placeholder="Reason for reporting"
                                className="w-full p-3 border border-[#3C2A21] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C2A21]"
                                required
                            />
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => setReportingCommentId(null)}
                                    className="px-4 py-2 bg-gray-300 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleReportSubmit}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                                >
                                    Report
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentDetail;
