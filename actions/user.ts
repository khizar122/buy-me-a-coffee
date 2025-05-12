'use server';

import { prisma } from '@/lib/db/prisma';
import { Prisma, User } from '@prisma/client';

// Common type definitions
type SortOrder = 'asc' | 'desc';

// Post-related types
interface PostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Subscription plan types
interface SubscriptionPlanData {
  id: string;
  name: string;
  description: string | null;
  price: number;
  interval: string;
  features: string[] | null;
}

// Social link type
interface SocialLink {
  platform: string;
  url: string;
}

// User data types
interface BaseUserData {
  id: string;
  username: string;
  email: string;
  displayName: string;
  creatorTagline: string | null;
  profilePictureUrl: string | null;
  coverImage: string | null;
  isCreator: boolean;
  isVerified: boolean;
  createdAt: Date;
}

interface UserListData extends BaseUserData {
  followersCount: number;
  postsCount: number;
}

interface DetailedUserData extends BaseUserData {
  bio: string | null;
  aboutMe: string | null;
  featuredVideoUrl: string | null;
  supportTerm: string | null;
  themeColor: string | null;
  showSupporterCount: boolean;
  socialShareHandle: string | null;
  followersCount: number;
  postsCount: number;
  supportersCount: number;
  socialLinks: SocialLink[];
  posts: PostData[];
  subscriptionPlans: SubscriptionPlanData[];
}

// Prisma return types
type UserWithCounts = User & {
  _count: {
    followsFollowers: number;
    posts: number;
    paymentsReceived?: number;
  }
};

// Pagination data
interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Parameter types
interface GetAllUsersParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  isCreator?: boolean | null;
  sortBy?: string;
  sortOrder?: SortOrder;
}

// Response types
interface AllUsersSuccessResponse {
  success: true;
  users: UserListData[];
  pagination: PaginationData;
}

interface UserByIdSuccessResponse {
  success: true;
  user: DetailedUserData;
}

interface ErrorResponse {
  error: string;
  success?: never;
}

// Union types for responses
type GetAllUsersResponse = AllUsersSuccessResponse | ErrorResponse;
type GetUserByIdResponse = UserByIdSuccessResponse | ErrorResponse;

/**
 * Get all users with optional filtering and pagination
 */
export async function getAllUsers({
  page = 1,
  limit = 10,
  searchTerm = '',
  isCreator = null,
  sortBy = 'createdAt',
  sortOrder = 'desc'
}: GetAllUsersParams = {}): Promise<GetAllUsersResponse> {
  try {
    // Calculate pagination values
    const skip = (page - 1) * limit;

    // Build where clause
    const where: Prisma.UserWhereInput = {};

    // Add search filter if provided
    if (searchTerm) {
      where.OR = [
        { username: { contains: searchTerm, mode: 'insensitive' } },
        { email: { contains: searchTerm, mode: 'insensitive' } },
        { displayName: { contains: searchTerm, mode: 'insensitive' } }
      ];
    }

    // Add creator filter if specified
    if (isCreator !== null) {
      where.isCreator = isCreator;
    }

    // Define the orderBy object based on the sortBy parameter
    let orderBy: Prisma.UserOrderByWithRelationInput;

    // Fix the orderBy parameter for relation fields
    if (sortBy === 'followsFollowers') {
      // For ordering by followers count, we need to use _count
      orderBy = {
        followsFollowers: {
          _count: sortOrder
        }
      };
    } else if (sortBy === 'posts') {
      // For ordering by posts count, we need to use _count
      orderBy = {
        posts: {
          _count: sortOrder
        }
      };
    } else {
      // For regular fields, we can use the simple syntax
      orderBy = { [sortBy]: sortOrder } as Prisma.UserOrderByWithRelationInput;
    }

    // Get users with pagination
    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        username: true,
        email: true,
        displayName: true,
        creatorTagline: true,
        profilePictureUrl: true,
        // coverImage removed as it does not exist in the schema
        isCreator: true,
        isVerified: true,
        createdAt: true,
        _count: {
          select: {
            followsFollowers: true,
            posts: true
          }
        }
      },
      skip,
      take: limit,
      orderBy
    });

    // Get total count for pagination
    const totalUsers = await prisma.user.count({ where });

    return {
      success: true,
      users: users.map((user: any) => ({
        id: user.id.toString(),
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        creatorTagline: user.creatorTagline || '',
        profilePictureUrl:
          user.profilePictureUrl || 'https://via.placeholder.com/150',
        coverImage: user.coverImage || null,
        isCreator: user.isCreator,
        isVerified: user.isVerified,
        followersCount: user._count?.followsFollowers || 0,
        postsCount: user._count?.posts || 0,
        createdAt: user.createdAt
      })),
      pagination: {
        total: totalUsers,
        page,
        limit,
        totalPages: Math.ceil(totalUsers / limit)
      }
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return { error: 'Failed to fetch users. Please try again.' };
  }
}

