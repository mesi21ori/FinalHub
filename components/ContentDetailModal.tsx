// ""use client";

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import Button from "./Button"; // Import the custom Button component

// interface ContentCardProps {
//   title: string; // Name of the content
//   secondaryInfo: string; // Author, Singer, Photographer, or Director
//   imageSrc: string; // Image URL
//   tag: "Free" | "Premium" | "Researcher"; // Dynamic tag
//   eventType: string; // Event Type: war, politics, economics, etc.
//   category: "book" | "article" | "music" | "video" | "photo"; // Category of content
// }

// const ContentCard: React.FC<ContentCardProps> = ({
//   title,
//   secondaryInfo,
//   imageSrc,
//   tag,
//   eventType,
//   category,
// }) => {
//   // Dynamically set the tag's color based on the type
//   const getTagStyle = (tag: string) => {
//     switch (tag) {
//       case "Free":
//         return "bg-[#f3e9dc] text-[#3C2A21]";
//       case "Premium":
//         return "bg-[#d99c2b] text-[#3C2A21]";
//       case "Researcher":
//         return "bg-[#7a5447] text-white";
//       default:
//         return "bg-[#3C2A21] text-white";
//     }
//   };

//   return (
//     <div className="relative group bg-gradient-to-br from-[#E5E5CB] via-[#f4f2ec] to-[#E5E5CB] rounded-lg shadow-md hover:shadow-xl hover:scale-105 w-[320px] h-[380px] overflow-hidden transition-all duration-300 ease-in-out hover:brightness-110">
//       {/* Cover Image */}
//       <div className="relative w-full h-[200px] overflow-hidden">
//         <Image
//           src={imageSrc}
//           alt={title}
//           layout="fill"
//           className="object-cover rounded-t-lg group-hover:scale-110 transition-transform duration-500 ease-in-out"
//         />
//         {/* Zigzag-style Dynamic Tag */}
//         <div
//           className={`absolute text-xs font-bold rotate-45 transform origin-top-left px-4 py-1 -top-[2px] -right-[20px] ${getTagStyle(
//             tag
//           )}`}
//           style={{
//             clipPath:
//               "polygon(0% 0%, 100% 0%, 90% 100%, 80% 90%, 70% 100%, 60% 90%, 50% 100%, 40% 90%, 30% 100%, 20% 90%, 10% 100%, 0% 0%)",
//             width: tag === "Free" ? "60px" : tag === "Premium" ? "80px" : "90px", // Dynamically adjust width based on the text
//           }}
//         >
//           {tag}
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="p-3 flex flex-col justify-between min-h-[180px]">
//         {/* Category and Event Type Row */}
//         <div className="flex justify-between items-center">
//           <div className="text-sm font-bold uppercase text-gray-600">{category}</div>
//           <div className="text-sm font-normal text-gray-500">{eventType}</div>
//         </div>
//         {/* Title */}
//         <h3 className="text-base font-semibold text-[#3C2A21] text-center mt-0.5">{title}</h3>
//         {/* Secondary Information */}
//         <p className="text-xs text-gray-700 text-center mt-0.5">
//           {category === "music" && `Singer: ${secondaryInfo}`}
//           {category === "book" && `Author: ${secondaryInfo}`}
//           {category === "article" && `Author: ${secondaryInfo}`}
//           {category === "video" && `Director: ${secondaryInfo}`}
//           {category === "photo" && `Photographer: ${secondaryInfo}`}
//         </p>
//         {/* Always visible "More" button */}
//         <div className="flex justify-center mt-2">
//           <Link href={/content/view-content} passHref>
//             <Button
//               variant="curved"
//               size="sm"
//               className="transition-colors hover:bg-[#d99c2b] hover:text-white"
//             >
//               More
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContentCard;"
import React, { useState } from 'react';
import Button from './Button';
import { cookies } from 'next/headers';
import Cookies from 'js-cookie';
import { response } from 'express';

// Define ContentType enum
type ContentType = "photo" | "music" | "article" | "video" | "book";

// Generic Content type for flexibility
interface GenericContent {
  [key: string]: any; // Allow dynamic keys for different content types
}

// Define props interface
interface ContentDetailModalProps<T extends GenericContent> {
  contentType: ContentType;
  content: T;
  onClose: () => void;
  onSave: (updatedContent: T) => void;
}

