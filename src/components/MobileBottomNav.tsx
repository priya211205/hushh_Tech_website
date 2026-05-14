// src/components/MobileBottomNav.tsx
// Mobile bottom navigation with 4 tabs matching the exact design reference
// Active tab has blue circular background behind icon
// Issue #1219: Fixed overlay issues and added entrance animation

import React from 'react';
import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiTrendingUp, FiUsers, FiUser } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  matchPaths?: string[];
}

const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: FiHome,
    path: '/',
    matchPaths: ['/our-philosophy'],
  },
  {
    id: 'fund',
    label: 'Fund A',
    icon: FiTrendingUp,
    path: '/discover-fund-a',
    matchPaths: ['/sell-the-wall', '/ai-powered-berkshire'],
  },
  {
    id: 'community',
    label: 'Community',
    icon: FiUsers,
    path: '/community',
    matchPaths: [],
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: FiUser,
    path: '/hushh-user-profile',
    matchPaths: ['/contact', '/faq'],
  },
];

const hiddenOnPages = [
  '/onboarding',
  '/login',
  '/signup',
  '/auth',
  '/kyc-flow',
  '/kyc-demo',
  '/a2a-playground',
  '/hushh-user-profile',
];

// Framer Motion variants for entrance animation
const navVariants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: {
    y: 10,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
};

// Motion component for the nav container
const MotionBox = motion(Box);

const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();

  const shouldHideNav = hiddenOnPages.some(page =>
    currentPath === page.toLowerCase() || currentPath.startsWith(`${page.toLowerCase()}/`)
  );

  const isFullScreenPost = currentPath.startsWith('/community/') &&
    currentPath !== '/community';

  if (shouldHideNav || isFullScreenPost) {
    return null;
  }

  const isActive = (item: NavItem): boolean => {
    if (currentPath === item.path) return true;
    if (item.matchPaths?.some(p => currentPath.startsWith(p))) return true;
    if (item.id === 'community' && currentPath.startsWith('/community')) return true;
    return false;
  };

  return (
    <MotionBox
      as="nav"
      role="navigation"
      aria-label="Mobile bottom navigation"
      display={{ base: 'block', md: 'none' }}
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      zIndex="1000"
      bg="#F8F9FA"
      borderTop="1px solid"
      borderColor="#E5E7EB"
      // Safe area inset for iOS devices with home indicator
      sx={{
        pb: 'env(safe-area-inset-bottom, 0px)',
      }}
      // Ensure nav doesn't block content - use pointer-events properly
      css={{
        // Prevent the nav background from extending beyond its bounds
        clipPath: 'inset(0 0 0 0)',
      }}
      // Entrance animation variants
      variants={navVariants}
      initial="hidden"
      animate="visible"
      // Re-animate on route change for smooth transitions
      key={location.pathname}
    >
      <Flex
        justify="space-around"
        align="center"
        h={{ base: '70px', sm: '85px' }}
        maxW="448px"
        mx="auto"
        px="2"
        // Ensure consistent height on all viewports
        css={{
          minHeight: '70px',
        }}
      >
        {navItems.map((item) => {
          const active = checkIsActive(item);
          return (
            <Flex
              key={item.id}
              as={Link}
              to={item.path}
              direction="column"
              align="center"
              justify="center"
              gap="1"
              p="2"
              flex="1"
              h="100%"
              transition="all 0.2s ease"
              role="group"
              aria-current={active ? 'page' : undefined}
              _active={{ transform: 'scale(0.95)' }}
              _hover={{ textDecoration: 'none' }}
              // Framer Motion item variants for staggered entrance
              as={motion.div}
              variants={itemVariants}
            >
              {/* FIXED: Consistent Box tags to prevent build error */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="48px"
                h="48px"
                borderRadius="full"
                bg={active ? '#E8F0FE' : 'transparent'}
                transition="all 0.2s ease"
              >
                <Icon
                  as={item.icon}
                  boxSize={6}
                  color={active ? '#2F80ED' : '#9CA3AF'}
                  strokeWidth={active ? 2.5 : 2}
                  transition="all 0.2s ease"
                />
              </Box>

              <Text
                fontSize="11px"
                fontWeight={active ? '600' : '500'}
                color={active ? '#2F80ED' : '#9CA3AF'}
                letterSpacing="0.01em"
                transition="all 0.2s ease"
                mt="-2px"
              >
                {item.label}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </MotionBox>
  );
};

export default MobileBottomNav;