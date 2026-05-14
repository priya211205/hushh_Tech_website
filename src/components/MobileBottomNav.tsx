import React from 'react';
import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiTrendingUp, FiUsers, FiUser } from 'react-icons/fi';

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
    <Box
      as="nav"
      aria-label="Mobile Bottom Navigation"
      display={{ base: 'block', md: 'none' }}
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      zIndex="40"
      bg="#F8F9FA"
      borderTop="1px solid"
      borderColor="#E5E7EB"
      pb="env(safe-area-inset-bottom)"
    >
      <Flex
        justify="space-around"
        align="center"
        h="85px"
        maxW="448px"
        mx="auto"
        px="2"
      >
        {navItems.map((item) => {
          const active = isActive(item);
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
    </Box>
  );
};

export default MobileBottomNav;