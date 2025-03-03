import React, { useRef, useState, useEffect } from "react";

interface PhotoFieldProps {
  profilePicture: File | null;
  onProfilePictureChange: (file: File | null) => void;
  isEditable: boolean;
}

export default function PhotoField({
  profilePicture,
  onProfilePictureChange,
  isEditable,
}: PhotoFieldProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const handleProfilePictureClick = () => {
    if (isEditable && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (isEditable && (event.key === "Enter" || event.key === " ")) {
      handleProfilePictureClick();
    }
  };

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("File size must be less than 2MB.");
        return;
      }
      setError(null);
      onProfilePictureChange(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    onProfilePictureChange(null);
    setImageUrl(null);
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <label className="block text-[#3e251c] mb-2" htmlFor="profilePicture">
        Profile Picture
      </label>
      <div
        className={`w-24 h-24 border-4 border-dotted border-[#3C2A21] rounded-full flex items-center justify-center overflow-hidden mb-4 cursor-pointer ${
          isEditable ? "hover:border-[#6B4F4F] focus-within:ring focus-within:ring-[#3C2A21]" : ""
        }`}
        onClick={handleProfilePictureClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Upload profile picture"
      >
        {imageUrl || profilePicture ? (
          <img
            src={imageUrl || (profilePicture ? URL.createObjectURL(profilePicture) : "")}
            alt="Profile Picture"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span className="text-[#3C2A21]">Upload</span>
        )}
      </div>
      {isEditable && (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            ref={fileInputRef}
            id="profilePicture"
            className="hidden"
          />
          {(imageUrl || profilePicture) && (
            <button
              onClick={handleRemoveImage}
              className="mt-2 text-red-500 hover:underline"
            >
              Remove
            </button>
          )}
        </>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
