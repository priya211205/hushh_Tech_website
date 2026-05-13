import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { Box, Text, Flex, Image } from "@chakra-ui/react";
import config from "../resources/config/config";
import { Session } from "@supabase/supabase-js";
import HushhLogo from "./images/Hushhogo.png";
import {
  getContinueOnboardingCta,
} from "../services/onboarding/flow";

/* ─── iOS Design Tokens ─── */
const IOS = {
  blue: "#007AFF",
  blueActive: "#0062CC",
  bg: "#F2F2F7",
  bgWhite: "#FFFFFF",
  text: "#000000",
  subtext: "#86868B",
  separator: "#C6C6C8",
  fillGray: "rgba(118,118,128,0.12)",
  // Added safe fallbacks for non-apple devices
  font: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
};

/* ─── Rectified Feature Card (Fixed Material Symbols) ─── */
const FeatureCard = ({ icon, iconBg, iconColor, title, desc }: {
  icon: string; iconBg: string; iconColor: string; title: string; desc: string;
}) => (
  <Box
    bg="white" p={4} borderRadius="20px"
    boxShadow="inset 0 0 0 0.5px #E5E5EA"
    display="flex" flexDir="column" justifyContent="space-between" h="140px"
    _active={{ transform: "scale(0.98)" }} transition="transform 0.1s"
  >
    <Flex w="32px" h="32px" borderRadius="full" bg={iconBg} align="center" justify="center">
      <Text fontSize="20px" className="material-symbols-outlined" color={iconColor}>
        {icon}
      </Text>
    </Flex>
    <Box>
      <Text fontSize="15px" fontWeight="600" color={IOS.text} mb={0.5}>{title}</Text>
      <Text fontSize="12px" color={IOS.subtext} lineHeight="16px">{desc}</Text>
    </Box>
  </Box>
);

