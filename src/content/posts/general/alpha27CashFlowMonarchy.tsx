import { useEffect } from 'react';
import GammaEmbed from "../components/GammaEmbed";

// We remove the 'React' import to satisfy the "never read" linting rule.
// The modern JSX transform handles this automatically.

const Alpha27CashFlowMonarchy = () => {
  // Update the browser tab title for institutional professionalism
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Alpha 27: Cash Flow Monarchy | Hushh Fund A";

    // Reset title when the user leaves the page
    return () => {
      document.title = originalTitle;
    };
  }, []);

  return (
    <main className="w-full min-h-screen bg-white">
      <GammaEmbed
        title="Alpha 27: The Absolute Cash Flow Monarchy | Hushh Fund A"
        description="For institutional allocators managing billions, Alpha 27 offers a strategy defined by free cash flow perpetuity and formulaic defense."
        src="https://gamma.app/embed/iyub9kg8ozkapp3"
      />
    </main>
  );
};

export default Alpha27CashFlowMonarchy;