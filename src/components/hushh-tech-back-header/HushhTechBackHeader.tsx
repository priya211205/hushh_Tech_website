import * as React from "react";
import HushhTechNavDrawer from "../hushh-tech-nav-drawer/HushhTechNavDrawer";
import HushhTechFaqSheet from "../hushh-tech-faq-sheet/HushhTechFaqSheet";

export interface HushhTechBackHeaderProps {
  onBackClick?: () => void;
  rightType?: "label" | "hamburger";
  rightLabel?: string;
  onRightClick?: () => void;
  showRightButton?: boolean;
  className?: string;
}

const HushhTechBackHeader: React.FC<HushhTechBackHeaderProps> = ({
  onBackClick = () => { },
  rightType = "label",
  rightLabel = "FAQs",
  onRightClick,
  showRightButton = true,
  className = "",
}: HushhTechBackHeaderProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [isFaqOpen, setIsFaqOpen] = React.useState<boolean>(false);

  const handleRightAction = (): void => {
    if (onRightClick) {
      onRightClick();
    } else if (rightLabel?.toLowerCase() === "faqs") {
      setIsFaqOpen(true);
    }
  };

  return (
    <React.Fragment>
      <header
        className={`px-6 py-6 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-md z-40 max-w-5xl mx-auto w-full ${className}`}
      >
        {/* Back button */}
        <button
          type="button"
          onClick={onBackClick}
          className="w-10 h-10 border border-black flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <span className="material-symbols-outlined text-gray-900 text-[20px] font-light">
            west
          </span>
        </button>

        {/* Right action button */}
        {showRightButton && (
          <div className="flex items-center">
            {rightType === "hamburger" ? (
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <span className="material-symbols-outlined text-white !text-[1.2rem]">
                  menu
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRightAction}
                className="h-10 px-5 border border-black text-[11px] font-bold tracking-widest uppercase text-gray-900 hover:bg-black hover:text-white transition-colors flex items-center justify-center"
              >
                {rightLabel}
              </button>
            )}
          </div>
        )}
      </header>

      {/* Conditional Overlays */}
      {rightType === "hamburger" && (
        <HushhTechNavDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      )}

      <HushhTechFaqSheet
        isOpen={isFaqOpen}
        onClose={() => setIsFaqOpen(false)}
      />
    </React.Fragment>
  );
};

export default HushhTechBackHeader;