
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

const  ContentView = <T extends GenericContent>({
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
              
                  <div>{item}</div>
                
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

                    <div>{String(nestedValue)}</div>
    
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
              </>
            ) : (
              <>
                <img
                  src={editableContent.coverImage || '/default-cover.png'}
                  alt="Content Cover"
                  className="w-full max-w-[150px] h-auto rounded-md"
                />
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
          <Button onClick={onClose} variant="view" className="flex items-center">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentView;
