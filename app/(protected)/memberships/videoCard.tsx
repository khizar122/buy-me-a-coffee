'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';

interface VideoCardSectionProps {
  videoUrl: string;
}

const VideoCardSection: React.FC<VideoCardSectionProps> = ({ videoUrl }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const handleWatchVideo = () => {
    setShowVideo(true);
    // Give a brief moment for the modal to render before starting the video
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }, 300);
  };

  // For the YouTube video URL, convert it to a direct video source
  // Note: In a real implementation, you would need a server to proxy this or use a video API
  // This is just for demonstration purposes
  const videoSource = videoUrl.includes('youtube')
    ? `https://www.youtube.com/embed/${videoUrl.split('v=')[1]}`
    : videoUrl;

  const handleCloseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setShowVideo(false);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);

      // Update progress bar
      if (progressRef.current && videoRef.current.duration) {
        const percent =
          (videoRef.current.currentTime / videoRef.current.duration) * 100;
        progressRef.current.style.width = `${percent}%`;
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = percent * videoRef.current.duration;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
      <div className="p-8 flex flex-col md:flex-row items-center md:items-start justify-between">
        <div className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
            Discover how to make a sustainable income with Memberships.
          </h2>

          <button
            onClick={handleWatchVideo}
            className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-full inline-flex items-center transition-colors mt-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            Watch video
          </button>
        </div>

        <div className="w-full md:w-2/5 relative">
          <div className="relative cursor-pointer" onClick={handleWatchVideo}>
            <div className="w-full h-48 md:h-56 relative rounded-lg overflow-hidden border-4 border-yellow-400">
              <div className="absolute inset-0 bg-indigo-600 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-indigo-700"></div>
              </div>

              <div className="absolute top-2 left-2 bg-white rounded-full p-2 z-10">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-yellow-400"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                  </svg>
                </div>
              </div>

              <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
                <div className="bg-yellow-400 px-4 py-2 rounded-md font-bold text-xl">
                  MEMBERSHIPS
                </div>
                <div className="bg-yellow-400 px-4 py-2 rounded-md font-bold text-xl mt-2">
                  ON BUY ME A
                </div>
                <div className="bg-yellow-400 px-4 py-2 rounded-md font-bold text-xl mt-2">
                  COFFEE
                </div>
              </div>

              <div className="absolute right-0 bottom-0 z-10 w-1/2 h-32">
                <Image
                  src="/images/coffee-creator.png"
                  alt="Creator with coffee"
                  fill
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'bottom right'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Video Player Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={handleCloseVideo}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="relative w-full bg-black overflow-hidden rounded-t-lg">
              <video
                ref={videoRef}
                className="w-full"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                src={videoUrl}
                onClick={togglePlayPause}
              >
                Your browser does not support the video tag.
              </video>

              {/* Custom Play button overlay - shows when paused */}
              {!isPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30"
                  onClick={togglePlayPause}
                >
                  <div className="rounded-full bg-white bg-opacity-80 p-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-gray-800"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}

              {/* Coffee cup overlay in corner */}
              <div className="absolute bottom-4 right-4 z-10">
                <div className="bg-yellow-400 rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-white"
                  >
                    <path d="M2 19h18v2H2v-2zm17-8v5H3v-5h1V7c0-3.3 2.7-6 6-6h4c3.3 0 6 2.7 6 6v4h-1zM7 7v4h8V7c0-2.2-1.8-4-4-4S7 4.8 7 7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Video Controls */}
            <div className="bg-white rounded-b-lg p-4">
              {/* Progress Bar */}
              <div
                className="h-1 bg-gray-200 rounded-full mb-3 cursor-pointer relative"
                onClick={handleProgressClick}
              >
                <div
                  ref={progressRef}
                  className="h-full bg-red-500 rounded-full absolute top-0 left-0"
                  style={{ width: '0%' }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <button
                    className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 mr-2"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m12.728 0l-4.242 4.242m-8.486 0l4.242-4.242"
                      />
                    </svg>
                  </button>
                  <div className="text-sm text-gray-500">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

                <div className="flex items-center">
                  <button className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCardSection;
