// src/components/OverviewSection.tsx

import React from 'react';

const OverviewSection: React.FC = () => {
  return (
    <div className="overview-section bg-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="mb-4 text-4xl font-bold">About CopyCare</h2>
        <p className="mb-6 text-lg">
          CopyCare is designed to streamline the management of users, employees, customers, and vendors in your
          organization. Our comprehensive ERP system integrates seamlessly with printers, copy machines, and scanners to
          ensure smooth operations.
        </p>
      </div>
    </div>
  );
};

export default OverviewSection;
