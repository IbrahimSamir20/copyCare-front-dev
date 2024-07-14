// src/components/FeaturesSection.tsx

import React from 'react';
import { Card } from 'antd';

const features = [
  { title: 'User Management', description: 'Manage all your users efficiently.' },
  { title: 'Employee Management', description: 'Handle employee information and tasks.' },
  { title: 'Customer and Vendor Management', description: 'Keep track of customers and vendors.' },
  { title: 'Multi-Language Support', description: 'Supports multiple languages for better reach.' },
  { title: 'Integration', description: 'Seamlessly integrate with printers, copy machines, and scanners.' },
];

const FeaturesSection: React.FC = () => {
  return (
    <div className="features-section bg-gray-100 py-20">
      <div className="container mx-auto px-6">
        <h2 className="mb-12 text-center text-4xl font-bold">Features</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} title={feature.title} className="feature-card">
              <p>{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
