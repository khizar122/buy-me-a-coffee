'use client';

import { FormError } from '@/components/form-error';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useEffect } from 'react';
import { useSignIn } from './hooks/useSignIn';

// SVG Drink Glass Component with Animated Text
const BlueDrinkGlass = () => {
  return (
    <div className="drink-container">
      <svg
        width="150"
        height="150"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="blue-drink-glass"
      >
        {/* Glass Base */}
        <rect
          x="40"
          y="83"
          width="20"
          height="5"
          rx="2"
          fill="#2980B9"
          className="glass-base"
        />

        {/* Glass Stem */}
        <rect
          x="47"
          y="70"
          width="6"
          height="13"
          rx="1"
          fill="#3498DB"
          className="glass-stem"
        />

        {/* Glass Bowl */}
        <path
          d="M30 35C30 35 25 70 50 70C75 70 70 35 70 35H30Z"
          fill="#3498DB"
          fillOpacity="0.7"
          className="glass-bowl"
        />

        {/* Glass Rim */}
        <path
          d="M30 35H70"
          stroke="#2980B9"
          strokeWidth="2"
          className="glass-rim"
        />

        {/* Drink Surface */}
        <path
          d="M32 40C32 40 35 42 50 42C65 42 68 40 68 40"
          fill="none"
          stroke="#87CEEB"
          strokeWidth="1"
          className="drink-surface"
        />

        {/* Drink Content */}
        <path
          d="M33 40C33 40 35 65 50 65C65 65 67 40 67 40"
          fill="#00BFFF"
          fillOpacity="0.6"
          className="drink-liquid"
        />

        {/* Bubbles */}
        <circle
          cx="40"
          cy="55"
          r="2"
          fill="white"
          fillOpacity="0.7"
          className="bubble bubble-1"
        />
        <circle
          cx="45"
          cy="50"
          r="1.5"
          fill="white"
          fillOpacity="0.7"
          className="bubble bubble-2"
        />
        <circle
          cx="55"
          cy="52"
          r="1.8"
          fill="white"
          fillOpacity="0.7"
          className="bubble bubble-3"
        />
        <circle
          cx="60"
          cy="58"
          r="1.3"
          fill="white"
          fillOpacity="0.7"
          className="bubble bubble-4"
        />

        {/* Straw */}
        <path
          d="M60 25C60 25 62 40 60 55"
          stroke="#FF4500"
          strokeWidth="2"
          fill="none"
          className="straw"
        />

        {/* Ice Cubes */}
        <rect
          x="38"
          y="45"
          width="6"
          height="6"
          rx="1"
          fill="white"
          fillOpacity="0.5"
          transform="rotate(15 38 45)"
          className="ice ice-1"
        />
        <rect
          x="52"
          y="48"
          width="5"
          height="5"
          rx="1"
          fill="white"
          fillOpacity="0.5"
          transform="rotate(-10 52 48)"
          className="ice ice-2"
        />

        {/* Cocktail Umbrella */}
        <path
          d="M38 30L50 24L62 30"
          stroke="#FF6B81"
          strokeWidth="1"
          fill="#FF6B81"
          className="umbrella"
        />
        <line
          x1="50"
          y1="24"
          x2="50"
          y2="40"
          stroke="#A52A2A"
          strokeWidth="1"
          className="umbrella-stick"
        />

        {/* Lemon Slice */}
        <circle
          cx="35"
          cy="37"
          r="5"
          fill="#FFFF00"
          fillOpacity="0.8"
          stroke="#FFD700"
          strokeWidth="1"
          className="lemon"
        />
        <circle
          cx="35"
          cy="37"
          r="3"
          fill="none"
          stroke="#FFD700"
          strokeWidth="0.5"
        />
      </svg>

      {/* Animated "Buy Me a Drink" text below the glass */}
      <div className="animated-text">
        <div className="text-wrapper">
          <span className="text-letter">B</span>
          <span className="text-letter">u</span>
          <span className="text-letter">y</span>
          <span className="text-letter">&nbsp;</span>
          <span className="text-letter">M</span>
          <span className="text-letter">e</span>
          <span className="text-letter">&nbsp;</span>
          <span className="text-letter">a</span>
          <span className="text-letter">&nbsp;</span>
          <span className="text-letter">D</span>
          <span className="text-letter">r</span>
          <span className="text-letter">i</span>
          <span className="text-letter">n</span>
          <span className="text-letter">k</span>
        </div>
      </div>
    </div>
  );
};

