// app/actions/auth.ts
'use server';

import { getJwtSecretKey } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';
import { compare, hash } from 'bcrypt-ts';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { z } from 'zod';


// Input validation schemas
const RegisterSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
  displayName: z.string().min(2),
  isCreator: z.boolean().default(false)
});

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: 'Password is required' }),
  isRemember: z.boolean().optional().default(false)
});

export async function registerUser(userData) {
  try {
    // Validate input data
    const validatedData = RegisterSchema.safeParse(userData);

    if (!validatedData.success) {
      return {
        success: false,
        error: 'Invalid input data',
        validationErrors: validatedData.error.errors
      };
    }

    const data = validatedData.data;

    // Check if user already exists with the same email
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUserByEmail) {
      return {
        success: false,
        error: 'User with this email already exists'
      };
    }

    // Check if username is already taken
    const existingUserByUsername = await prisma.user.findUnique({
      where: { username: data.username }
    });

    if (existingUserByUsername) {
      return {
        success: false,
        error: 'Username already taken'
      };
    }

    // Hash the password
    const hashedPassword = await hash(data.password, 10);

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        passwordHash: hashedPassword,
        displayName: data.displayName,
        isCreator: data.isCreator,
        // Initialize empty JSON for socialLinks
        socialLinks: {}
      }
    });

    // Remove sensitive information before sending response
    const { passwordHash, ...userWithoutPassword } = newUser;

    return {
      success: true,
      user: userWithoutPassword
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: 'An error occurred during registration'
    };
  }
}

export async function signInUser(userData) {
  try {
    // Validate input data
    const validatedData = SignInSchema.safeParse(userData);

    if (!validatedData.success) {
      return {
        success: false,
        error: 'Invalid credentials'
      };
    }

    const { email, password, isRemember } = validatedData.data;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return {
        success: false,
        error: 'Invalid email or password'
      };
    }

    // Verify password
    const passwordMatch = await compare(password, user.passwordHash);

    if (!passwordMatch) {
      return {
        success: false,
        error: 'Invalid email or password'
      };
    }

    // Create session token
    const tokenExpiration = isRemember ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7; // 30 days or 7 days

    // Create JWT token
    const token = await new SignJWT({
      id: user.id.toString(),
      email: user.email,
      username: user.username,
      isCreator: user.isCreator
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(`${tokenExpiration}s`)
      .sign(getJwtSecretKey());

    // Set cookie
    cookies().set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: tokenExpiration,
      sameSite: 'strict'
    });

    // Remove sensitive information before sending response
    const { passwordHash, ...userWithoutPassword } = user;

    return {
      success: true,
      user: userWithoutPassword
    };
  } catch (error) {
    console.error('Sign-in error:', error);
    return {
      success: false,
      error: 'An error occurred during sign-in'
    };
  }
}
export async function signOutUser() {
  try {
    // Get the cookies instance
    const cookieStore = cookies();

    // Check if the auth-token cookie exists before attempting to delete it
    const authToken = cookieStore.get('auth-token');
    console.log(
      'Auth token before deletion:',
      authToken ? 'exists' : 'not found'
    );

    // Delete the auth-token cookie with complete options to ensure it's properly removed
    cookieStore.delete({
      name: 'auth-token',
      path: '/',
      domain: undefined, // Use the current domain
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax'
    });

    // Verify cookie was deleted
    const afterDeletion = cookieStore.get('auth-token');
    console.log(
      'Auth token after deletion:',
      afterDeletion ? 'still exists' : 'successfully deleted'
    );

    return {
      success: true
    };
  } catch (error) {
    console.error('Error signing out:', error);
    return {
      success: false,
      error: 'An error occurred during sign-out'
    };
  }
}
