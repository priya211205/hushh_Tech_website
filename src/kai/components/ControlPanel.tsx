/**
 * ControlPanel Component — Revamped 3.0
 * Provides absolute type safety over sensory link states.
 * Fully compliant with internal Hushh organizational governance constraints.
 */
import React, { useMemo } from "react";
import { ConnectionState } from "../types";

interface ControlPanelProps {
  state: ConnectionState;
  statusText: string;
  onConnect: () => void;
  onDisconnect: () => void;
  volume: number; // Retained for strict interface signature compliance
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  state,
  statusText,
  onConnect,
  onDisconnect,
}) => {
  const isConnected = state === ConnectionState.CONNECTED;
  const isConnecting = state === ConnectionState.CONNECTING;

  /**
   * Determine structural layout fallback messages cleanly via useMemo 
   * to eliminate object reallocation cycles on active state mutations.
   */
  const displayText = useMemo(() => {
    if (statusText) return statusText;

    switch (state) {
      case ConnectionState.DISCONNECTED:
        return "System Standby";
      case ConnectionState.ERROR:
        return "Link Malfunction";
      default:
        return "";
    }
  }, [state, statusText]);

  return (
    <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center gap-3 md:gap-4 w-full max-w-md px-4 pointer-events-auto">
      {/* NOTE ON ANIMATIONS:
        To keep the rendering tree lightweight and avoid injecting raw string style markup blocks,
        the 'animate-hushh-observe' keyframes configuration must be specified within the main
        tailwind.config.js layout matrix.
      */}

      {/* Narrative Status Line — The "Hushh" Feedback Layout Boundary */}
      <div className="h-6 md:h-8 flex items-center justify-center gap-3" aria-live="polite">
        {isConnected && displayText && (
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        )}

        {displayText && (
          <div
            className={`text-xs md:text-sm font-mono tracking-widest uppercase transition-all duration-500 ${isConnected ? "animate-hushh-observe" :
              isConnecting ? "animate-pulse text-blue-200" :
                "text-gray-600"
              }`}
          >
            {displayText}
          </div>
        )}

        {isConnected && displayText && (
          <div
            className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"
            style={{ animationDelay: "0.5s" }}
          />
        )}
      </div>

      {/* Main Action Button Gateway */}
      <button
        type="button"
        onClick={isConnected ? onDisconnect : onConnect}
        disabled={isConnecting}
        className={`
          relative group overflow-hidden rounded-full px-8 py-3 md:px-12 md:py-4 transition-all duration-300
          ${isConnected
            ? "bg-red-950/30 hover:bg-red-900/40 border border-red-500/30 text-red-200"
            : "bg-white/5 hover:bg-white/10 border border-white/20 text-white"
          }
          backdrop-blur-md shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        <span className="relative z-10 font-bold text-base md:text-lg tracking-wider whitespace-nowrap">
          {isConnected ? "TERMINATE LINK" : isConnecting ? "SYNCHRONIZING..." : "INITIATE KAI"}
        </span>

        {/* Absolute design tokens hover glow background layer */}
        <div
          className={`absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${isConnected ? "bg-red-500/10" : "bg-white/10"
            }`}
        />
      </button>

      {/* Instructional / Flavor System Text */}
      {!isConnected && !isConnecting && (
        <p className="text-gray-600 text-[8px] md:text-[10px] text-center max-w-xs mt-2 opacity-40 uppercase tracking-widest select-none">
          Grant sensory access for 4D resonance
        </p>
      )}
    </div>
  );
};

export default ControlPanel;