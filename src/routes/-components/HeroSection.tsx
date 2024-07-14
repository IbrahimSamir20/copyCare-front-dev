// src/components/HeroSection.tsx

import React from 'react';
import { Button } from 'antd';
import { Link } from '@tanstack/react-router';

const HeroSection: React.FC = () => {
  return (
    <div className="hero-section bg-blue-600 py-20 text-white">
      <div className="container mx-auto px-6 text-center">
        <h1 className="mb-4 text-5xl font-bold">Welcome to CopyCare</h1>
        <p className="mb-8 text-xl">Your ultimate solution for managing users, employees, customers, and vendors.</p>
        <Link to={'/login'}>
          <Button type="primary" size="large" className="mx-2">
            Get Started
          </Button>
        </Link>
        <Link to={'/learn-more'}>
          <Button size="large" className="mx-2">
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
