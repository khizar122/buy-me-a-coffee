'use client';

// components/CoverPhoto.tsx
import React, { useEffect, useRef, useState } from 'react';

interface CoverPhotoProps {
  initialImage?: string | null;
  onImageChange?: (imageUrl: string | null) => void;
}

const CoverPhoto: React.FC<CoverPhotoProps> = ({
  initialImage = null,
  onImageChange
}) => {
  const [coverImage, setCoverImage] = useState<string | null>(initialImage);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [tempPosition, setTempPosition] = useState({ x: 0, y: 0 });

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!coverImage || !isEditing) return;

    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !imageContainerRef.current) return;

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
    // Always remove the image when cancel is clicked
    setCoverImage(null);
    setPosition({ x: 0, y: 0 });

    // Notify parent component that image has been removed
    if (onImageChange) {
      onImageChange(null);
    }

    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="relative w-full">
      <div
        ref={imageContainerRef}
        className="w-full h-64 bg-gray-100 relative overflow-hidden transition-all duration-300"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ cursor: isEditing && coverImage ? 'move' : 'default' }}
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
            <button
              onClick={handleButtonClick}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center space-x-2 hover:bg-gray-50"
            >
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
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <span>Add cover image</span>
            </button>
          </div>
        )}

        {isEditing && coverImage && (
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
        />
      </div>

      {/* Controls */}
      {coverImage && (
        <div className="absolute top-4 right-4 flex space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-1 bg-white rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-1 bg-white rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50"
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
