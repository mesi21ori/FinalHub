import React, { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const RequestAccess = () => {
    const router = useRouter();
    const [contentId, setContentId] = useState<string | null>(null);
    const [reason, setReason] = useState<string>('');
    const [file, setFile] = useState<File | null>(null); // Add state to store the file
    const [loading, setLoading] = useState(false); // Loading state to show when submitting

    // Fetch `contentId` from `router.query` after `router.isReady`
    useEffect(() => {
        if (router.isReady && router.query.contentId) {
            setContentId(router.query.contentId as string);
            console.log("Content ID retrieved from query:", router.query.contentId);
        }
    }, [router.isReady, router.query.contentId]);

    // Handle file selection
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleRequestAccess = async () => {
        const userId = localStorage.getItem('userId');

        if (!userId || !contentId) {
            alert("User ID or content ID is missing.");
            return;
        }

        if (!reason) {
            alert("Please provide a reason for requesting access.");
            return;
        }

        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('contentId', contentId);
        formData.append('reason', reason);
        if (file) {
            formData.append('file', file); // Add the file to formData
        }

        setLoading(true); // Set loading state to true

        try {
            const response = await axios.post('/api/reviewer/access-requests', formData);
            console.log("Response:", response.data);
            alert('Your access request has been submitted.');
            router.push(`/content`); // Correct the URL
        } catch (error) {
            console.error("Error requesting access:", error);
            alert('There was an error requesting access.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-[#E5E5CB]">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Request Access</h2>
                <p className="mb-4">You need to request access to this restricted content.</p>
                
                {/* Reason Textarea */}
                <textarea
                    className="w-full p-2 mb-4 border rounded"
                    placeholder="Provide a reason for accessing this content"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={4}
                />

                {/* File Upload */}
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full p-2 mb-4 border rounded"
                />

                <button
                    className="bg-[#3C2A21] text-white px-4 py-2 rounded"
                    onClick={handleRequestAccess}
                    disabled={loading} // Disable button when loading
                >
                    {loading ? "Submitting..." : "Request Access"}
                </button>
            </div>
        </div>
    );
};

export default RequestAccess;
