import { useEffect } from 'react';
import GammaEmbed from "../components/GammaEmbed";

// We remove 'React' from the import to satisfy the linting rule
// " 'React' is declared but its value is never read. "

const AIDrivenPersonalAgents = () => {
  // Update document title for SEO and user UX
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "AI-Driven Personal Agents | Hushh Fund A";

    // Cleanup to restore original title on unmount
    return () => {
      document.title = originalTitle;
    };
  }, []);

  return (
    <main className="w-full min-h-screen bg-white">
      <GammaEmbed
        title="AI-Driven Personal Agents | Hushh Fund A"
        description="Improving Financial Habits Through Everyday Wellness"
        src="https://gamma.app/embed/vhhj7mq2pqdc6kk"
      />
    </main>
  );
};

export default AIDrivenPersonalAgents;