import { useEffect } from 'react';
import GammaEmbed from "../components/GammaEmbed";

/**
 * AlphaAgentsPortfolio Page
 * Note: 'import React' removed to satisfy the 'React is declared but never read' lint rule.
 */
const AlphaAgentsPortfolio = () => {
  // Sync document title with the page content for SEO and professional UX
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "AlphaAgents Portfolio Construction | Hushh Fund A";

    // Cleanup on unmount to prevent title bleeding into other pages
    return () => {
      document.title = originalTitle;
    };
  }, []);

  return (
    <main className="w-full min-h-screen bg-white">
      <GammaEmbed
        title="AlphaAgents: Revolutionizing Portfolio Construction | Hushh Fund A"
        description="A groundbreaking multi-agent system combining quantitative analysis with LLM adaptability to identify elite investment opportunities."
        src="https://gamma.app/embed/l1bry9px3iy4xwd"
      />
    </main>
  );
};

export default AlphaAgentsPortfolio;