const ContentDetailModal = <T extends GenericContent>({
  contentType,
  content,
  onClose,
  onSave,
}: ContentDetailModalProps<T>) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState<T>(content);

  // Non-editable fields, apply to all content types
  const nonEditableFields: string[] = [
    'numberOfViews',
    'createdAt',
    'numberOfLikes',
    'numberOfComments',
    'uploadedBy',
    'uploadDate',
    'lastEditBy',
    'lastEditDate',
    'videoUrl',
    'music',
    'photo',
    'article',
    'bookFile',
    'id',

  ];

  // Handle input field changes
  const handleInputChange = (field: string, value: string | number | string[] | { [key: string]: any }) => {
    setEditableContent((prevContent) => ({
      ...prevContent,
      [field]: value,
    }));
  };

  // Handle cover or album image change
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, imageField: string) => {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setEditableContent((prevContent) => ({
          ...prevContent,
          [imageField]: fileReader.result as string,
        }));
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };
    
  const handleSave = async () => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      alert('User is not authenticated');
      return;
    }
  
    try {
      const apiUrl = `/api/uploder/update-content/${editableContent.id}`;
      
      // Only include the modified fields in the request
      const requestBody: any = { userId: Number(userId) };
  
      // Example: Add only the modified fields to requestBody
      if (editableContent.title) {
        requestBody.title = editableContent.title;
      }
      if (editableContent.description) {
        requestBody.description = editableContent.description;
      }
  
      console.log('Request body:', requestBody);  // Log the request body
  
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to update content:', errorData);  // Log the detailed error from the backend
        throw new Error(errorData.message || 'Failed to update content');
      }
  
      const updatedContent = await response.json();
      console.log('Content updated successfully:', updatedContent);
  
      onSave(updatedContent); // Update the parent component
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error('Error updating content:', error);
      alert('Failed to save changes. Please try again.');
    }
  };
  
  
  
    

  // Render fields dynamically based on their type and editable state
  const renderDetailField = (
    field: string,
    value?: string | number | string[] | object
  ) => {
    const isFieldEditable = !nonEditableFields.includes(field);

    // If the value is an object or array, handle its nested properties
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        // Render array elements
        return (
          <div className="mb-4">
            {value.map((item, index) => (
              <div key={index} className="text-[#3C2A21] shadow-lg flex items-center gap-4">
                {isEditing && isFieldEditable ? (
                  <input
                    className="flex-1 p-2 border border-[#3C2A21] rounded-md"
                    type="text"
                    value={item}
                    onChange={(e) =>
                      handleInputChange(field, value.map((val, idx) => idx === index ? e.target.value : val))
                    }
                  />
                ) : (
                  <div>{item}</div>
                )}
              </div>
            ))}
          </div>
        );
      } else {
        // Render object properties
        return (
          <div className="mb-4">
            {Object.keys(value).map((key) => {
              const nestedValue = (value as { [key: string]: any })[key];
              const isNestedEditable = !nonEditableFields.includes(key);

              return (
                <div key={key} className="text-[#3C2A21] shadow-lg flex items-center gap-4 p-2">
                  <strong>{key}:</strong>
                  {isEditing && isNestedEditable ? (
                    <input
                      className="flex-1 p-2 border border-[#3C2A21] rounded-md"
                      type="text"
                      value={String(nestedValue)}
                      onChange={(e) =>
                        handleInputChange(
                          field,
                          { ...(value as { [key: string]: any }), [key]: e.target.value }
                        )
                      }
                    />
                  ) : (
                    <div>{String(nestedValue)}</div>
                  )}
                </div>
              );
            })}
          </div>
        );
      }
    }

    // Default rendering for scalar values (string, number, etc.)
    return (
      <div className="text-[#3C2A21] mb-4 shadow-lg flex items-center gap-4">
        <strong>{field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:</strong>
        {isEditing && isFieldEditable ? (
          <input
            className="flex-1 p-2 border border-[#3C2A21] rounded-md"
            type={typeof value === 'number' ? 'number' : 'text'}
            value={Array.isArray(value) ? value.join(', ') : value || ''}
            onChange={(e) =>
              handleInputChange(
                field,
                Array.isArray(value)
                  ? e.target.value.split(',').map((item) => item.trim())
                  : e.target.value
              )
            }
          />
        ) : (
          <div>
            {Array.isArray(value) ? value.join(', ') : String(value)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="modal-content bg-[#f7f4f0] p-8 rounded-lg shadow-xl w-full mt-16 max-w-4xl max-h-screen overflow-y-auto text-black custom-scrollbar">
        <h2 className="text-2xl text-[#3C2A21] ml-6 font-semibold mb-4">Content Details</h2>

        <div className="content-details ml-6 space-y-4">
          <div className="flex flex-col items-center mb-4">
            {contentType === 'music' ? (
              <>
                <img
                  src={editableContent.albumImage || '/default-album.png'}
                  alt="Album Image"
                  className="w-full max-w-[150px] h-auto rounded-md"
                />
                {isEditing && (
                  <div className="mt-2 w-full">
                    <label className="block text-[#3C2A21] mb-2 font-semibold">Edit Album Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="block w-full text-[#3C2A21] file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-[#3C2A21] file:text-[#E5E5CB] hover:file:bg-[#604C3E]"
                      onChange={(event) => handleImageChange(event, 'albumImage')}
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <img
                  src={editableContent.coverImage || '/default-cover.png'}
                  alt="Content Cover"
                  className="w-full max-w-[150px] h-auto rounded-md"
                />
                {isEditing && (
                  <div className="mt-2 w-full">
                    <label className="block text-[#3C2A21] mb-2 font-semibold">Edit Cover Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="block w-full text-[#3C2A21] file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-[#3C2A21] file:text-[#E5E5CB] hover:file:bg-[#604C3E]"
                      onChange={(event) => handleImageChange(event, 'coverImage')}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {Object.keys(content).map((field) => {
            if (field !== 'coverImage' && field !== 'albumImage') {
              return (
                <div key={field}>
                  {renderDetailField(field, editableContent[field])}
                </div>
              );
            }
            return null;
          })}
        </div>

        <div className="flex justify-end mb-6 gap-4 mt-8">
          {isEditing ? (
            <>
              <Button onClick={() => setIsEditing(false)} variant="border" className="flex items-center">
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  // First call handleSave to update the content
                  await handleSave();

                  // Then, if handleSave was successful, call onSave to update the parent component
                  onSave(editableContent);

                  // Set the editing mode to false (exit editing)
                  setIsEditing(false);
                }}
                variant="view"
                className="flex items-center"
              >
                Save
              </Button>


            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="border" className="flex items-center">
              Edit
            </Button>
          )}
          <Button onClick={onClose} variant="view" className="flex items-center">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentDetailModal;
