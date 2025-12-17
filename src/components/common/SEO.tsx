import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "Bruno Servulo | Dynamics 365 Technical Specialist",
  description = "Microsoft-certified Technical Specialist with 15 years of experience architecting enterprise-scale Dynamics 365 Customer Engagement, Power Platform, and Azure integration solutions.",
  canonical = "https://bmsrk.github.io/",
  ogImage = "https://bmsrk.github.io/profile.jpg",
  ogUrl = "https://bmsrk.github.io/",
  ogType = "profile",
  twitterCard = "summary_large_image"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content={ogType} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;
