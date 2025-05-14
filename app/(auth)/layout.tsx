import type React from 'react';
import './auth.css';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="auth-layout">
      <div className="form-container">{children}</div>
      <div className="sidebar hidden md:block">
        {/* Decorative circles */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[10%] left-[20%] w-32 h-32 rounded-full border-4 border-white/30"></div>
          <div className="absolute top-[30%] right-[15%] w-40 h-40 rounded-full border-4 border-white/20"></div>
          <div className="absolute bottom-[20%] left-[30%] w-24 h-24 rounded-full border-4 border-white/30"></div>
        </div>

        {/* Bottom text */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h2 className="text-3xl font-bold">Connect & Share</h2>
          <p className="text-xl opacity-90">
            Join our community of drink enthusiasts
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
