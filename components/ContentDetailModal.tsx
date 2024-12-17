import React, { useState } from 'react';
import { Content, HistoricalVideo } from '@/app/type'; // Adjust the import as per your actual path
import Button from './Button';

// Define props interface
interface ContentDetailModalProps {
  content: Content; // Now it directly takes Content type
  contentType: string; // Add contentType to the props
  onClose: () => void;
  onSave: (updatedContent: Content) => void;
}

const ContentDetailModal: React.FC<ContentDetailModalProps> = ({
  content,
  onClose,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState<Content>(content);

  // Non-editable fields, apply to all content types
  const nonEditableFields: string[] = [
    'numberOfViews',
    'numberOfLikes',
    'numberOfComments',
    'uploadedBy',
    'uploadDate',
    'lastEditBy',
    'lastEditDate',
  ];

  // Handle input field changes
  const handleInputChange = (field: string, value: string | number | string[] | boolean) => {
    setEditableContent((prevContent) => ({
      ...prevContent,
      [field]: value,
    }));
  };

  // Handle cover image change
  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setEditableContent((prevContent) => ({
          ...prevContent,
          videoDetails: {
            ...prevContent.videoDetails,
            coverImage: fileReader.result as string, // Update the coverImage inside videoDetails
          },
        }));
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };

  // Render fields dynamically with special handling for nested objects like videoDetails
  const renderDetailField = (
    label: string,
    field: string,
    value?: string | number | string[] | boolean | object // Allow boolean and object as well
  ) => {
    const isFieldEditable = !nonEditableFields.includes(field);

    // Handle booleans
    if (typeof value === 'boolean') {
      return (
        <div className="text-[#3C2A21] mb-4 shadow-lg flex items-center gap-4">
          <strong>{label}:</strong>
          {isEditing && isFieldEditable ? (
            <input
              className="flex-1 p-2 border border-[#3C2A21] rounded-md"
              type="checkbox"
              checked={value}
              onChange={(e) => handleInputChange(field, e.target.checked)}
            />
          ) : (
            <p className="flex-1">{value ? 'Yes' : 'No'}</p> // Display "Yes" or "No" for boolean
          )}
        </div>
      );
    }

    // Handle arrays
    if (Array.isArray(value)) {
      return (
        <div className="text-[#3C2A21] mb-4 shadow-lg flex items-center gap-4">
          <strong>{label}:</strong>
          {isEditing && isFieldEditable ? (
            <input
              className="flex-1 p-2 border border-[#3C2A21] rounded-md"
              type="text"
              value={value.join(', ')} // Join array values to display
              onChange={(e) =>
                handleInputChange(
                  field,
                  e.target.value.split(',').map((item) => item.trim())
                )
              }
            />
          ) : (
            <p className="flex-1">{value.join(', ')}</p> // Display array as a string
          )}
        </div>
      );
    }

    // Handle objects (e.g., videoDetails)
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return (
        <div className="text-[#3C2A21] mb-4 shadow-lg flex items-center gap-4">
          <strong>{label}:</strong>
          <div>
            {Object.keys(value).map((nestedField) => (
              <div key={nestedField}>
                <strong>{nestedField}:</strong>
                <p>{(value as any)[nestedField]}</p> {/* Type assertion to avoid TS error */}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Handle other types (string, number)
    return (
      <div className="text-[#3C2A21] mb-4 shadow-lg flex items-center gap-4">
        <strong>{label}:</strong>
        {isEditing && isFieldEditable ? (
          <input
            className="flex-1 p-2 border border-[#3C2A21] rounded-md"
            type={typeof value === 'number' ? 'number' : 'text'}
            value={Array.isArray(value) ? value.join(', ') : value}
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
          <p className="flex-1">{Array.isArray(value) ? value.join(', ') : value}</p>
        )}
      </div>
    );
  };

  return (
    <div className="modal-overlay fixed inset-0 bg-[#efdecd] bg-opacity-60 flex justify-center items-center">
      <div className="modal-content bg-[#E5E5CB] p-8 rounded-lg shadow-xl w-full mt-16 max-w-4xl max-h-screen overflow-y-auto text-black custom-scrollbar">
        <h2 className="text-2xl text-[#3C2A21] ml-6 font-semibold mb-4">Content Details</h2>

        <div className="content-details ml-6 space-y-4">
          {/* Display content cover image */}
          <div className="flex justify-center mb-4">
            <img
              src={editableContent.videoDetails.coverImage || '/default-profile.png'}
              alt="Content Cover"
              className="w-full max-w-[150px] h-auto rounded-md"
            />
          </div>

          {/* Edit cover image section */}
          {isEditing && (
            <div className="mb-4">
              <label className="block text-[#3C2A21] mb-2 font-semibold">Edit Cover Image:</label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-[#3C2A21] file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-[#3C2A21] file:text-[#E5E5CB] hover:file:bg-[#604C3E]"
                onChange={handleCoverImageChange}
              />
            </div>
          )}

          {/* Render video details if present */}
          {editableContent.videoDetails && (
            <div className="text-[#3C2A21] mb-4 shadow-lg flex items-center gap-4">
              <strong>Video Details:</strong>
              <div>
                <div>
                  <strong>Publisher:</strong>
                  <p>{editableContent.videoDetails.publisher}</p>
                </div>
                <div>
                  <strong>Language:</strong>
                  <p>{editableContent.videoDetails.language}</p>
                </div>
                {/* Add other video details here */}
              </div>
            </div>
          )}

          {/* Render other fields dynamically */}
          {Object.keys(content).map((field) =>
            renderDetailField(
              field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()), // Format field name
              field,
              editableContent[field as keyof Content] // Type assertion here
            )
          )}

        </div>

        <div className="flex justify-end mb-6 gap-4 mt-8">
          {/* Editing buttons */}
          {isEditing ? (
            <>
              <Button
                onClick={() => setIsEditing(false)}
                variant="border"
                className="flex items-center"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onSave(editableContent);
                  setIsEditing(false);
                }}
                variant="view"
                className="flex items-center"
              >
                Save
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              variant="border"
              className="flex items-center"
            >
              Edit
            </Button>
          )}
          <Button
            onClick={onClose}
            variant="view"
            className="flex items-center"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentDetailModal;
