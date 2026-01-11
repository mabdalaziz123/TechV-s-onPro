
import React from 'react';

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface PortfolioItemProps {
  title: string;
  category: string;
  imageUrl: string;
}

export interface Recommendation {
  title: string;
  content: string;
  icon: string;
}