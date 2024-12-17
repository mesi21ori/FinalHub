// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";

// import Layout from "../layout";

// import Footer from "../../../../components/Footer";
// import LogoNavBar from "../../../../components/LogoNavBar";
// import CommentPage from "../../../../components/Comment";


// interface ViewContentProps {
//   uploadedImageFile?: File | null;
//   uploadedText?: string;
//   contentType?: "music" | "video" | "book" | "article" | "photo";
//   title?: string;
//   alternativeTitle?: string;
//   language?: string;
//   genre?: string;
//   historicalFigure?: string;
//   albumImage?: string;
//   author?: string;
//   coAuthor?: string;
//   musicType?: string;
//   bookType?: string;
//   edition?: string;
//   articleWriter?: string;
//   coWriter?: string;
//   mediaUrl?: string;
// }

// export default function ViewContent({
//   uploadedImageFile,
//   uploadedText,
//   contentType = "photo", // Default to photo
//   title,
//   alternativeTitle,
//   language,
//   genre,
//   historicalFigure,
//   albumImage,
//   author,
//   coAuthor,
//   musicType,
//   bookType,
//   edition,
//   articleWriter,
//   coWriter,
//   mediaUrl,
// }: ViewContentProps) {
//   const [imageSrc, setImageSrc] = useState<string | null>(null);
//   const [displayedText, setDisplayedText] = useState<string>("");

//   useEffect(() => {
//     let imageUrl: string | null = null;

//     if (uploadedImageFile) {
//       imageUrl = URL.createObjectURL(uploadedImageFile);
//       setImageSrc(imageUrl);
//     } else {
//       setImageSrc(null);
//     }

//     setDisplayedText(uploadedText || "");

//     return () => {
//       if (imageUrl) {
//         URL.revokeObjectURL(imageUrl);
//       }
//     };
//   }, [uploadedImageFile, uploadedText]);

//   return (
//     <Layout>
//       <div className="bg-[#F7F6E9] min-h-screen flex flex-col w-full pt-16">
//         {/* Navbar */}
//         <div className="w-full shadow-md bg-[#3C2A21] text-[#D5CEA3]">
//           <LogoNavBar />
//         </div>

//         {/* Main Content */}
//         <div className="w-full max-w-5xl mx-auto p-6">
//           <h1 className="text-center text-3xl md:text-4xl font-extrabold text-[#3C2A21] mb-8">
//             {title}
//           </h1>
//           {alternativeTitle && (
//             <h2 className="text-center text-xl md:text-2xl font-semibold text-[#3C2A21] mb-8">
//               {alternativeTitle}
//             </h2>
//           )}

//           {/* Conditional Media Section */}
//           <div className="flex justify-center mb-6">
//             {contentType === "video" && (
//               <>
//                 <div className="rounded-lg overflow-hidden border-1 border-[#3C2A21] shadow-lg w-full sm:w-[400px] h-[250px] flex items-center justify-center bg-gray-100">
//                   {imageSrc ? (
//                     <Image
//                       src={imageSrc}
//                       alt="Video Cover"
//                       width={400}
//                       height={250}
//                       className="object-cover w-full h-full"
//                     />
//                   ) : (
//                     <Image
//                       src="/images/placeholder.jpg" // Default video placeholder image
//                       alt="Default Video Cover"
//                       width={400}
//                       height={250}
//                       className="object-cover w-full h-full"
//                     />
//                   )}
//                 </div>
//                 {mediaUrl && (
//                   <video
//                     controls
//                     className="rounded-lg border-4 border-[#3C2A21] shadow-lg w-full sm:w-[400px] max-h-[250px] bg-black mt-6"
//                   >
//                     <source src={mediaUrl} type="video/mp4" />
//                     Your browser does not support the video tag.
//                   </video>
//                 )}
//               </>
//             )}
// {contentType === "music" && (
//               <>
//                 <div className="rounded-lg overflow-hidden border-1 border-[#3C2A21] shadow-lg w-full sm:w-[400px] h-[250px] flex items-center justify-center bg-gray-100">
//                   {albumImage ? (
//                     <Image
//                       src={albumImage}
//                       alt="Album Cover"
//                       width={400}
//                       height={250}
//                       className="object-cover w-full h-full"
//                     />
//                   ) : (
//                     <Image
//                       src="/images/placeholder.jpg" // Default music placeholder image
//                       alt="Default Album Cover"
//                       width={400}
//                       height={250}
//                       className="object-cover w-full h-full"
//                     />
//                   )}
//                 </div>
//                 <audio controls className="w-full max-w-lg mt-6">
//                   <source src={mediaUrl} type="audio/mpeg" />
//                   Your browser does not support the audio element.
//                 </audio>
//               </>
//             )}

