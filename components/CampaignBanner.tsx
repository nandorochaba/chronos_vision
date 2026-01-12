
import React from 'react';
import { CollectionType, Campaign } from '../types';

interface CampaignBannerProps {
  collection: CollectionType;
  campaigns: Campaign[];
  theme: any;
}

const CampaignBanner: React.FC<CampaignBannerProps> = ({ collection, campaigns, theme }) => {
  const campaign = campaigns.find(c => c.collection === collection) || campaigns[0];

  if (!campaign) {
    return null;
  }

  return (
    <div className="mb-20 space-y-12 animate-[fade-in_1s_ease-out]">
      <div className={`w-full py-3 border-y ${theme.border} overflow-hidden whitespace-nowrap`}>
        <div className="inline-block animate-marquee">
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className={`mx-10 text-[10px] uppercase tracking-[0.4em] font-bold ${theme.accent}`}>
              • {campaign.badge} • {campaign.region} • Consultoria VIP via WhatsApp • Curadoria Regional • 
            </span>
          ))}
        </div>
      </div>

      <div className={`relative p-8 md:p-16 ${theme.sectionBg} border ${theme.border} flex flex-col md:flex-row items-center justify-between gap-12 group overflow-hidden`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-current opacity-[0.02] rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
        
        <div className="flex-1 space-y-6 z-10">
          <div className="flex items-center space-x-4">
            <span className={`w-12 h-px ${theme.accentBg}`}></span>
            <span className={`text-[10px] uppercase tracking-[0.3em] font-bold ${theme.accent}`}>{campaign.badge}</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-serif leading-tight">
            {campaign.title}
          </h3>
          <p className={`${theme.muted} max-w-lg text-sm md:text-base leading-relaxed`}>
            {campaign.description}
          </p>
          <div className="pt-4">
            <span className={`text-[10px] uppercase tracking-[0.2em] font-bold border-b-2 pb-2 ${theme.accentBorder} cursor-default`}>
              {campaign.region}
            </span>
          </div>
        </div>

        <div className="relative w-full md:w-1/3 aspect-square overflow-hidden rounded-sm">
            <img 
              src={campaign.imageUrl} 
              alt="Campaign Highlight"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CampaignBanner;
