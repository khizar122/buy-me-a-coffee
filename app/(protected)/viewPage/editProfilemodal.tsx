'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import EmojiPicker from 'emoji-picker-react';
import { toast } from 'sonner';
import {
  getUserProfile,
  updateProfile,
  uploadFeaturedVideo,
  uploadProfileImage
} from '@/actions/profile';
import {
  Heart,
  Lock,
  ShoppingBag,
  Link2,
  Book,
  Info,
  ChevronDown,
  Plus,
  X,
  Play,
  ExternalLink
} from 'lucide-react';

interface EditProfileDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  username: string;
  bio: string;
  profileImage?: string;
  onSave: (data: { fullName: string; bio: string }) => void;
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  isOpen,
  onOpenChange,
  username,
  bio,
  profileImage = '/placeholder-profile.jpg',
  onSave
}) => {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState(username);
  const [bioText, setBioText] = useState(bio);
  const [aboutMeText, setAboutMeText] = useState('i am a software enginerr');
  const [socialLinks, setSocialLinks] = useState(['https://www.google.com']);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('☕');
  const [coffeeText, setCoffeeText] = useState('coffee');
  const [showThemeColorPicker, setShowThemeColorPicker] = useState(false);
  const [selectedThemeColor, setSelectedThemeColor] = useState('Pumpkin Spice');
  const [selectedThemeColorCode, setSelectedThemeColorCode] =
    useState('#ff8833');
  const [displaySupporterCount, setDisplaySupporterCount] = useState(false);
  const [socialShareHandle, setSocialShareHandle] = useState('username');

  // Media upload states
  const [uploadingImage, setUploadingImage] = useState(false);
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);
  const [featuredVideoUrl, setFeaturedVideoUrl] = useState('');
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  // Refs for file inputs
  const profileImageInputRef = useRef<HTMLInputElement>(null);
  const featuredVideoInputRef = useRef<HTMLInputElement>(null);

  const themeColors = [
    { name: 'Pumpkin Spice', color: '#ff8833' },
    { name: 'Cotton Candy', color: '#ff66ff' },
    { name: 'Serene Blue', color: '#4477ff' },
    { name: 'Plum Passion', color: '#9933ff' },
    { name: 'Crimson Sunset', color: '#ff4433' }
  ];

  const presetButtons = [
    { emoji: '☕', text: 'Coffee' },
    { emoji: '🍺', text: 'Beer' },
    { emoji: '🍕', text: 'Pizza' },
    { emoji: '📖', text: 'Book' }
  ];

  // Fetch user profile data when dialog opens
  useEffect(() => {
    if (isOpen) {
      fetchUserProfile();
    }
  }, [isOpen]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const userData = await getUserProfile();

      if (userData) {
        setFullName(userData.fullName || username);
        setBioText(userData.bio || bio);
        setAboutMeText(userData.aboutMe || '');
        setCurrentProfileImage(userData.profilePictureUrl || profileImage);
        setFeaturedVideoUrl(userData.featuredVideoUrl || '');

        // Handle supportTerm - extract emoji and text
        if (userData.supportTerm) {
          // Check if the first character is an emoji
          const firstChar = userData.supportTerm.charAt(0);
          const isEmoji = /[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(firstChar);

          if (isEmoji) {
            // Extract the emoji and the rest of the text
            setSelectedEmoji(firstChar);
            setCoffeeText(userData.supportTerm.slice(1).trim());
          } else {
            // No emoji found, just set the text
            setCoffeeText(userData.supportTerm);
          }
        } else {
          // Default values
          setSelectedEmoji('☕');
          setCoffeeText('coffee');
        }

        setSelectedThemeColor(
          userData.themeColor
            ? getThemeColorName(userData.themeColor)
            : 'Pumpkin Spice'
        );
        setSelectedThemeColorCode(userData.themeColor || '#ff8833');
        setDisplaySupporterCount(userData.showSupporterCount);
        setSocialShareHandle(userData.socialShareHandle || username);
        setSocialLinks(
          userData.socialLinks && userData.socialLinks.length > 0
            ? userData.socialLinks
            : ['']
        );
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const getThemeColorName = (colorCode: string) => {
    const color = themeColors.find((c) => c.color === colorCode);
    return color ? color.name : 'Pumpkin Spice';
  };

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, '']);
  };

  const removeSocialLink = (index: number) => {
    const newLinks = [...socialLinks];
    newLinks.splice(index, 1);
    setSocialLinks(newLinks);
  };

  const updateSocialLink = (index: number, value: string) => {
    const newLinks = [...socialLinks];
    newLinks[index] = value;
    setSocialLinks(newLinks);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const onEmojiClick = (emojiObject: any) => {
    setSelectedEmoji(emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const toggleThemeColorPicker = () => {
    setShowThemeColorPicker(!showThemeColorPicker);
  };

  const selectThemeColor = (name: string, color: string) => {
    setSelectedThemeColor(name);
    setSelectedThemeColorCode(color);
    setShowThemeColorPicker(false);
  };

  const toggleSupporterCount = () => {
    setDisplaySupporterCount(!displaySupporterCount);
  };

  // Handler for profile image upload
  const handleProfileImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a JPEG, PNG, GIF, or WEBP image');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('Maximum file size is 5MB');
      return;
    }

    try {
      setUploadingImage(true);

      // Create a preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setCurrentProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);

      // Upload the image
      const formData = new FormData();
      formData.append('file', file);

      const result = await uploadProfileImage(formData);

      if (result.error) {
        toast.error(result.error);
        // Reset to previous image
        setCurrentProfileImage(profileImage);
        return;
      }

      toast.success('Profile picture updated successfully');

      // Update with the actual URL from server
      setCurrentProfileImage(result.imageUrl);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('An unexpected error occurred');
      // Reset to previous image
      setCurrentProfileImage(profileImage);
    } finally {
      setUploadingImage(false);
    }
  };

  // Handler for featured video upload
  const handleFeaturedVideoChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file type
    const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload an MP4, WEBM, or MOV video');
      return;
    }

    // Validate file size (max 100MB)
    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('Maximum file size is 100MB');
      return;
    }

    try {
      setUploadingVideo(true);
      setVideoFile(file);

      // Create a preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setVideoPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);

      // Upload the video
      const formData = new FormData();
      formData.append('file', file);

      const result = await uploadFeaturedVideo(formData);

      if (result.error) {
        toast.error(result.error);
        setVideoPreview(null);
        setVideoFile(null);
        return;
      }

      toast.success('Featured video uploaded successfully');

      // Update with the actual URL from server
      setFeaturedVideoUrl(result.videoUrl);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('An unexpected error occurred');
      setVideoPreview(null);
      setVideoFile(null);
    } finally {
      setUploadingVideo(false);
    }
  };

  // Function to handle manual video URL input
  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeaturedVideoUrl(e.target.value);
    // Clear video preview if any
    setVideoPreview(null);
    setVideoFile(null);
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      // Prepare profile data
      const profileData = {
        fullName,
        bio: bioText,
        aboutMe: aboutMeText,
        featuredVideoUrl,
        profilePictureUrl: currentProfileImage,
        supportTerm: `${selectedEmoji} ${coffeeText}`.trim(), // Combine emoji and text
        themeColor: selectedThemeColorCode,
        showSupporterCount: displaySupporterCount,
        socialShareHandle,
        socialLinks: socialLinks.filter((link) => link.trim() !== '')
      };

      // Update profile
      const result = await updateProfile(profileData);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      // Call the onSave callback
      onSave({ fullName, bio: bioText });

      toast.success('Profile updated successfully');

      // Close the dialog
      onOpenChange(false);
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-lg md:max-w-xl lg:max-w-2xl max-h-[90vh] flex flex-col p-0 overflow-hidden bg-card">
        {/* Fixed header that doesn't scroll */}
        <div className="flex justify-between items-center px-3 sm:px-6 py-4 border-b border-border bg-card z-20 sticky top-0">
          <DialogTitle className="text-base sm:text-lg font-medium text-foreground">
            Edit Page
          </DialogTitle>
          <div className="flex space-x-2">
            <button
              onClick={() => onOpenChange(false)}
              className="px-2 sm:px-4 py-1 sm:py-2 text-sm font-medium rounded-md text-foreground/70 hover:text-foreground transition-colors"
              disabled={loading || uploadingImage || uploadingVideo}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className={`px-2 sm:px-4 py-1 sm:py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors ${
                loading || uploadingImage || uploadingVideo
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              disabled={loading || uploadingImage || uploadingVideo}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        {/* Scrollable content area */}
        <div className="px-3 sm:px-6 py-4 overflow-y-auto flex-1 bg-background">
          {/* Profile Photo */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2 text-foreground">
              Profile photo
            </h4>
            <div className="flex items-center">
              <div className="h-12 sm:h-16 w-12 sm:w-16 overflow-hidden rounded-md mr-4 relative">
                {uploadingImage && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="animate-spin h-5 w-5 border-2 border-white border-r-transparent rounded-full"></div>
                  </div>
                )}
                <img
                  src={currentProfileImage || '/placeholder.svg'}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <label className="px-3 sm:px-4 py-1 sm:py-2 border border-border rounded-md text-sm font-medium cursor-pointer bg-secondary/30 hover:bg-secondary/50 transition-colors text-foreground">
                Upload
                <input
                  type="file"
                  ref={profileImageInputRef}
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  className="hidden"
                  onChange={handleProfileImageChange}
                  disabled={uploadingImage || loading}
                />
              </label>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border my-6"></div>

          {/* Full Name */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2 text-foreground">
              Full name
            </h4>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 bg-secondary/30 rounded-md border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Your name"
              disabled={loading}
            />
          </div>

          {/* Divider */}
          <div className="border-t border-border my-6"></div>

          {/* What are you creating? */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2 text-foreground">
              What are you creating?
            </h4>
            <input
              type="text"
              value={bioText}
              onChange={(e) => setBioText(e.target.value)}
              className="w-full px-3 py-2 bg-secondary/30 rounded-md border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Tell people what you're creating..."
              disabled={loading}
            />
          </div>

          {/* Divider */}
          <div className="border-t border-border my-6"></div>

          {/* Arrange your sidebar */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2 text-foreground">
              Arrange your sidebar
            </h4>
            <div className="space-y-2">
              {/* Support */}
              <div className="flex items-center justify-between border border-border rounded-md p-2 sm:p-3 bg-card">
                <div className="flex items-center">
                  <span className="mr-2 sm:mr-3 text-foreground/70">≡</span>
                  <div className="flex items-center">
                    <div className="mr-2 text-primary">
                      <Heart size={18} />
                    </div>
                    <div className="max-w-[180px] sm:max-w-full">
                      <p className="text-xs sm:text-sm font-medium text-foreground">
                        Support
                      </p>
                      <p className="text-xs text-foreground/60 hidden sm:block">
                        One-time contributions from your fans
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Membership */}
              <div className="flex items-center justify-between border border-border rounded-md p-2 sm:p-3 bg-card">
                <div className="flex items-center">
                  <span className="mr-2 sm:mr-3 text-foreground/70">≡</span>
                  <div className="flex items-center">
                    <div className="mr-2 text-primary">
                      <Lock size={18} />
                    </div>
                    <div className="max-w-[180px] sm:max-w-full">
                      <p className="text-xs sm:text-sm font-medium text-foreground">
                        Membership
                      </p>
                      <p className="text-xs text-foreground/60 hidden sm:block">
                        Recurring support for exclusive benefits
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-foreground/60 hover:text-foreground/80 transition-colors"
                >
                  <ExternalLink size={18} />
                </button>
              </div>

              {/* Shop */}
              <div className="flex items-center justify-between border border-border rounded-md p-2 sm:p-3 bg-card">
                <div className="flex items-center">
                  <span className="mr-2 sm:mr-3 text-foreground/70">≡</span>
                  <div className="flex items-center">
                    <div className="mr-2 text-primary">
                      <ShoppingBag size={18} />
                    </div>
                    <div className="max-w-[180px] sm:max-w-full">
                      <p className="text-xs sm:text-sm font-medium text-foreground">
                        Shop
                      </p>
                      <p className="text-xs text-foreground/60 hidden sm:block">
                        Sell your merchandise and creations
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-foreground/60 hover:text-foreground/80 transition-colors"
                >
                  <ExternalLink size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border my-6"></div>

          {/* About me */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2 text-foreground">
              About me
            </h4>
            <div className="bg-secondary/30 rounded-md p-4 border border-border">
              <div className="flex items-center mb-2">
                <button
                  type="button"
                  className="p-1 mr-2 text-foreground/70 hover:text-foreground/90 transition-colors"
                >
                  <Book size={16} />
                </button>
                <button
                  type="button"
                  className="p-1 mr-2 text-foreground/70 hover:text-foreground/90 transition-colors"
                >
                  <ExternalLink size={16} />
                </button>
              </div>
              <textarea
                value={aboutMeText}
                onChange={(e) => setAboutMeText(e.target.value)}
                className="w-full bg-transparent border-none outline-none resize-none text-sm text-foreground"
                disabled={loading}
              />
            </div>
          </div>

          {/* Featured video */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2 text-foreground">
              Featured video
            </h4>
            <div className="space-y-3">
              {/* Input for paste */}
              <input
                type="text"
                value={featuredVideoUrl}
                onChange={handleVideoUrlChange}
                placeholder="Paste your YouTube or Vimeo link here"
                className="w-full px-3 py-2 bg-secondary/30 rounded-md border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                disabled={loading || uploadingVideo}
              />

              {/* Or upload a video */}
              <div className="flex items-center">
                <span className="text-xs text-foreground/60 mr-2">or</span>
                <label className="px-3 py-1 border border-border rounded-md text-xs font-medium cursor-pointer bg-secondary/30 hover:bg-secondary/50 transition-colors text-foreground">
                  Upload Video
                  <input
                    type="file"
                    ref={featuredVideoInputRef}
                    accept="video/mp4,video/webm,video/quicktime"
                    className="hidden"
                    onChange={handleFeaturedVideoChange}
                    disabled={uploadingVideo || loading}
                  />
                </label>
              </div>

              {/* Video preview */}
              {(videoPreview || featuredVideoUrl) && (
                <div className="relative rounded-md overflow-hidden bg-secondary/30 border border-border">
                  {uploadingVideo && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                      <div className="animate-spin h-8 w-8 border-4 border-white border-r-transparent rounded-full"></div>
                    </div>
                  )}

                  {videoPreview ? (
                    <video
                      src={videoPreview}
                      controls
                      className="w-full h-40 object-contain"
                    ></video>
                  ) : (
                    featuredVideoUrl &&
                    (featuredVideoUrl.includes('youtube.com') ||
                    featuredVideoUrl.includes('youtu.be') ? (
                      <div className="h-40 flex items-center justify-center bg-secondary text-foreground">
                        <div className="text-center">
                          <Play size={40} className="mx-auto mb-2" />
                          <p className="text-xs">YouTube Video</p>
                        </div>
                      </div>
                    ) : (
                      <div className="h-40 flex items-center justify-center bg-secondary text-foreground">
                        <div className="text-center">
                          <Play size={40} className="mx-auto mb-2" />
                          <p className="text-xs">
                            Video URL: {featuredVideoUrl.substring(0, 30)}...
                          </p>
                        </div>
                      </div>
                    ))
                  )}

                  {/* Remove button */}
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-70 transition-opacity"
                    onClick={() => {
                      setVideoPreview(null);
                      setVideoFile(null);
                      setFeaturedVideoUrl('');
                    }}
                    disabled={uploadingVideo}
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Social links */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2 text-foreground">
              Social links
            </h4>
            {socialLinks.map((link, index) => (
              <div
                key={index}
                className="bg-secondary/30 rounded-md p-2 sm:p-3 flex items-center mb-2 border border-border"
              >
                <Link2 size={18} className="text-foreground/70 mr-2" />
                <input
                  type="text"
                  value={link}
                  onChange={(e) => updateSocialLink(index, e.target.value)}
                  className="bg-transparent flex-1 outline-none text-xs sm:text-sm truncate text-foreground"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="ml-2 text-foreground/60 hover:text-foreground/80 transition-colors"
                  onClick={() => removeSocialLink(index)}
                  disabled={loading || socialLinks.length <= 1}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={addSocialLink}
              className="flex items-center mt-3 text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors"
              disabled={loading}
              type="button"
            >
              <Plus size={14} className="mr-1" />
              Add social link
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-border my-6"></div>

          {/* Replace coffee with anything you like */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2 text-foreground">
              Replace "coffee" with anything you like
            </h4>
            <div className="flex items-center">
              <div className="relative">
                <button
                  className="bg-card border border-border p-2 rounded-md mr-2 sm:mr-3 flex items-center justify-center hover:bg-secondary/30 transition-colors"
                  onClick={toggleEmojiPicker}
                  type="button"
                  disabled={loading}
                >
                  <span role="img" aria-label="emoji" className="mr-1">
                    {selectedEmoji}
                  </span>
                  <ChevronDown size={12} />
                </button>
                {/* Emoji Picker from emoji-picker-react - positioned relative to screen size */}
                {showEmojiPicker && (
                  <div className="absolute top-full left-0 mt-1 z-20 max-w-[90vw] sm:max-w-[320px]">
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                  </div>
                )}
              </div>
              <input
                type="text"
                value={coffeeText}
                onChange={(e) => setCoffeeText(e.target.value)}
                className="bg-secondary/30 rounded-md p-2 sm:p-3 flex-1 text-sm border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                disabled={loading}
              />
            </div>
            <div className="flex flex-wrap mt-3 gap-2">
              {presetButtons.map((preset) => (
                <button
                  key={preset.text}
                  className="flex items-center bg-secondary/30 rounded-md px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm border border-border text-foreground hover:bg-secondary/50 transition-colors"
                  onClick={() => {
                    setSelectedEmoji(preset.emoji);
                    setCoffeeText(preset.text);
                  }}
                  type="button"
                  disabled={loading}
                >
                  <span
                    role="img"
                    aria-label={preset.text.toLowerCase()}
                    className="mr-1 sm:mr-2"
                  >
                    {preset.emoji}
                  </span>
                  {preset.text}
                </button>
              ))}
            </div>
          </div>

          {/* Theme color */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2 text-foreground">
              Theme color
            </h4>
            <div className="flex items-center relative">
              <div
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-md mr-2 sm:mr-3 border border-border"
                style={{ backgroundColor: selectedThemeColorCode }}
              ></div>
              <div className="relative flex-1">
                <button
                  className="flex items-center justify-between bg-card border border-border rounded-md px-2 sm:px-3 py-1 sm:py-2 w-full text-xs sm:text-sm hover:bg-secondary/30 transition-colors text-foreground"
                  onClick={toggleThemeColorPicker}
                  type="button"
                  disabled={loading}
                >
                  <span>{selectedThemeColor}</span>
                  <ChevronDown size={14} />
                </button>

                {/* Theme color picker popover */}
                {showThemeColorPicker && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg z-20 max-h-40 overflow-y-auto">
                    {themeColors.map((theme) => (
                      <button
                        key={theme.name}
                        className="flex items-center w-full px-2 sm:px-3 py-2 hover:bg-secondary/30 text-xs sm:text-sm text-foreground transition-colors"
                        onClick={() =>
                          selectThemeColor(theme.name, theme.color)
                        }
                        type="button"
                        disabled={loading}
                      >
                        <div
                          className="w-4 h-4 sm:w-6 sm:h-6 rounded-full mr-2 sm:mr-3 border border-border"
                          style={{ backgroundColor: theme.color }}
                        ></div>
                        <span>{theme.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Display supporter count */}
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h4 className="text-xs sm:text-sm font-medium text-foreground">
                  Display supporter count
                </h4>
                <button
                  className="ml-1 sm:ml-2 text-foreground/60 hover:text-foreground/80 transition-colors"
                  type="button"
                  disabled={loading}
                >
                  <Info size={14} />
                </button>
              </div>
              <button
                className={`w-10 sm:w-12 h-5 sm:h-6 rounded-full flex items-center p-1 transition-colors ${
                  displaySupporterCount ? 'bg-primary' : 'bg-secondary/50'
                }`}
                onClick={toggleSupporterCount}
                type="button"
                disabled={loading}
              >
                <div
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white transform transition-transform ${
                    displaySupporterCount
                      ? 'translate-x-5 sm:translate-x-6'
                      : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>
          </div>

          {/* Social sharing */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <h4 className="text-xs sm:text-sm font-medium text-foreground">
                Social sharing
              </h4>
              <button
                className="ml-1 sm:ml-2 text-foreground/60 hover:text-foreground/80 transition-colors"
                type="button"
                disabled={loading}
              >
                <Info size={14} />
              </button>
            </div>
            <div className="bg-secondary/30 rounded-md p-2 sm:p-3 flex items-center mb-4 border border-border">
              <span className="text-foreground/70 mr-2">@</span>
              <input
                type="text"
                value={socialShareHandle}
                onChange={(e) => setSocialShareHandle(e.target.value)}
                className="bg-transparent flex-1 outline-none text-xs sm:text-sm text-foreground"
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
