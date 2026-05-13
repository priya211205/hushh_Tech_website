import React from 'react';

interface HushhIDHeroProps {
  userName?: string;
  onCreateClick: () => void;
}

/**
 * Mobile-first investor profile hero
 * Improvements: Added semantic list tags, fixed contrast, optimized alignment.
 */
export const HushhIDHero: React.FC<HushhIDHeroProps> = ({
  userName = 'there',
  onCreateClick,
}) => {
  const benefits = [
    'Create your investor profile once.',
    'Save to wallet. Share anywhere.',
    'No more repetitive forms.',
  ];

  return (
    <section className="bg-white font-sans antialiased">
      <div className="mx-auto max-w-[520px] px-6 pt-14 pb-12 sm:px-8">

        {/* Header block */}
        <header className="text-left">
          <span
            className="block text-[12px] font-bold tracking-[0.2em] uppercase text-slate-500 mb-4"
          >
            Investor Profile
          </span>
          <h1 className="text-[36px] font-medium leading-[1.1] text-slate-900 mb-5 tracking-tight">
            Hello {userName},
          </h1>
          <p className="text-[18px] leading-relaxed text-slate-600 max-w-[90%] mb-8">
            Create your verified investor identity once and carry it everywhere—secure, shareable, and ready when you are.
          </p>

          {/* Accent Line */}
          <div className="relative h-px w-full bg-slate-200">
            <div
              className="absolute left-0 top-0 h-0.5 w-6 -translate-y-1/2 bg-[#00A9E0]"
              aria-hidden="true"
            />
          </div>
        </header>

        {/* Benefit panel - Switched to semantic ul/li */}
        <ul className="mt-8 rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden list-none p-0">
          {benefits.map((benefit) => (
            <li
              key={benefit}
              className="flex items-start gap-4 px-5 py-5 transition-colors active:bg-slate-50"
            >
              <span
                className="w-2 h-2 rounded-full bg-[#00A9E0] mt-2.5 flex-shrink-0"
                aria-hidden="true"
              />
              <p className="text-[17px] font-semibold leading-snug text-slate-900">
                {benefit}
              </p>
            </li>
          ))}
        </ul>

        {/* CTA area */}
        <footer className="mt-8 space-y-4">
          <button
            onClick={onCreateClick}
            className="group relative w-full h-[58px] overflow-hidden rounded-2xl text-white text-[17px] font-bold transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#00A9E0] focus:ring-offset-2"
            style={{
              background: 'linear-gradient(135deg, #00A9E0 0%, #47C8FF 100%)',
            }}
          >
            <span className="relative z-10">Create Your Hushh ID →</span>
            {/* Subtle gloss effect on hover */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <div className="flex items-center gap-2 px-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-400">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <p className="text-[13px] font-medium text-slate-500">
              Takes under a minute. Your details stay private.
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default HushhIDHero;