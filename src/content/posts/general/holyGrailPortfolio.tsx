import { useEffect } from 'react';
import GammaEmbed from "../components/GammaEmbed";

/**
 * HolyGrailPortfolio Page
 * Note: Removed 'import React' to satisfy modern JSX transform linting rules.
 */
const HolyGrailPortfolio = () => {
  // Sync document title with the page content for professional UX
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "The Holy Grail Portfolio | Hushh Fund A";

    // Reset title when the user navigates away
    return () => {
      document.title = originalTitle;
    };
  }, []);

  return (
    <main className="w-full min-h-screen bg-white">
      <GammaEmbed
        title="The Holy Grail Portfolio | Hushh Fund A"
        description="A Complete Implementation Playbook for the World's Most Sophisticated Capital Allocators."
        src="https://gamma.app/embed/1qt8u41wzozuwnh"
      />
    </main>
  );
};

export default HolyGrailPortfolio;