//             {contentType === "book" && (
//               <>
//                 <div className="rounded-lg overflow-hidden border-1 border-[#3C2A21] shadow-lg w-full sm:w-[400px] h-[250px] flex items-center justify-center bg-gray-100">
//                   {imageSrc ? (
//                     <Image
//                       src={imageSrc}
//                       alt="Book Cover"
//                       width={400}
//                       height={250}
//                       className="object-cover w-full h-full"
//                     />
//                   ) : (
//                     <Image
//                       src="/images/placeholder.jpg" // Default book placeholder image
//                       alt="Default Book Cover"
//                       width={400}
//                       height={250}
//                       className="object-cover w-full h-full"
//                     />
//                   )}
//                 </div>
//               </>
//             )}

//             {contentType === "photo" && (
//               <>
//                 <div className="rounded-lg overflow-hidden border-1 border-[#3C2A21] shadow-lg w-full sm:w-[400px] h-[250px] flex items-center justify-center bg-gray-100">
//                   {imageSrc ? (
//                     <Image
//                       src={imageSrc}
//                       alt="Uploaded Photo"
//                       width={400}
//                       height={250}
//                       className="object-cover w-full h-full"
//                     />
//                   ) : (
//                     <Image
//                       src="/images/placeholder.jpg" // Default placeholder image
//                       alt="Default Photo"
//                       width={600}
//                       height={750}
//                       className="object-cover w-full h-full"
//                     />
//                   )}
//                 </div>
//               </>
//             )}

//             {contentType === "article" && (
//               <>
//                 <div className="rounded-lg overflow-hidden border-1 border-[#3C2A21] shadow-lg w-full sm:w-[400px] h-[250px] flex items-center justify-center bg-gray-100">
//                   {imageSrc ? (
//                     <Image
//                       src={imageSrc}
//                       alt="Article Image"
//                       width={400}
//                       height={250}
//                       className="object-cover w-full h-full"
//                     />
//                   ) : (
//                     <Image
//                       src="/images/placeholder.jpg" // Default article placeholder image
//                       alt="Default Article Cover"
//                       width={400}
//                       height={250}
//                       className="object-cover w-full h-full"
//                     />
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
// {/* Text Section */}
//           <div className="mt-8 text-[#3C2A21] text-lg leading-relaxed text-center px-4">
//             {displayedText ? (
//               <p>{displayedText}</p>
//             ) : (
//               <p>No description provided. Add details about this {contentType} here!</p>
//             )}
//           </div>

//           {/* Conditional Details for Different Content Types */}
//           <div className="mt-8 text-[#3C2A21] text-lg px-4">
//             {contentType === "video" && (
//               <>
//                 {genre && <p><strong>Genre:</strong> {genre}</p>}
//                 {language && <p><strong>Language:</strong> {language}</p>}
//                 {historicalFigure && (
//                   <p><strong>Historical Figure:</strong> {historicalFigure}</p>
//                 )}
//               </>
//             )}

//             {contentType === "music" && (
//               <>
//                 {musicType && <p><strong>Music Type:</strong> {musicType}</p>}
//                 {language && <p><strong>Language:</strong> {language}</p>}
//                 {historicalFigure && (
//                   <p><strong>Historical Figure:</strong> {historicalFigure}</p>
//                 )}
//               </>
//             )}

//             {contentType === "book" && (
//               <>
//                 {author && <p><strong>Author:</strong> {author}</p>}
//                 {coAuthor && <p><strong>Co-Author:</strong> {coAuthor}</p>}
//                 {bookType && <p><strong>Book Type:</strong> {bookType}</p>}
//                 {edition && <p><strong>Edition:</strong> {edition}</p>}
//                 {language && <p><strong>Language:</strong> {language}</p>}
//               </>
//             )}

//             {contentType === "photo" && (
//               <>
//                 {historicalFigure && (
//                   <p><strong>Historical Figure:</strong> {historicalFigure}</p>
//                 )}
//               </>
//             )}

//             {contentType === "article" && (
//               <>
//                 {articleWriter && <p><strong>Article Writer:</strong> {articleWriter}</p>}
//                 {coWriter && <p><strong>Co-Writer:</strong> {coWriter}</p>}
//                 {historicalFigure && (
//                   <p><strong>Historical Figure:</strong> {historicalFigure}</p>
//                 )}
//               </>
//             )}
//           </div>
//         </div>

