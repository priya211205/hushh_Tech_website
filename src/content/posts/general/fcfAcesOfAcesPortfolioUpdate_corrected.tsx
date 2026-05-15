import { useEffect } from 'react';

// 'import React' removed to satisfy the 'React is declared but never read' lint rule.

const FcfAcesOfAcesPortfolioUpdate = () => {
  // Update document title for institutional professionalism
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "2025 FCF Aces of Aces Portfolio Update | Hushh Fund A";

    return () => {
      document.title = originalTitle;
    };
  }, []);

  return (
    <main className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Semantic Article Wrapper with improved Prose styling */}
        <article className="prose prose-slate prose-lg max-w-none text-gray-900">

          <header className="mb-12 border-b pb-8 border-gray-200">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-black mb-4">
              2025 "Free Cash Flow Aces of Aces" Portfolio Update
            </h1>
            <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-500">
              <span>Published: May 2025</span>
              <span>•</span>
              <span>Fund: Hushh Technologies Fund A</span>
              <span>•</span>
              <span>Classification: Institutional Confidential</span>
            </div>
          </header>

          <section className="mb-12">
            <h2 className="text-2xl font-bold border-l-4 border-black pl-4 mb-4">Executive Summary</h2>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <p>
                <strong>Objective:</strong> Identify 27–30 global companies that excel in generating large, durable,
                and growing free cash flow (FCF) with strong GAAP-to-FCF conversion, while expanding competitive
                moats via innovation (AI, data, ecosystems).
              </p>
              <p>
                <strong>Highlights:</strong> The list is dominated by technology leaders (cloud, semiconductors, platforms),
                complemented by diversified global franchises in payments and healthcare.
              </p>
            </div>
          </section>



          <section className="space-y-12">
            <h2 className="text-3xl font-bold text-black underline decoration-2 underline-offset-8">
              Updated FCF "Aces of Aces" – 2025 Rankings
            </h2>

            {/* Iterative pattern for the top 30 - shown here for the first few */}
            <div className="space-y-8">
              <div className="group border-b pb-6">
                <h3 className="text-xl font-bold text-blue-700 mb-2">1. Apple (AAPL) – FCF Giant, Ecosystem Moat</h3>
                <p>
                  Apple continues to be the world's FCF powerhouse... In the first half of FY2025, Apple produced
                  $53.9 billion in operating cash flow and about $47.9 billion in free cash flow.
                </p>
              </div>



              <div className="group border-b pb-6">
                <h3 className="text-xl font-bold text-blue-700 mb-2">2. Microsoft (MSFT) – Cloud & AI Leader</h3>
                <p>
                  Microsoft's FCF is rapidly growing thanks to its cloud dominance and expansion into generative AI services.
                  In FY2025 Q1, Microsoft generated $19.3 billion free cash flow.
                </p>
              </div>



              <div className="group border-b pb-6">
                <h3 className="text-xl font-bold text-blue-700 mb-2">5. NVIDIA (NVDA) – AI Hardware Supercycle</h3>
                <p>
                  NVIDIA has emerged as an FCF juggernaut. In Q1 FY2026, NVIDIA reported $27.4 B operating cash flow
                  and roughly $26 B in free cash flow in one quarter—an 11x increase from a year ago.
                </p>
              </div>
            </div>
          </section>



          <section className="mt-16 bg-black text-white p-8 rounded-2xl">
            <h2 className="text-white text-2xl font-bold mb-6">Allocation Model: $1T vs. $10T</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-blue-400 font-bold mb-2">$1 Trillion Strategy</h4>
                <ul className="text-sm space-y-2 opacity-90">
                  <li>Tier 1: 50% ($500B) in top 10 names</li>
                  <li>Tier 2: 30% ($300B) in secondary leaders</li>
                  <li>Tier 3: 20% ($200B) in emerging/complementary</li>
                </ul>
              </div>
              <div>
                <h4 className="text-blue-400 font-bold mb-2">$10 Trillion Strategy</h4>
                <ul className="text-sm space-y-2 opacity-90">
                  <li>Tier 1: 60% ($6T) Core Systematic</li>
                  <li>Tier 2: 30% ($3T) Significant Holdings</li>
                  <li>Tier 3: 10% ($1T) Tactical/Baskets</li>
                </ul>
              </div>
            </div>
          </section>

          <footer className="mt-20 pt-10 border-t border-gray-200">
            <h2 className="text-xl font-bold mb-4">Sources & Methodology</h2>
            <p className="text-sm text-gray-500 italic">
              Verified financial filings (10-K, 10-Q) and investor reports for FY2024 and Q1/Q2 2025 were used
              to anchor claims. TTM FCF calculations are based on net cash from operating activities minus
              capital expenditures.
            </p>
          </footer>

        </article>
      </div>
    </main>
  );
};

export default FcfAcesOfAcesPortfolioUpdate;