'use server';

// app/actions/support.ts
import { prisma } from '@/lib/db/prisma';

// Types for success/error responses
interface SupportResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Process support payment and create follower relationship
 */
export async function processSupport({
  name,
  email,
  message,
  amount,
  isRecurring,
  creatorId
}: {
  name: string;
  email: string;
  message: string;
  amount: number;
  isRecurring: boolean;
  creatorId: string;
}): Promise<SupportResponse> {
  try {
    if (!email || !creatorId) {
      return {
        success: false,
        error: 'Missing required information'
      };
    }

    // Convert creatorId to BigInt
    const creatorBigInt = BigInt(creatorId);

    // Check if user with this email already exists
    let supporter = await prisma.user.findUnique({
      where: { email }
    });

    // If user doesn't exist, create a new one
    if (!supporter) {
      // Generate a username from the email (everything before @)
      const username = email.split('@')[0];

      supporter = await prisma.user.create({
        data: {
          email,
          username,
          displayName: name || username,
          passwordHash: 'temp_' + Math.random().toString(36).substring(2, 15), // temporary password hash
          isVerified: false // will need verification
        }
      });
    }

    // Create a payment record
    const payment = await prisma.payment.create({
      data: {
        supporterId: supporter.id,
        creatorId: creatorBigInt,
        amount: amount.toString(), // Convert to string for Decimal type
        message: message || '',
        isRecurring,
        status: 'success' // In a real app, this would depend on payment success
      }
    });

    // Check if already following
    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId: supporter.id,
        creatorId: creatorBigInt
      }
    });

    // If not already following, create the follow relationship
    if (!existingFollow) {
      await prisma.follow.create({
        data: {
          followerId: supporter.id,
          creatorId: creatorBigInt
        }
      });
    }

    // Handle recurring payments by creating a membership if needed
    if (isRecurring) {
      // Find a suitable subscription plan or create one
      let plan = await prisma.subscriptionPlan.findFirst({
        where: {
          creatorId: creatorBigInt,
          price: amount.toString()
        }
      });

      if (!plan) {
        // Create a basic plan if none exists at this price point
        plan = await prisma.subscriptionPlan.create({
          data: {
            creatorId: creatorBigInt,
            name: 'Monthly Supporter',
            price: amount.toString(),
            isActive: true
          }
        });
      }

      // Create membership
      await prisma.membership.create({
        data: {
          supporterId: supporter.id,
          planId: plan.id
        }
      });
    }

    // Just return success with no UI-specific message
    return {
      success: true,
      message: 'Support processed successfully'
    };
  } catch (error) {
    console.error('Error processing support:', error);
    return {
      success: false,
      error: 'Failed to process support. Please try again later.'
    };
  }
}