//         {/* Comment Section */}
//         <div className="w-full mt-12 bg-[#F7F6E9] px-6 py-8">
//           <CommentPage />
//         </div>

//         {/* Footer Section */}
//         <footer className="w-full bg-[#E5E5CB] text-[#D5CEA3] px-6 py-4">
//           <Footer />
//         </footer>
//       </div>
//     </Layout>
//   );
// }

'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Layout from "../../layout";
import Footer from "../../../../../components/Footer";
import LogoNavBar from "../../../../../components/LogoNavBar";
import CommentPage from "../../../../../components/Comment";


interface ContentDetails {
  uploadedImageFile?: File | null;
  description?: string;  // Change uploadedText to description
  contentType?: "music" | "video" | "book" | "article" | "photo";
  title?: string;
  alternativeTitle?: string;
  language?: string;
  genre?: string;
  historicalFigure?: string;
  albumImage?: string;
  author?: string;
  coAuthor?: string;
  musicType?: string;
  bookType?: string;
  edition?: string;
  articleWriter?: string;
  coWriter?: string;
  mediaUrl?: string;
}


export default function ViewContent() {
  const [contentId, setContentId] = useState<string | null>(null);
  const [content, setContent] = useState<ContentDetails | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState<string>("");

  useEffect(() => {
    // Only access localStorage on the client side
    const storedContentId = localStorage.getItem("contentId");
  
    // Parse and check if the stored content ID is a valid number
    const parsedContentId = storedContentId ? parseInt(storedContentId, 10) : null;
  
    // Convert the parsed content ID to a string (or null if not valid)
    if (parsedContentId !== null) {
      setContentId(parsedContentId.toString());  // Keep it as string for React state
    } else {
      setContentId(null);  // Set null if parsedContentId is invalid
    }
  }, []);
  
  console.log("contentId from localStorage:", contentId);

  useEffect(() => {
    if (!contentId) return; // Avoid fetching if contentId is not available
    
    console.log("Fetching content for contentId:", contentId);  // Log to verify
  
    const fetchContent = async () => {
      try {
        const response = await fetch(`/api/content/${contentId}`);
        if (response.ok) {
          const data = await response.json();
          setContent(data);
        } else {
          console.error("Failed to fetch content:", response.statusText);
          alert("Failed to fetch content. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        alert("An error occurred while fetching the content.");
      }
    };
  
    fetchContent();
  }, [contentId]);
  
  useEffect(() => {
    if (content) {
      let imageUrl: string | null = null;

      if (content.uploadedImageFile) {
        imageUrl = URL.createObjectURL(content.uploadedImageFile);
        setImageSrc(imageUrl);
      } else {
        setImageSrc(null);
      }

      setDisplayedText(content.description || "");
    }
  }, [content]);

  if (!content) {
    return <div>Loading...</div>;
  }


  return (
    <Layout>
      <div className="bg-[#F7F6E9] min-h-screen flex flex-col w-full pt-16">
        {/* Navbar */}
        <div className="w-full shadow-md bg-[#3C2A21] text-[#D5CEA3]">
          <LogoNavBar />
        </div>

        {/* Main Content */}
        <div className="w-full max-w-5xl mx-auto p-6">
          <h1 className="text-center text-3xl md:text-4xl font-extrabold text-[#3C2A21] mb-8">
            {content.title}
          </h1>
          {content.alternativeTitle && (
            <h2 className="text-center text-xl md:text-2xl font-semibold text-[#3C2A21] mb-8">
              {content.alternativeTitle}
            </h2>
          )}

          {/* Conditional Media Section */}
          <div className="flex justify-center mb-6">
            {content.contentType === "video" && (
              <>
                <div className="rounded-lg overflow-hidden border-1 border-[#3C2A21] shadow-lg w-full sm:w-[400px] h-[250px] flex items-center justify-center bg-gray-100">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt="Video Cover"
                      width={400}
                      height={250}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Image
                      src="/images/placeholder.jpg" // Default video placeholder image
                      alt="Default Video Cover"
                      width={400}
                      height={250}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                {content.mediaUrl && (
                  <video
                    controls
                    className="rounded-lg border-4 border-[#3C2A21] shadow-lg w-full sm:w-[400px] max-h-[250px] bg-black mt-6"
                  >
                    <source src={content.mediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </>
            )}

            {content.contentType === "music" && (
              <>
                <div className="rounded-lg overflow-hidden border-1 border-[#3C2A21] shadow-lg w-full sm:w-[400px] h-[250px] flex items-center justify-center bg-gray-100">
                  {content.albumImage ? (
                    <Image
                      src={content.albumImage}
                      alt="Album Cover"
                      width={400}
                      height={250}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Image
                      src="/images/placeholder.jpg" // Default music placeholder image
                      alt="Default Album Cover"
                      width={400}
                      height={250}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <audio controls className="w-full max-w-lg mt-6">
                  <source src={content.mediaUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </>
            )}

            {content.contentType === "book" && (
              <>
                <div className="rounded-lg overflow-hidden border-1 border-[#3C2A21] shadow-lg w-full sm:w-[400px] h-[250px] flex items-center justify-center bg-gray-100">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt="Book Cover"
                      width={400}
                      height={250}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Image
                      src="/images/placeholder.jpg" // Default book placeholder image
                      alt="Default Book Cover"
                      width={400}
                      height={250}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
              </>
            )}

            {content.contentType === "photo" && (
              <>
                <div className="rounded-lg overflow-hidden border-1 border-[#3C2A21] shadow-lg w-full sm:w-[400px] h-[250px] flex items-center justify-center bg-gray-100">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt="Uploaded Photo"
                      width={400}
                      height={250}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Image
                      src="/images/placeholder.jpg" // Default placeholder image
                      alt="Default Photo"
                      width={600}
                      height={750}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
              </>
            )}

            {content.contentType === "article" && (
              <>
                <div className="rounded-lg overflow-hidden border-1 border-[#3C2A21] shadow-lg w-full sm:w-[400px] h-[250px] flex items-center justify-center bg-gray-100">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt="Article Image"
                      width={400}
                      height={250}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Image
                      src="/images/placeholder.jpg" // Default article placeholder image
                      alt="Default Article Cover"
                      width={400}
                      height={250}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
              </>
            )}
          </div>

          {/* Text Section */}
          <div className="mt-8 text-[#3C2A21] text-lg leading-relaxed text-center px-4">
            {displayedText ? (
              <p>{displayedText}</p>
            ) : (
              <p>No description provided. Add details about this {content.contentType} here!</p>
            )}
          </div>

          {/* Conditional Details for Different Content Types */}
          <div className="mt-8 text-[#3C2A21] text-lg px-4">
            {content.contentType === "video" && (
              <>
                {content.genre && <p><strong>Genre:</strong> {content.genre}</p>}
                {content.language && <p><strong>Language:</strong> {content.language}</p>}
                {content.historicalFigure && (
                  <p><strong>Historical Figure:</strong> {content.historicalFigure}</p>
                )}
              </>
            )}

            {content.contentType === "music" && (
              <>
                {content.musicType && <p><strong>Music Type:</strong> {content.musicType}</p>}
                {content.language && <p><strong>Language:</strong> {content.language}</p>}
                {content.historicalFigure && (
                  <p><strong>Historical Figure:</strong> {content.historicalFigure}</p>
                )}
              </>
            )}

            {content.contentType === "book" && (
              <>
                {content.author && <p><strong>Author:</strong> {content.author}</p>}
                {content.coAuthor && <p><strong>Co-Author:</strong> {content.coAuthor}</p>}
                {content.bookType && <p><strong>Book Type:</strong> {content.bookType}</p>}
                {content.edition && <p><strong>Edition:</strong> {content.edition}</p>}
                {content.language && <p><strong>Language:</strong> {content.language}</p>}
              </>
            )}

            {content.contentType === "photo" && (
              <>
                {content.historicalFigure && (
                  <p><strong>Historical Figure:</strong> {content.historicalFigure}</p>
                )}
              </>
            )}

            {content.contentType === "article" && (
              <>
                {content.articleWriter && <p><strong>Article Writer:</strong> {content.articleWriter}</p>}
                {content.coWriter && <p><strong>Co-Writer:</strong> {content.coWriter}</p>}
                {content.historicalFigure && (
                  <p><strong>Historical Figure:</strong> {content.historicalFigure}</p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Comment Section */}
        <div className="w-full mt-12 bg-[#F7F6E9] px-6 py-8">
          <CommentPage />
        </div>

        {/* Footer Section */}
        <footer className="w-full bg-[#E5E5CB] text-[#D5CEA3] px-6 py-4">
          <Footer />
        </footer>
      </div>
    </Layout>
  );
}