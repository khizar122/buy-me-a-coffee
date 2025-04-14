export interface UserProfileResponse {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  userType: string;
  country: string;
  city: string;
  streetAddress: string;
  avatar: string;
  role: string;
  id: string;
}

export interface UpdateProfileRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  country: string;
  city: string;
  streetAddress: string;
}
