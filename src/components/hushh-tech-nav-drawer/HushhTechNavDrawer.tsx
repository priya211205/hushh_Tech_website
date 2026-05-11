import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import hushhLogo from "../images/Hushhogo.png";
import { useAuthSession } from "../../auth/AuthSessionProvider";
import { useModalKeyboardNavigation } from "../../hooks/useModalKeyboardNavigation";
import { moveFocusWithin } from "../../utils/keyboardNavigation";

// --- Types & Constants ---
interface NavItem {
  icon: string;
  label: string;
  path: string;
  highlight?: boolean;
  subtitle?: string;
}

const NAV_ITEMS: NavItem[] = [
  { icon: "home", label: "Home", path: "/" },
  { icon: "menu_book", label: "Our Philosophy", path: "/philosophy" },
  { icon: "pie_chart", label: "Fund A", path: "/discover-fund-a" },
  { icon: "groups", label: "Community", path: "/community" },
  { icon: "verified_user", label: "KYC Studio Alpha", path: "/kyc" },
];

// Custom Button Component for cleaner code
const NavButton: React.FC<{
  item: NavItem;
  isActive: boolean;
  onClick: (path: string) => void;
}> = ({ item, isActive, onClick }) => (
  <button
    onClick={() => onClick(item.path)}
    aria-current={isActive ? "page" : undefined}
    className={`group flex items-center gap-3 py-3 px-3 border transition-all rounded-xl w-full text-left ${isActive
      ? "border-hushh-blue bg-hushh-blue/5 text-hushh-blue"
      : "border-gray-100 hover:border-hushh-blue/20 bg-white hover:bg-hushh-blue/5"
      }`}
  >
    <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all shrink-0 ${isActive ? "bg-hushh-blue/10 border-hushh-blue/20" : "bg-gray-50 group-hover:bg-hushh-blue/10 border-transparent group-hover:border-hushh-blue/20 border"
      }`}>
      <span className={`material-symbols-outlined !text-[1rem] ${isActive ? "text-hushh-blue" : "text-gray-400 group-hover:text-hushh-blue"
        }`}>
        {item.icon}
      </span>
    </div>
    <span className={`text-[0.9rem] font-medium tracking-wide transition-colors leading-tight ${isActive ? "text-hushh-blue" : "text-gray-900 group-hover:text-hushh-blue"
      }`}>
      {item.label}
    </span>
  </button>
);

const AuthenticatedFooter: React.FC<{
  onNavigate: (path: string) => void;
  onLogout: () => Promise<void>;
}> = ({ onNavigate, onLogout }) => (
  <div className="space-y-4">
    <button
      onClick={() => onNavigate("/hushh-user-profile")}
      className="flex items-center gap-5 group w-full text-left"
    >
      <div className="w-8 h-8 rounded-full bg-hushh-blue text-white flex items-center justify-center">
        <span className="material-symbols-outlined !text-[1.1rem]">person</span>
      </div>
      <span className="text-[0.95rem] font-medium text-gray-900 tracking-wide group-hover:text-hushh-blue transition-colors">
        View Profile
      </span>
    </button>
    <div className="flex flex-col gap-4 pl-[3.25rem]">
      <button
        onClick={() => void onLogout().then(() => onNavigate("/login"))}
        className="text-left text-[0.85rem] font-medium text-gray-500 hover:text-red-500 transition-colors tracking-wide"
      >
        Log Out
      </button>
      <button
        onClick={() => onNavigate("/delete-account")}
        className="text-left text-[0.85rem] font-medium text-gray-400 hover:text-red-500 transition-colors tracking-wide"
      >
        Delete Account
      </button>
    </div>
  </div>
);

const HushhTechNavDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { status, signOut } = useAuthSession();
  const isAuthenticated = status === "authenticated";
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useModalKeyboardNavigation({ isOpen, containerRef: drawerRef, initialFocusRef: closeButtonRef, onClose });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleNavigate = (path: string) => {
    onClose();
    setTimeout(() => navigate(path), 100); // Slight delay for smooth transition
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/45 backdrop-blur-[2px] pt-20 px-3 pb-3 flex items-start justify-end"
      onClick={onClose}
    >
      <div
        ref={drawerRef}
        className="w-full max-w-3xl max-h-[calc(100vh-6rem)] overflow-hidden rounded-2xl border border-white/70 bg-white shadow-2xl flex flex-col animate-scaleIn"
        role="dialog"
        onKeyDown={(e) => moveFocusWithin(drawerRef.current, e)}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-6 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4">
            <img src={hushhLogo} alt="Hushh" className="w-6 h-6 object-contain" />
            <span className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-gray-900">
              hushh technologies
            </span>
          </div>
          <button ref={closeButtonRef} onClick={onClose} aria-label="Close menu" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <span className="material-symbols-outlined text-gray-500">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-8">
          <div className="grid grid-cols-2 gap-3">
            {NAV_ITEMS.map((item) => (
              <NavButton
                key={item.path}
                item={item}
                isActive={pathname === item.path}
                onClick={handleNavigate}
              />
            ))}
          </div>

          {/* Highlight Section */}
          <button
            onClick={() => handleNavigate("/unlock-coins")}
            className="w-full mt-4 group p-4 rounded-xl bg-gradient-to-r from-hushh-blue/10 to-transparent border border-hushh-blue/20 flex items-center gap-4 hover:bg-hushh-blue/15 transition-all"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-hushh-blue">lock</span>
            </div>
            <div className="text-left">
              <p className="text-[0.95rem] font-semibold text-gray-900">Unlock 300K Coins</p>
              <p className="text-[0.7rem] text-gray-500">$1 or use coupon code</p>
            </div>
          </button>

          {/* Footer Items & Auth */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            {isAuthenticated ? (
              <AuthenticatedFooter onNavigate={handleNavigate} onLogout={signOut} />
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <NavButton item={{ icon: 'login', label: 'Log In', path: '/login' }} isActive={false} onClick={handleNavigate} />
                <NavButton item={{ icon: 'person_add', label: 'Sign Up', path: '/signup' }} isActive={false} onClick={handleNavigate} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HushhTechNavDrawer;