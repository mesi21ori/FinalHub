"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "../../layout";
import CommentPage from "../../../../../components/Comment";  
import Footer from "../../../../../components/Footer";
import LogoNavBar from "../../../../../components/LogoNavBar";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Worker } from "@react-pdf-viewer/core"; 
import "@react-pdf-viewer/core/lib/styles/index.css"; 
import { FiArrowLeft } from "react-icons/fi";

const PDFViewer = dynamic(() => import("@react-pdf-viewer/core").then(mod => mod.Viewer), { ssr: false }); 

const ViewContent = () => {
  const [content, setContent] = useState<any>(null);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState<number>(0); // Likes count
  const [dislikes, setDislikes] = useState<number>(0); // Dislikes count
  const [isLiked, setIsLiked] = useState<boolean>(false); // Track if content is liked
  const [isDisliked, setIsDisliked] = useState<boolean>(false); // Track if content is disliked
  const router = useRouter(); 
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id; // Ensure `id` is a string

  useEffect(() => {
    if (id) {
      fetchContent(id);
    }
  }, [id]);

  const fetchContent = async (id: string) => {
    try {
      const response = await fetch(`/api/content/getContentById?id=${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch content");
      }
      const data = await response.json();
      setContent(data);
      setLikes(data.numberOfLikes || 0);
      setDislikes(data.numberOfDislikes || 0);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };
  
  const handleLike = async () => {
    if (isLiked) {
     
      await updateLikesDislikes(false, isDisliked);
    } else {
     
      await updateLikesDislikes(true, false);
    }
  };
  
  const handleDislike = async () => {
    if (isDisliked) {
     
      await updateLikesDislikes(isLiked, false);
    } else {
    
      await updateLikesDislikes(false, true);
    }
  };
  
  const updateLikesDislikes = async (likeStatus: boolean, dislikeStatus: boolean) => {
    try {
      const response = await fetch('/api/content/updateLikesDislikes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentId: content?.id,
          likeStatus,
          dislikeStatus,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setLikes(data.likes >= 0 ? data.likes : 0); 
        setDislikes(data.dislikes >= 0 ? data.dislikes : 0); 
        setIsLiked(likeStatus);
        setIsDisliked(dislikeStatus);
      } else {
        console.error('Error updating likes/dislikes:', data.message);
      }
    } catch (error) {
      console.error('Error updating likes/dislikes:', error);
    }
  };
  

  const renderMediaContent = () => {
    switch (content?.contentType) {
      case "VIDEO":
        return (
          <div className="text-center">
            {content.fileUrl ? (
              <video controls className="w-full max-w-2xl rounded-lg shadow-lg" style={{ maxHeight: "400px" }}>
                <source src={content.fileUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <p>No video available</p>
            )}
          </div>
        );

      case "MUSIC":
        return (
          <div className="text-center">
            {content.fileUrl ? (
              <audio controls className="w-full max-w-lg">
                <source src={content.fileUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <p>No music available</p>
            )}
          </div>
        );

      case "PHOTO":
        return (
          <div className="text-center">
            {content.fileUrl ? (
              <Image
                src={content.fileUrl}
                alt="Uploaded Photo"
                width={800}
                height={600}
                className="rounded-lg shadow-lg"
              />
            ) : (
              <p>No photo available</p>
            )}
          </div>
        );

      case "BOOK":
        return (
          <div className="text-center">
            {content.fileUrl ? (
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <PDFViewer fileUrl={content.fileUrl} />
              </Worker>
            ) : (
              <p>No PDF available</p>
            )}
          </div>
        );

      default:
        return <p>Unsupported content type</p>;
    }
  };

  const renderMetadata = () => {
    return (
      
      <div className="flex flex-col space-y-4 mt-6">
         <button
                onClick={() => router.back()} 
                className="absolute top-14 left-8 text-[#3a2f2c] p-2 rounded-full hover:bg-[#F7F6E9]"
              >
                <FiArrowLeft size={24} />
              </button>
        {/* Content-specific metadata */}
        {content?.contentType === "VIDEO" && content?.videoDetails && (
          <>
            <p><strong>Publisher:</strong> {content.videoDetails.publisher || "N/A"}</p>
            <p><strong>Director:</strong> {content.videoDetails.director || "N/A"}</p>
            <p><strong>Producer:</strong> {content.videoDetails.producer || "N/A"}</p>
            <p><strong>Subtitles:</strong> {Array.isArray(content.videoDetails.subtitles) ? content.videoDetails.subtitles.join(", ") : "No subtitles available"}</p>
            <p><strong>Age Rating:</strong> {content.videoDetails.ageRating || "N/A"}</p>
          </>
        )}

        {content?.contentType === "MUSIC" && content?.musicDetails && (
          <>
            <p><strong>Singer:</strong> {content.musicDetails.singer || "N/A"}</p>
            <p><strong>Composer:</strong> {content.musicDetails.composer || "N/A"}</p>
            <p><strong>Music Producer:</strong> {content.musicDetails.musicProducer || "N/A"}</p>
            <p><strong>Instruments:</strong> {content.musicDetails.instrument?.join(", ") || "No instruments available"}</p>
          </>
        )}

        {content?.contentType === "BOOK" && content?.bookDetails && (
          <>
            <p><strong>Publisher:</strong> {content.bookDetails.publisher || "N/A"}</p>
            <p><strong>Author:</strong> {content.bookDetails.author || "N/A"}</p>
            <p><strong>Co-authors:</strong> {content.bookDetails.coAuthors?.join(", ") || "No co-authors"}</p>
            <p><strong>ISBN:</strong> {content.bookDetails.ISBN || "N/A"}</p>
          </>
        )}

        {/* General content metadata (Uploader, Event Type) */}
        <p><strong>Uploader:</strong> {content.uploader.firstName} {content.uploader.lastName}</p>
        <p><strong>Event Type:</strong> {content.eventType || "N/A"}</p>
      </div>
    );
  };

  if (!id) return <p className="text-center mt-10">Invalid content ID.</p>;
  if (!content) return <p className="text-center mt-10">Loading...</p>;

  return (
<Layout>
  <div className="bg-[#F7F6E9] min-h-screen flex flex-col w-full ">
    <div className="w-full shadow-md bg-[#3C2A21] text-[#D5CEA3]">
      <LogoNavBar />
    </div>

    {/* Institution Logo and Name */}
    <div className="flex items-center p-4">
      {/* Logo */}
      <div className="rounded-full overflow-hidden w-10 h-10 mr-3">
        <Image src={content.institution?.photo || "/path/to/default-logo.png"} alt="Institution Logo" width={40} height={40} />
      </div>
      {/* Institution Name */}
      <span className="text-md font-semibold text-[#3C2A21]">
        {content.institution?.name || "Institution Name"}
      </span>
    </div>

    <div className="w-full max-w-5xl mx-auto p-16">
      {/* Title and Description at the top */}
      <h1 className="text-3xl font-bold text-center mb-4 text-[#3C2A21]">
        {content.title || "Untitled"}
      </h1>
      <div className="mt-4 text-gray-800 mb-6">
        <p>{content.description}</p>
      </div>

      {/* Render media content (Video, Music, Image, etc.) */}
      {renderMediaContent()}

      {/* Render metadata under the media */}
      {renderMetadata()}

      {/* Like/Dislike and Comment Button */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={handleLike}
          className="bg-[#f7f4f0] text-[#3C2A21] p-2 rounded-lg">
          👍 Like {likes}
        </button>
        <button
          onClick={handleDislike}
          className="bg-[#f7f4f0] text-[#3C2A21] p-2 rounded-lg">
          👎 Dislike {dislikes}
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="bg-[#f7f4f0] text-[#3C2A21] p-2 rounded-lg">
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>
      </div>

      {/* Comment Section */}
      {showComments && content && (
        <CommentPage contentId={content.id} />
      )}
    </div>
    <Footer />
  </div>
</Layout>

  );
};

export default ViewContent;
