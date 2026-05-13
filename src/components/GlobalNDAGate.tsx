import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Spinner, VStack, Text } from '@chakra-ui/react';
import { checkNDAStatus } from '../services/nda/ndaService';
import { useAuthSession } from '../auth/AuthSessionProvider';
import {
  buildLoginRedirectPath,
  isAuthenticatedAccountRoute,
  isGuestAuthRoute,
  isPublicSharedProfileRoute,
} from '../auth/routePolicy';

interface GlobalNDAGateProps {
  children: ReactNode;
}

const GlobalNDAGate: React.FC<GlobalNDAGateProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, status } = useAuthSession();

  // Track checking state and cache the NDA result locally to prevent flicker
  const [isChecking, setIsChecking] = useState(true);
  const [hasSignedNDA, setHasSignedNDA] = useState<boolean | null>(null);

  const bootTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;

    const checkNDA = async () => {
      const pathname = location.pathname;

      // 1. EXIT EARLY: If we are already on a route that doesn't require an NDA check
      if (
        isGuestAuthRoute(pathname) ||
        isPublicSharedProfileRoute(pathname) ||
        pathname === '/sign-nda' // CRITICAL: Prevent infinite redirect loop
      ) {
        if (!cancelled) {
          setIsChecking(false);
          setHasSignedNDA(true);
        }
        return;
      }

      // 2. WAIT: Still booting auth
      if (status === 'booting') return;

      // 3. UNAUTHENTICATED: Handle public vs protected routes
      if (status !== 'authenticated' || !session?.user?.id) {
        if (isAuthenticatedAccountRoute(pathname)) {
          navigate(
            buildLoginRedirectPath(pathname, location.search, location.hash),
            { replace: true }
          );
          return;
        }
        if (!cancelled) setIsChecking(false);
        return;
      }

      // 4. AUTHENTICATED: Check NDA Status
      try {
        const NDA_CHECK_TIMEOUT_MS = 5000;
        const ndaResult = await Promise.race([
          checkNDAStatus(session.user.id),
          new Promise<null>((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), NDA_CHECK_TIMEOUT_MS)
          ),
        ]);

        if (cancelled) return;

        // If check fails or says no, redirect
        if (!ndaResult?.hasSignedNda) {
          // Only store redirect if it's not already stored to preserve original entry point
          if (!sessionStorage.getItem('nda_redirect_after')) {
            sessionStorage.setItem('nda_redirect_after', pathname);
          }
          navigate('/sign-nda', { replace: true });
        } else {
          setHasSignedNDA(true);
        }
      } catch (error) {
        if (cancelled) return;
        // Safety: If API is totally dead, we redirect to sign-nda to remain compliant
        console.error('NDA Check failed:', error);
        navigate('/sign-nda', { replace: true });
      } finally {
        if (!cancelled) setIsChecking(false);
      }
    };

    void checkNDA();

    return () => { cancelled = true; };
    // Fix: Removed location.hash and location.search to prevent re-checks on UI interactions
  }, [location.pathname, navigate, session?.user?.id, status]);

  // 5. BOOT TIMEOUT: Safety net for stuck auth states
  useEffect(() => {
    if (isChecking) {
      bootTimeoutRef.current = setTimeout(() => {
        console.warn('[GlobalNDAGate] Access verification timed out.');
        setIsChecking(false);
      }, 8000);
    }
    return () => { if (bootTimeoutRef.current) clearTimeout(bootTimeoutRef.current); };
  }, [isChecking]);

  if (isChecking && status !== 'authenticated') {
    return (
      <Box minH="100dvh" display="flex" alignItems="center" justifyContent="center" bg="white">
        <VStack spacing={4}>
          <Spinner thickness="3px" speed="0.65s" emptyColor="gray.200" color="black" size="xl" />
          <Text color="gray.600" fontSize="sm">Verifying access...</Text>
        </VStack>
      </Box>
    );
  }

  return <>{children}</>;
};

export default GlobalNDAGate;