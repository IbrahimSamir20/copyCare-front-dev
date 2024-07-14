// src/components/DetailedFeaturesSection.tsx

import React from 'react';
import { Card } from 'antd';

const detailedFeatures = [
  {
    title: 'User Management',
    description: 'Efficiently manage all users with comprehensive tools and features.',
  },
  {
    title: 'Employee Management',
    description: 'Streamline employee management with integrated tools for tracking and reporting.',
  },
  {
    title: 'Customer and Vendor Management',
    description: 'Maintain detailed records and interactions with customers and vendors.',
  },
  {
    title: 'Multi-Language Support',
    description: 'Support for multiple languages to cater to a diverse user base.',
  },
  {
    title: 'Seamless Integration',
    description: 'Integrate with printers, copy machines, and scanners for smooth operations.',
  },
];

const DetailedFeaturesSection: React.FC = () => {
  return (
    <div className="detailed-features-section bg-gray-100 py-20">
      <div className="container mx-auto px-6">
        <h2 className="mb-12 text-center text-4xl font-bold">Detailed Features</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {detailedFeatures.map((feature, index) => (
            <Card key={index} title={feature.title} className="feature-card">
              <p>{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailedFeaturesSection;
