import { Icon, Tooltip, Link } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useLocation } from 'react-router-dom';

/**
 * FloatingContactBubble component
 * A floating bubble that appears on the right side of the screen across all pages
 * Clicking it opens email to invest@hushh.ai
 */

// Fix: Use motion.create(Link) to support href and anchor semantics correctly
const MotionLink = motion.create(Link);

export default function FloatingContactBubble() {
  const location = useLocation();

  // Hide on investor profile pages (chat and developer sections have their own layout)
  const isInvestorProfilePage = location.pathname.startsWith('/investor/');

  if (isInvestorProfilePage) {
    return null;
  }

  return (
    <Tooltip
      label="Contact Us - invest@hushh.ai"
      placement="left"
      hasArrow
      bg="gray.700"
      color="white"
      fontSize="sm"
      px={3}
      py={2}
      borderRadius="md"
    >
      <MotionLink
        // Fix: Use native anchor tag semantics for mailto links
        as="a"
        href="mailto:invest@hushh.ai"
        position="fixed"
        bottom={{ base: '24px', md: '32px' }}
        right={{ base: '24px', md: '32px' }}
        w="56px"
        h="56px"
        borderRadius="full"
        bg="#2b8cee"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="0 4px 14px rgba(43, 140, 238, 0.3)"
        zIndex={9999}
        aria-label="Contact us via email"
        // Native <a> tags get Enter/Space keybindings automatically

        // Chakra focus handling
        _focus={{
          outline: '3px solid',
          outlineColor: 'blue.300',
          outlineOffset: '2px',
        }}
        // Framer Motion physics for both color and scale
        whileHover={{
          scale: 1.05,
          backgroundColor: '#2579d4',
          boxShadow: '0 6px 20px rgba(43, 140, 238, 0.4)',
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        <Icon
          as={Mail}
          boxSize="24px"
          strokeWidth={2}
        />
      </MotionLink>
    </Tooltip>
  );
}