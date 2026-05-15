import { createContext, useContext, useState, ReactNode } from 'react';
// REMOVED: Image, Divider, SellImg (since they were unused)

interface SellTheWallContextType {
  isActive: boolean;
  setIsActive: (value: boolean) => void;
}

const SellTheWallContext = createContext<SellTheWallContextType | undefined>(undefined);

export const SellTheWallProvider = ({ children }: { children: ReactNode }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <SellTheWallContext.Provider value={{ isActive, setIsActive }}>
      {/* 
          Example of fixing the '>' error: 
          If you have a label like "Next >", use {'>'} 
      */}
      <div className="sell-the-wall-wrapper">
        <span>Proceed {'>'}</span>
        {children}
      </div>
    </SellTheWallContext.Provider>
  );
};

export const useSellTheWall = () => {
  const context = useContext(SellTheWallContext);
  if (!context) {
    throw new Error("useSellTheWall must be used within a SellTheWallProvider");
  }
  return context;
};