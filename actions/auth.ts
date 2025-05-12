'use server';

import { getJwtSecretKey } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';
import { compare, hash } from 'bcrypt-ts';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { Resend } from 'resend';
import { z } from 'zod';

// Initialize Resend for email sending
const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to generate OTP
function generateOTP() {
  // Generate a 4-digit OTP
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Helper function to send OTP email using Resend
async function sendVerificationEmail(email, otp, username) {
  try {
    const safeUsername = username?.toString() || 'User';

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Use this default Resend address for testing
      to: email,
      subject: 'Verify Your Email',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #333; text-align: center;">Email Verification</h2>
          <p>Hello ${safeUsername},</p>
          <p>Thank you for signing up! To complete your registration, please use the following verification code:</p>
          <div style="background-color: #f7f7f7; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
            ${otp}
          </div>
          <p>This code will expire in 15 minutes.</p>
          <p>If you didn't request this verification, please ignore this email.</p>
          <p>Best regards,<br>Your App Team</p>
        </div>
      `
    });

    if (error) {
      console.error('Failed to send verification email:', error);
      return { success: false, error: 'Failed to send verification email' };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send verification email:', error);
    return { success: false, error: 'Failed to send verification email' };
  }
}

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

const VerifyOTPSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(4)
});

const ResendOTPSchema = z.object({
  email: z.string().email()
});

export async function registerUser(userData: any) {
  try {
    if (!userData) {
      throw new Error('User data is missing.');
    }

    // Validate input data
    const validatedData = RegisterSchema.safeParse(userData);
    console.log('validatedData', validatedData);
    if (!validatedData.success) {
      return {
        success: false,
        error: 'Invalid input data',
        validationErrors: validatedData.error.errors
      };
    }

    const data = validatedData.data;

    // Check if user already exists by email or username
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }]
      }
    });

    if (existingUser) {
      const errorMessage =
        existingUser.email === data.email
          ? 'User with this email already exists'
          : 'Username already taken';

      return {
        success: false,
        error: errorMessage
      };
    }

    // Hash the password
    const hashedPassword = await hash(data.password, 10);

    // Generate OTP for email verification
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);
    const db = {
      username: data.username ?? '',
      email: data.email ?? '',
      passwordHash: hashedPassword ?? '',
      displayName: data.displayName ?? ''
    };

    console.log('here', db);

    await prisma.user.create({
      data: db
    });

    // Send verification email
    const emailResult = await sendVerificationEmail(
      data.email,
      otp,
      data.username
    );

    if (!emailResult.success) {
      console.error('Failed to send verification email:', emailResult.error);
    }

    // Store email in cookies for verification flow
    const cookieStore = cookies();
    await cookieStore.set({
      name: 'pending-verification-email',
      value: data.email,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 30, // 30 minutes
      sameSite: 'strict'
    });

    return {
      success: true,
      message: 'Please check your email for the verification code.',
      email: data.email
    };
  } catch (error: any) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: error.message || 'An error occurred during registration.'
    };
  }
}

export async function signInUser(userData: any) {
  try {
    // Validate input data
    const validatedData = SignInSchema.safeParse(userData);
    console.log('userData', validatedData);
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

    console.log('user', user);
    // Check if user is verified
    // if (!user.isVerified) {
    //   // Generate new OTP for verification
    //   const otp = generateOTP();
    //   const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

    //   // Update user with new verification code
    //   await prisma.user.update({
    //     where: { id: user.id },
    //     data: {
    //       verificationCode: otp,
    //       verificationExpiry: otpExpiry
    //     }
    //   });

    //   // Send verification email
    //   await sendVerificationEmail(email, otp, user.username);

    //   // Store email in cookies for verification flow - use await with cookies()
    //   const cookieStore = cookies();
    //   await cookieStore.set({
    //     name: 'pending-verification-email',
    //     value: email,
    //     httpOnly: true,
    //     path: '/',
    //     maxAge: 60 * 30, // 30 minutes
    //     sameSite: 'strict'
    //   });

    //   return {
    //     success: false,
    //     error:
    //       'Email not verified. Please check your email for a verification code.',
    //     needsVerification: true,
    //     email: email
    //   };
    // }

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

    // Create JWT token with proper object payload
    const token = await new SignJWT({
      id: user.id.toString(),
      email: user.email,
      username: user.username,
      isCreator: user.isCreator ? true : false // Ensure boolean value
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(`${tokenExpiration}s`)
      .sign(getJwtSecretKey());

    // Set cookie - use await with cookies()
    const cookieStore = cookies();
    await cookieStore.set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: tokenExpiration,
      sameSite: 'strict'
    });

    return {
      success: true,
      user: {
        id: user.id.toString(),
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        isCreator: user.isCreator
      }
    };
  } catch (error) {
    console.error('Sign-in error:', error);
    return {
      success: false,
      error: 'An error occurred during sign-in'
    };
  }
}

export async function verifyOTP(data) {
  try {
    // Validate input data
    const validatedData = VerifyOTPSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        success: false,
        error: 'Invalid verification data'
      };
    }

    const { email, otp } = validatedData.data;

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return {
        success: false,
        error: 'User not found'
      };
    }

    // Check if OTP is correct and not expired
    if (user.verificationCode !== otp) {
      return {
        success: false,
        error: 'Invalid verification code'
      };
    }

    if (user.verificationExpiry && user.verificationExpiry < new Date()) {
      return {
        success: false,
        error: 'Verification code has expired'
      };
    }

    // Mark user as verified
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationCode: null,
        verificationExpiry: null
      }
    });

    // Clear the pending verification email cookie - use await with cookies()
    const cookieStore = cookies();
    await cookieStore.delete('pending-verification-email');

    return {
      success: true,
      message: 'Email verified successfully'
    };
  } catch (error) {
    console.error('Verification error:', error);
    return {
      success: false,
      error: 'An error occurred during verification'
    };
  }
}

export async function resendOTP(data) {
  try {
    // Validate input data
    const validatedData = ResendOTPSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        success: false,
        error: 'Invalid email'
      };
    }

    const { email } = validatedData.data;

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return {
        success: false,
        error: 'User not found'
      };
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

    // Update user with new OTP
    await prisma.user.update({
      where: { id: user.id },
      data: {
        verificationCode: otp,
        verificationExpiry: otpExpiry
      }
    });

    // Send verification email
    const emailResult = await sendVerificationEmail(email, otp, user.username);

    if (!emailResult.success) {
      return {
        success: false,
        error: emailResult.error || 'Failed to send verification email'
      };
    }

    return {
      success: true,
      message: 'Verification code has been resent'
    };
  } catch (error) {
    console.error('Resend OTP error:', error);
    return {
      success: false,
      error: 'An error occurred while resending the verification code'
    };
  }
}

export async function signOutUser() {
  try {
    // Get the cookies instance and await operations
    const cookieStore = cookies();

    // Check if the auth-token cookie exists before attempting to delete it
    const authToken = cookieStore.get('auth-token');
    console.log(
      'Auth token before deletion:',
      authToken ? 'exists' : 'not found'
    );

    // Delete the auth-token cookie with complete options to ensure it's properly removed
    await cookieStore.delete({
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