const SignInContainer = () => {
  const { form, error, successMessage, onSubmit, isPending, loading } =
    useSignIn();

  // Add animation styles
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      /* Container styling */
      .drink-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }
      
      /* Glass animations */
      @keyframes hover {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
      
      .blue-drink-glass {
        animation: hover 3s ease-in-out infinite;
      }
      
      /* Bubbles animations */
      @keyframes bubble-rise {
        0% { 
          transform: translateY(10px);
          opacity: 0.1;
        }
        50% { 
          opacity: 0.7;
        }
        100% { 
          transform: translateY(-15px);
          opacity: 0;
        }
      }
      
      .bubble {
        opacity: 0;
      }
      
      .bubble-1 {
        animation: bubble-rise 5s infinite ease-in-out;
        animation-delay: 0.2s;
      }
      
      .bubble-2 {
        animation: bubble-rise 4s infinite ease-in-out;
        animation-delay: 1.2s;
      }
      
      .bubble-3 {
        animation: bubble-rise 6s infinite ease-in-out;
        animation-delay: 0.5s;
      }
      
      .bubble-4 {
        animation: bubble-rise 4.5s infinite ease-in-out;
        animation-delay: 2s;
      }
      
      /* Drink surface animation */
      @keyframes ripple {
        0%, 100% { d: path('M32 40C32 40 35 42 50 42C65 42 68 40 68 40'); }
        50% { d: path('M32 40C32 40 38 41 50 43C62 41 68 40 68 40'); }
      }
      
      /* Ice cube animation */
      @keyframes ice-float {
        0%, 100% { transform: rotate(15deg) translateY(0); }
        50% { transform: rotate(20deg) translateY(-2px); }
      }
      
      .ice-1 {
        animation: ice-float 5s infinite ease-in-out;
        transform-origin: center;
      }
      
      .ice-2 {
        animation: ice-float 4s infinite ease-in-out reverse;
        transform-origin: center;
        animation-delay: 1s;
      }
      
      /* Straw animation */
      @keyframes straw-sway {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(2deg); }
      }
      
      .straw {
        animation: straw-sway 3s infinite ease-in-out;
        transform-origin: 60px 55px;
      }
      
      /* Umbrella animation */
      @keyframes umbrella-spin {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(5deg); }
      }
      
      .umbrella {
        animation: umbrella-spin 4s infinite ease-in-out;
        transform-origin: 50px 24px;
      }
      
      /* Lemon animation */
      @keyframes lemon-bob {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-1px) rotate(5deg); }
      }
      
      .lemon {
        animation: lemon-bob 3s infinite ease-in-out;
      }
      
      /* Liquid animation */
      @keyframes liquid-move {
        0%, 100% { d: path('M33 40C33 40 35 65 50 65C65 65 67 40 67 40'); }
        50% { d: path('M33 40C33 40 37 63 50 65C63 63 67 40 67 40'); }
      }
      
      /* Glass stem animation */
      @keyframes stem-pulse {
        0%, 100% { transform: scaleX(1); }
        50% { transform: scaleX(1.1); }
      }
      
      .glass-stem {
        animation: stem-pulse 4s infinite ease-in-out;
        transform-origin: center;
      }
      
      /* Animated text styles */
      .animated-text {
        margin-top: 12px;
        position: relative;
        overflow: hidden;
        height: 32px;
        width: 100%;
      }
      
      .text-wrapper {
        display: flex;
        justify-content: center;
        white-space: nowrap;
      }
      
      .text-letter {
        display: inline-block;
        color: #0a3d62; /* Darker blue color */
        font-weight: bold;
        font-size: 24px;
        opacity: 0;
        transform: translateY(20px);
        animation: text-animation 8s infinite;
      }
      
      @keyframes text-animation {
        0%, 100% { 
          opacity: 0;
          transform: translateY(20px);
        }
        5% { 
          opacity: 0;
          transform: translateY(20px);
        }
        15%, 85% { 
          opacity: 1;
          transform: translateY(0);
        }
        95% { 
          opacity: 0;
          transform: translateY(-20px);
        }
      }
      
      /* Stagger the letters animation */
      .text-letter:nth-child(1) { animation-delay: 0.1s; }
      .text-letter:nth-child(2) { animation-delay: 0.2s; }
      .text-letter:nth-child(3) { animation-delay: 0.3s; }
      .text-letter:nth-child(4) { animation-delay: 0.4s; }
      .text-letter:nth-child(5) { animation-delay: 0.5s; }
      .text-letter:nth-child(6) { animation-delay: 0.6s; }
      .text-letter:nth-child(7) { animation-delay: 0.7s; }
      .text-letter:nth-child(8) { animation-delay: 0.8s; }
      .text-letter:nth-child(9) { animation-delay: 0.9s; }
      .text-letter:nth-child(10) { animation-delay: 1.0s; }
      .text-letter:nth-child(11) { animation-delay: 1.1s; }
      .text-letter:nth-child(12) { animation-delay: 1.2s; }
      .text-letter:nth-child(13) { animation-delay: 1.3s; }
      .text-letter:nth-child(14) { animation-delay: 1.4s; }
      
      /* Custom styles for form labels and text */
      .form-label {
        font-size: 1.2rem !important;
        font-weight: 500 !important;
      }
      
      .form-input::placeholder {
        font-size: 1.1rem !important;
      }
      
      .form-input {
        font-size: 1.1rem !important;
      }
      
      .form-heading {
        font-size: 2rem !important;
      }
      
      .form-subheading {
        font-size: 1.2rem !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="max-w-[600px] mx-auto">
      {/* Animated Drink Glass Logo */}
      <div className="flex justify-center">
        <BlueDrinkGlass />
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-blue-900 form-heading">
          Sign In
        </h2>
        <p className="text-lg text-blue-800 mt-2 form-subheading">
          Enter your email and password to sign in
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-lg text-blue-900 font-medium form-label">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending || loading}
                    placeholder="Enter your email"
                    type="email"
                    className="form-input"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2 mt-5">
                <FormLabel className="text-lg text-blue-900 font-medium form-label">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending || loading}
                    placeholder="Enter your password"
                    type="password"
                    className="form-input"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isRemember"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isPending || loading}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm text-blue-800">
                    Remember me
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between pt-4 mt-4">
            <Link
              href="/forgot-password"
              className="text-base text-blue-800 hover:underline"
            >
              Forgot Password?
            </Link>
            <button
              type="submit"
              disabled={isPending || loading}
              className="px-4 py-2 rounded-lg text-lg focus:ring-1 focus:ring-blue-400 flex items-center"
              style={{
                backgroundColor: '#3B82F6', // Sky blue (Tailwind blue-500)
                color: '#ffffff'
              }}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
          {error && <FormError message={error} />}
          {successMessage && (
            <div className="text-green-600 font-medium text-center mt-4">
              {successMessage}
            </div>
          )}

          {/* Link to sign up */}
          <div className="text-center mt-6">
            <p className="text-base text-blue-800">
              Don't have an account?{' '}
              <Link
                href="/signup"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignInContainer;