export default function Hero() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [onboardingStatus, setOnboardingStatus] = useState({
    hasProfile: false,
    isCompleted: false,
    currentStep: 1,
    loading: true,
  });

  /* Fix: Robust Auth Listener with Cleanup */
  useEffect(() => {
    let mounted = true;
    if (!config.supabaseClient) return;

    const fetchSession = async () => {
      const { data } = await config.supabaseClient!.auth.getSession();
      if (mounted) setSession(data.session);
    };

    fetchSession();

    const { data: { subscription } } = config.supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (mounted) setSession(session);
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  /* Check onboarding status */
  useEffect(() => {
    if (!session?.user?.id || !config.supabaseClient) {
      if (!session) setOnboardingStatus(prev => ({ ...prev, loading: false }));
      return;
    }

    const checkUserStatus = async () => {
      try {
        const [profileRes, onboardingRes] = await Promise.all([
          config.supabaseClient!.from('investor_profiles').select('user_confirmed').eq('user_id', session.user.id).maybeSingle(),
          config.supabaseClient!.from('onboarding_data').select('is_completed, current_step').eq('user_id', session.user.id).maybeSingle()
        ]);

        setOnboardingStatus({
          hasProfile: !!profileRes.data,
          isCompleted: onboardingRes.data?.is_completed || false,
          currentStep: onboardingRes.data?.current_step || 1,
          loading: false,
        });
      } catch (e) {
        setOnboardingStatus(prev => ({ ...prev, loading: false }));
      }
    };

    checkUserStatus();
  }, [session]);

  const primaryCTA = useCallback(() => {
    if (!session) return { text: "Get Started", action: () => navigate("/login") };
    if (onboardingStatus.loading) return { text: "Verifying...", action: () => { } };
    if (onboardingStatus.hasProfile) return { text: "Open Portfolio", action: () => navigate("/hushh-user-profile") };

    const cta = getContinueOnboardingCta(onboardingStatus.currentStep);
    return { text: cta.text, action: () => navigate(cta.route) };
  }, [session, onboardingStatus, navigate])();

  return (
    <Box bg={IOS.bg} fontFamily={IOS.font} minH="100dvh">
      <Box as="main" maxW="500px" mx="auto" pb="140px" pt="20px">

        {/* Section 1: Intro */}
        <Flex flexDir="column" align="center" px={6} py={8} bg="white" borderBottomRadius="32px" boxShadow="0 4px 20px rgba(0,0,0,0.03)">
          <Image src={HushhLogo} alt="Hushh" w="64px" h="64px" mb={6} />
          <Text fontSize="34px" fontWeight="800" textAlign="center" letterSpacing="-0.03em" lineHeight="1.1" mb={2}>
            Investing in the <Text as="span" color={IOS.blue}>Future</Text>
          </Text>
          <Text fontSize="17px" textAlign="center" color={IOS.subtext} mb={8} px={4}>
            The AI-Powered Berkshire Hathaway.
          </Text>

          <Box w="100%" px={2}>
            <Box as="button" w="100%" bg={IOS.blue} color="white" fontWeight="600" py="16px" borderRadius="14px" mb={3} onClick={primaryCTA.action}>
              {primaryCTA.text}
            </Box>
          </Box>
        </Flex>

        {/* Section 2: Advantage Grid */}
        <Box px={6} py={8}>
          <Text fontSize="22px" fontWeight="700" mb={4}>The Hushh Advantage</Text>
          <Flex gap={3} wrap="wrap">
            <Box flex="1" minW="140px">
              <FeatureCard icon="insights" iconBg="rgba(0,122,255,0.1)" iconColor={IOS.blue} title="AI Data" desc="Real-time signals." />
            </Box>
            <Box flex="1" minW="140px">
              <FeatureCard icon="account_balance_wallet" iconBg="rgba(52,199,89,0.1)" iconColor="#34C759" title="Low Fees" desc="Keep your gains." />
            </Box>
          </Flex>
        </Box>

        {/* Fund A Highlight */}
        <Box px={6} mb={8}>
          <Box bg="white" p={6} borderRadius="24px" boxShadow="0 10px 30px rgba(0,0,0,0.04)">
            <Text fontSize="13px" fontWeight="700" color={IOS.blue} mb={1} textTransform="uppercase">Flagship Fund</Text>
            <Text fontSize="28px" fontWeight="800" mb={4}>Fund A</Text>
            <Flex align="baseline" gap={2}>
              <Text fontSize="48px" fontWeight="800" color={IOS.text}>23%</Text>
              <Text fontSize="17px" fontWeight="600" color={IOS.subtext}>Target IRR</Text>
            </Flex>
          </Box>
        </Box>
      </Box>

      {/* ═══ Fixed Bottom Tab Bar (iOS Safe Area Fixed) ═══ */}
      <Box
        position="fixed" bottom={0} left={0} right={0}
        bg="rgba(255,255,255,0.9)"
        backdropFilter="blur(20px)"
        borderTop="0.5px solid rgba(0,0,0,0.1)"
        // This padding handles the iPhone "Home Indicator" notch
        pb="calc(12px + env(safe-area-inset-bottom))"
        pt={3} px={8} zIndex={100}
      >
        <Flex justify="space-between" maxW="500px" mx="auto">
          <TabItem icon="home" label="Home" active />
          <TabItem icon="account_balance" label="Invest" />
          <TabItem icon="person" label="Account" />
        </Flex>
      </Box>
    </Box>
  );
}

// Simple internal component for the Tab Bar
const TabItem = ({ icon, label, active = false }: { icon: string; label: string; active?: boolean }) => (
  <Flex flexDir="column" align="center" gap={1} opacity={active ? 1 : 0.4} cursor="pointer">
    <Text fontSize="24px" className="material-symbols-outlined" color={active ? IOS.blue : "black"}>
      {icon}
    </Text>
    <Text fontSize="10px" fontWeight="600" color={active ? IOS.blue : "black"}>{label}</Text>
  </Flex>
);