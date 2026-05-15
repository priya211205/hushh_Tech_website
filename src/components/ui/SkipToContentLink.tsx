import React from "react";

// Standardized Hushh blue or high-contrast black for a11y
const MAIN_CONTENT_SELECTOR = 'main, #main-content, [role="main"]';

export function SkipToContentLink() {
  const handleSkipToContent = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const mainContent = document.querySelector<HTMLElement>(MAIN_CONTENT_SELECTOR);

    if (!mainContent) {
      console.warn("SkipToContentLink: Target 'main' content not found.");
      return;
    }

    event.preventDefault();

    // Set tabindex only if not already focusable
    const isAlreadyFocusable = mainContent.getAttribute("tabindex") !== null;

    if (!isAlreadyFocusable) {
      mainContent.setAttribute("tabindex", "-1");
      // Use a named function to ensure we can clean it up if needed, 
      // though 'once: true' is generally safe here.
      mainContent.addEventListener(
        "blur",
        () => mainContent.removeAttribute("tabindex"),
        { once: true }
      );
    }

    // Modern focus behavior
    mainContent.focus({ preventScroll: true });

    // Ensure the scroll accounts for our fixed header/ticker height
    // We use a slight offset to ensure the title isn't tucked under the header
    window.scrollTo({
      top: mainContent.offsetTop - 120, // Adjust based on Navbar + Ticker height
      behavior: "smooth"
    });
  };

  return (
    <a
      href="#main-content"
      onClick={handleSkipToContent}
      className={
        "sr-only focus:not-sr-only " +
        "focus:fixed focus:left-4 focus:top-4 focus:z-[1100] " +
        "focus:rounded-full focus:bg-black focus:px-6 focus:py-3 " +
        "focus:text-sm focus:font-bold focus:text-white " +
        "focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 " +
        "transition-all duration-200"
      }
    >
      Skip to content
    </a>
  );
}