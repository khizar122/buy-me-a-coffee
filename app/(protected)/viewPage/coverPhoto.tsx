'use client';

import { uploadCoverImage } from '@/actions/profile';
import React, { useEffect, useRef, useState } from 'react';

interface CoverPhotoProps {
  initialImage?: string | null;
  onImageChange?: (imageUrl: string | null) => void;
  editable?: boolean; // New prop to determine if the cover photo is editable
}

const CoverPhoto: React.FC<CoverPhotoProps> = ({
  initialImage = null,
  onImageChange,
  editable = true // Default to true for backward compatibility
}) => {
  const [coverImage, setCoverImage] = useState<string | null>(initialImage);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Update coverImage when initialImage changes (e.g., after page refresh)
  useEffect(() => {
    if (initialImage !== coverImage) {
      setCoverImage(initialImage);
    }
  }, [initialImage]);

  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [tempPosition, setTempPosition] = useState({ x: 0, y: 0 });
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Save the initial state when entering edit mode
  useEffect(() => {
    if (isEditing) {
      setTempImage(coverImage);
      setTempPosition({ ...position });
    }
  }, [isEditing]);

  // Handle initial image upload vs. editing existing image
  const isFirstTimeUpload = isEditing && tempImage === null;

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only proceed if editable
    if (!editable) return;

    const file = e.target.files?.[0];
    if (file) {
      // Show local preview immediately
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const imageUrl = event.target.result as string;
          setCoverImage(imageUrl);
          setPosition({ x: 0, y: 0 }); // Reset position for new image
          setIsEditing(true);
        }
      };
      reader.readAsDataURL(file);
      e.target.value = ''; // Reset input to allow uploading the same file again

      // Upload to server
      setIsUploading(true);
      setErrorMessage(null);

      try {
        const formData = new FormData();
        formData.append('file', file);

        const result = await uploadCoverImage(formData);

        if (result.error) {
          setErrorMessage(result.error);
          return;
        }

        if (result.success && result.imageUrl) {
          // Replace local preview with server URL
          setCoverImage(result.imageUrl);

          // Notify parent component
          if (onImageChange) {
            onImageChange(result.imageUrl);
          }
        }
      } catch (error) {
        setErrorMessage('Failed to upload image. Please try again.');
        console.error('Upload error:', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only allow dragging if editable
    if (!coverImage || !isEditing || !editable) return;

    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !imageContainerRef.current || !editable) return;

    const containerRect = imageContainerRef.current.getBoundingClientRect();
    const containerHeight = containerRect.height;
    const containerWidth = containerRect.width;

    // Calculate new position
    let newX = e.clientX - dragStart.x;
    let newY = e.clientY - dragStart.y;

    // Add constraints to prevent dragging too far
    const maxY = containerHeight * 0.5;
    const minY = -containerHeight * 0.5;
    newY = Math.max(minY, Math.min(maxY, newY));

    const maxX = containerWidth * 0.3;
    const minX = -containerWidth * 0.3;
    newX = Math.max(minX, Math.min(maxX, newX));

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle mouse events leaving the window
  useEffect(() => {
    const handleMouseUpGlobal = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUpGlobal);
    return () => window.removeEventListener('mouseup', handleMouseUpGlobal);
  }, []);

  const handleSaveChanges = () => {
    setIsEditing(false);
    if (onImageChange && coverImage) {
      onImageChange(coverImage);
    }
  };

  const handleCancel = () => {
    // Revert to initial state
    setCoverImage(initialImage);
    setPosition({ x: 0, y: 0 });
    setIsEditing(false);
    setErrorMessage(null);

    // Notify parent component
    if (onImageChange) {
      onImageChange(initialImage);
    }
  };

  const handleEdit = () => {
    // Only allow editing if editable
    if (!editable) return;
    setIsEditing(true);
  };

  return (
    <div className="relative w-full">
      {errorMessage && (
        <div className="absolute top-0 left-0 right-0 bg-red-100 text-red-700 px-4 py-2 z-10">
          {errorMessage}
        </div>
      )}

      <div
        ref={imageContainerRef}
        className="w-full h-80 bg-gray-100 relative overflow-hidden transition-all duration-300"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          cursor: isEditing && coverImage && editable ? 'move' : 'default'
        }}
      >
        {coverImage ? (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${coverImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translate(${position.x}px, ${position.y}px)`,
              width: '100%',
              height: '100%'
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            {editable ? (
              <button
                onClick={handleButtonClick}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center space-x-2 hover:bg-gray-50"
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <span>Add cover image</span>
                  </>
                )}
              </button>
            ) : (
              <div className="text-gray-400">No cover image</div>
            )}
          </div>
        )}

        {isEditing && coverImage && editable && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
            <div className="text-white text-center px-4 py-2">
              Drag image to reposition
            </div>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          disabled={isUploading || !editable}
        />
      </div>

      {/* Controls - Only show if editable */}
      {coverImage && editable && (
        <div className="absolute top-4 right-4 flex space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleButtonClick}
                className="px-4 py-1 bg-white rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50"
                disabled={isUploading}
                title="Upload new image"
              >
                {isUploading ? 'Uploading...' : 'Change Image'}
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-1 bg-white rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50"
                disabled={isUploading}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-1 bg-white rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50"
                disabled={isUploading}
              >
                Save changes
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="p-2 bg-white rounded-full shadow hover:bg-gray-50"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CoverPhoto;