/**
 * Get user by ID with detailed information
 */
export async function getUserById(userId: string): Promise<GetUserByIdResponse> {
  try {
    if (!userId) {
      return { error: 'User ID is required' };
    }

    // Convert string ID to BigInt for Prisma
    let userIdBigInt: bigint;
    try {
      userIdBigInt = BigInt(userId);
    } catch (e) {
      return { error: 'Invalid user ID format' };
    }

    // Define the type for the user query result including counts
    type UserWithFullData = User & {
      posts: Array<{
        id: bigint;
        title: string;
        slug: string;
        excerpt: string | null;
        coverImage: string | null;
        createdAt: Date;
        updatedAt: Date;
      }>;
      subscriptionPlans: Array<{
        id: bigint;
        name: string;
        description: string | null;
        price: Prisma.Decimal;
        interval: string;
        features: string | null;
      }>;
      _count: {
        followsFollowers: number;
        posts: number;
        paymentsReceived: number;
      };
    };

    // Find user in the database with their related data
    const user = await prisma.user.findUnique({
      where: { id: userIdBigInt },
      include: {
        posts: {
          // Removed 'isPublished' as it does not exist in the schema
          where: {},
          orderBy: { createdAt: 'desc' },
          take: 10,
          select: {
            id: true,
            title: true,
            // slug: true, // Removed as it does not exist in the PostSelect type
            // excerpt: true, 
            coverImage: true,
            createdAt: true,
            updatedAt: true
          }
        },
        subscriptionPlans: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            // description field removed as it does not exist in the schema
            price: true,
            // interval field removed as it does not exist in the schema
            // Removed 'features' as it does not exist in the schema
          }
        },
        _count: {
          select: {
            followsFollowers: true,
            posts: true,
            paymentsReceived: {
              where: { status: 'COMPLETED' }
            }
          }
        }
      }
    }) as UserWithFullData | null;

    if (!user) {
      return { error: 'User not found' };
    }

    // Parse social links from JSON if they exist
    let socialLinks: SocialLink[] = [];
    if (user.socialLinks) {
      try {
        const parsedLinks = JSON.parse(user.socialLinks.toString());
        // Validate the structure of parsed links
        if (Array.isArray(parsedLinks)) {
          socialLinks = parsedLinks.map(link => ({
            platform: typeof link.platform === 'string' ? link.platform : '',
            url: typeof link.url === 'string' ? link.url : ''
          }));
        }
      } catch (e) {
        console.error('Error parsing social links:', e);
        // Continue with empty social links if parsing fails
      }
    }

    // Process subscription plan features
    const subscriptionPlans = user.subscriptionPlans.map(plan => {
      let features: string[] | null = null;
      
      if (plan.features) {
        try {
          if (typeof plan.features === 'string') {
            features = JSON.parse(plan.features);
          } else {
            features = plan.features as unknown as string[];
          }
        } catch (e) {
          console.error('Error parsing subscription plan features:', e);
        }
      }
      
      return {
        id: plan.id.toString(),
        name: plan.name,
        description: plan.description,
        price: Number(plan.price),
        interval: plan.interval,
        features
      };
    });

    // Format and return the user data
    return {
      success: true,
      user: {
        id: user.id.toString(),
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        creatorTagline: user.creatorTagline,
        bio: user.bio,
        aboutMe: user.aboutMe,
        profilePictureUrl: user.profilePictureUrl || 'https://via.placeholder.com/150',
        coverImage: user.coverImage,
        featuredVideoUrl: user.featuredVideoUrl,
        supportTerm: user.supportTerm,
        themeColor: user.themeColor,
        showSupporterCount: user.showSupporterCount,
        socialShareHandle: user.socialShareHandle,
        isCreator: user.isCreator,
        isVerified: user.isVerified,
        // Use optional chaining and provide defaults for count properties
        followersCount: user._count?.followsFollowers || 0,
        postsCount: user._count?.posts || 0,
        supportersCount: user._count?.paymentsReceived || 0,
        createdAt: user.createdAt,
        socialLinks,
        posts: user.posts.map(post => ({
          id: post.id.toString(),
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          coverImage: post.coverImage,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt
        })),
        subscriptionPlans
      }
    };
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return { error: 'Failed to fetch user. Please try again.' };
  }
}
