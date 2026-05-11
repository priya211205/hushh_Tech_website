/** Enum for footer navigation tabs */
export enum HushhFooterTab {
  HOME = "home",
  FUND_A = "fund_a",
  COMMUNITY = "community",
  PROFILE = "profile",
}

export type FooterTabConfig = {
  id: HushhFooterTab;
  icon: string | null;
  label: string;
  path: string;
};

export const STATIC_TABS = [
  { id: HushhFooterTab.HOME, icon: "home", label: "Home" },
  { id: HushhFooterTab.FUND_A, icon: null, label: "Fund A" },
  { id: HushhFooterTab.COMMUNITY, icon: "groups", label: "Comm" },
];
