'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import EmojiPicker from 'emoji-picker-react';
import React from 'react';

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
  const [fullName, setFullName] = React.useState(username);
  const [bioText, setBioText] = React.useState(bio);
  const [socialLinks, setSocialLinks] = React.useState([
    'https://www.google.com'
  ]);
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const [selectedEmoji, setSelectedEmoji] = React.useState('☕');
  const [coffeeText, setCoffeeText] = React.useState('coffee');
  const [showThemeColorPicker, setShowThemeColorPicker] = React.useState(false);
  const [selectedThemeColor, setSelectedThemeColor] =
    React.useState('Cotton Candy');
  const [selectedThemeColorCode, setSelectedThemeColorCode] =
    React.useState('#ff66ff');
  const [displaySupporterCount, setDisplaySupporterCount] =
    React.useState(false);

  const themeColors = [
    { name: 'Cotton Candy', color: '#ff66ff' },
    { name: 'Pumpkin Spice', color: '#ff8833' },
    { name: 'Serene Blue', color: '#4477ff' },
    { name: 'Plum Passion', color: '#9933ff' },
    { name: 'Crimson Sunset', color: '#ff4433' }
  ];

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

  const handleSave = () => {
    onSave({ fullName, bio: bioText });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-lg md:max-w-xl lg:max-w-2xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
        {/* Fixed header that doesn't scroll */}
        <div className="flex justify-between items-center px-3 sm:px-6 py-4 border-b border-gray-200 bg-white z-20 sticky top-0">
          <DialogTitle className="text-base sm:text-lg font-medium">
            Edit Page
          </DialogTitle>
          <div className="flex space-x-2">
            <button
              onClick={() => onOpenChange(false)}
              className="px-2 sm:px-4 py-1 sm:py-2 text-sm font-medium rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-2 sm:px-4 py-1 sm:py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>

        {/* Scrollable content area */}
        <div className="px-3 sm:px-6 py-4 overflow-y-auto flex-1">
          {/* Profile Photo */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Profile photo</h4>
            <div className="flex items-center">
              <div className="h-12 sm:h-16 w-12 sm:w-16 overflow-hidden rounded-md mr-4">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <button className="px-3 sm:px-4 py-1 sm:py-2 border border-gray-300 rounded-md text-sm font-medium">
                Upload
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Full Name */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Full name</h4>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-100 rounded-md"
              placeholder="Your name"
            />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* What are you creating? */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">What are you creating?</h4>
            <input
              type="text"
              value={bioText}
              onChange={(e) => setBioText(e.target.value)}
              className="w-full px-3 py-2 bg-gray-100 rounded-md"
              placeholder="Tell people what you're creating..."
            />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Arrange your sidebar */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Arrange your sidebar</h4>
            <div className="space-y-2">
              {/* Support */}
              <div className="flex items-center justify-between border border-gray-200 rounded-md p-2 sm:p-3">
                <div className="flex items-center">
                  <span className="mr-2 sm:mr-3">≡</span>
                  <div className="flex items-center">
                    <div className="mr-2">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </div>
                    <div className="max-w-[180px] sm:max-w-full">
                      <p className="text-xs sm:text-sm font-medium">Support</p>
                      <p className="text-xs text-gray-500 hidden sm:block">
                        One-time contributions from your fans
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Membership */}
              <div className="flex items-center justify-between border border-gray-200 rounded-md p-2 sm:p-3">
                <div className="flex items-center">
                  <span className="mr-2 sm:mr-3">≡</span>
                  <div className="flex items-center">
                    <div className="mr-2">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="11"
                          width="18"
                          height="11"
                          rx="2"
                          ry="2"
                        ></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </div>
                    <div className="max-w-[180px] sm:max-w-full">
                      <p className="text-xs sm:text-sm font-medium">
                        Membership
                      </p>
                      <p className="text-xs text-gray-500 hidden sm:block">
                        Recurring support for exclusive benefits
                      </p>
                    </div>
                  </div>
                </div>
                <button className="text-gray-500">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </button>
              </div>

              {/* Shop */}
              <div className="flex items-center justify-between border border-gray-200 rounded-md p-2 sm:p-3">
                <div className="flex items-center">
                  <span className="mr-2 sm:mr-3">≡</span>
                  <div className="flex items-center">
                    <div className="mr-2">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                      </svg>
                    </div>
                    <div className="max-w-[180px] sm:max-w-full">
                      <p className="text-xs sm:text-sm font-medium">Shop</p>
                      <p className="text-xs text-gray-500 hidden sm:block">
                        Sell your merchandise and creations
                      </p>
                    </div>
                  </div>
                </div>
                <button className="text-gray-500">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* About me */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">About me</h4>
            <div className="bg-gray-100 rounded-md p-4">
              <div className="flex items-center mb-2">
                <button className="p-1 mr-2">
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
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                </button>
                <button className="p-1 mr-2">
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
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </button>
              </div>
              <p className="text-sm">i am a software enginerr</p>
            </div>
          </div>

          {/* Featured video */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Featured video</h4>
            <input
              type="text"
              placeholder="Paste your YouTube or Vimeo link here"
              className="w-full px-3 py-2 bg-gray-100 rounded-md"
            />
          </div>

          {/* Social links */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Social links</h4>
            {socialLinks.map((link, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-md p-2 sm:p-3 flex items-center mb-2"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500 mr-2"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
                <input
                  type="text"
                  defaultValue={link}
                  onChange={(e) => updateSocialLink(index, e.target.value)}
                  className="bg-transparent flex-1 outline-none text-xs sm:text-sm truncate"
                />
                <button
                  className="ml-2"
                  onClick={() => removeSocialLink(index)}
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
                    className="text-gray-500"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            ))}
            <button
              onClick={addSocialLink}
              className="flex items-center mt-3 text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full border border-blue-600 text-blue-600"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              + Add social link
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Replace coffee with anything you like */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">
              Replace "coffee" with anything you like
            </h4>
            <div className="flex items-center">
              <div className="relative">
                <button
                  className="bg-white border border-gray-200 p-2 rounded-md mr-2 sm:mr-3 flex items-center justify-center"
                  onClick={toggleEmojiPicker}
                >
                  <span role="img" aria-label="emoji">
                    {selectedEmoji}
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
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
                className="bg-gray-100 rounded-md p-2 sm:p-3 flex-1 text-sm"
              />
            </div>
            <div className="flex flex-wrap mt-3 gap-2">
              <button
                className="flex items-center bg-gray-100 rounded-md px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm"
                onClick={() => {
                  setSelectedEmoji('☕');
                  setCoffeeText('Coffee');
                }}
              >
                <span role="img" aria-label="coffee" className="mr-1 sm:mr-2">
                  ☕
                </span>
                Coffee
              </button>
              <button
                className="flex items-center bg-gray-100 rounded-md px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm"
                onClick={() => {
                  setSelectedEmoji('🍺');
                  setCoffeeText('Beer');
                }}
              >
                <span role="img" aria-label="beer" className="mr-1 sm:mr-2">
                  🍺
                </span>
                Beer
              </button>
              <button
                className="flex items-center bg-gray-100 rounded-md px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm"
                onClick={() => {
                  setSelectedEmoji('🍕');
                  setCoffeeText('Pizza');
                }}
              >
                <span role="img" aria-label="pizza" className="mr-1 sm:mr-2">
                  🍕
                </span>
                Pizza
              </button>
              <button
                className="flex items-center bg-gray-100 rounded-md px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm"
                onClick={() => {
                  setSelectedEmoji('📖');
                  setCoffeeText('Book');
                }}
              >
                <span role="img" aria-label="book" className="mr-1 sm:mr-2">
                  📖
                </span>
                Book
              </button>
            </div>
          </div>

          {/* Theme color */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Theme color</h4>
            <div className="flex items-center relative">
              <div
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-md mr-2 sm:mr-3"
                style={{ backgroundColor: selectedThemeColorCode }}
              ></div>
              <div className="relative flex-1">
                <button
                  className="flex items-center justify-between bg-white border border-gray-200 rounded-md px-2 sm:px-3 py-1 sm:py-2 w-full text-xs sm:text-sm"
                  onClick={toggleThemeColorPicker}
                >
                  <span>{selectedThemeColor}</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>

                {/* Theme color picker popover */}
                {showThemeColorPicker && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 max-h-40 overflow-y-auto">
                    {themeColors.map((theme) => (
                      <button
                        key={theme.name}
                        className="flex items-center w-full px-2 sm:px-3 py-2 hover:bg-gray-100 text-xs sm:text-sm"
                        onClick={() =>
                          selectThemeColor(theme.name, theme.color)
                        }
                      >
                        <div
                          className="w-4 h-4 sm:w-6 sm:h-6 rounded-full mr-2 sm:mr-3"
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
                <h4 className="text-xs sm:text-sm font-medium">
                  Display supporter count
                </h4>
                <button className="ml-1 sm:ml-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </button>
              </div>
              <button
                className={`w-10 sm:w-12 h-5 sm:h-6 rounded-full flex items-center p-1 transition-colors ${displaySupporterCount ? 'bg-black' : 'bg-gray-200'}`}
                onClick={toggleSupporterCount}
              >
                <div
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white transform transition-transform ${displaySupporterCount ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0'}`}
                ></div>
              </button>
            </div>
          </div>

          {/* Social sharing */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <h4 className="text-xs sm:text-sm font-medium">Social sharing</h4>
              <button className="ml-1 sm:ml-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </button>
            </div>
            <div className="bg-gray-100 rounded-md p-2 sm:p-3 flex items-center mb-4">
              <span className="text-gray-500 mr-2">@</span>
              <input
                type="text"
                defaultValue="username"
                className="bg-transparent flex-1 outline-none text-xs sm:text-sm"
              />
              <button className="ml-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
