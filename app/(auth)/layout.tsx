// app/auth/layout.tsx
import React from 'react';
import './auth.css'; // Import your CSS for auth styles

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="auth-layout">
      <div className="form-container">{children}</div>
      <div className="sidebar hidden md:block ">
        {' '}
        <img
          src="images/logins.png"
          alt="Boiler Plate"
          className="sidebar-image"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
