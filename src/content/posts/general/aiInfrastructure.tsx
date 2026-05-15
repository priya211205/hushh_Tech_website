
import {
  Box,
  Divider,
  Text,
  VStack,
  Heading,
  Icon,
  HStack,
  Container
} from '@chakra-ui/react';
import { FiCheckSquare } from 'react-icons/fi';

// Component name must be PascalCase
const AIInfrastructureThesis = () => {
  // Centralizing responsive sizes for cleaner JSX
  const headingSize = { base: 'xl', md: '2xl' };
  const subHeadingSize = { base: 'lg', md: 'xl' };
  const bodySize = { base: 'sm', md: 'md' };

  return (
    <Container
      as="article"
      maxW="4xl"
      p={5}
      color="black"
      // Use theme-aware tokens if possible, otherwise keep consistent
      fontFamily="Inter, system-ui, sans-serif"
    >
      <VStack spacing={2} mb={6} textAlign="center">
        <Heading as="h1" fontSize={headingSize} fontWeight="500">
          AI Infrastructure Thesis Update – May 2025
        </Heading>
        <Text fontWeight="500" fontSize={{ base: 'lg', md: 'xl' }}>
          (Post-Nvidia Q1 FY2026 Earnings)
        </Text>
      </VStack>

      <Divider my={6} borderColor="black" aria-hidden="true" />

      <section>
        <Heading as="h2" fontSize={subHeadingSize} fontWeight="500" mb={4}>
          Executive Summary
        </Heading>
        <Text mb={4} fontSize={bodySize} lineHeight="tall">
          Nvidia's Q1 FY2026 results underscore an unprecedented surge in AI infrastructure demand, prompting a thesis upgrade. The company posted $44.1 billion in revenue (+69% YoY) with Data Center sales up 73%...
        </Text>
        {/* ... Rest of the content following the same pattern ... */}
      </section>



      <section>
        <Heading as="h2" fontSize={subHeadingSize} fontWeight="500" mb={4} mt={8}>
          Aces, Kings, and Queens – Updated Classifications
        </Heading>
        <VStack align="start" spacing={6}>
          {[
            {
              title: "Aces (High-Conviction Compounders)",
              content: "These are core positions with exceptional FCF growth... Nvidia (NVDA) remains our top Ace."
            },
            {
              title: "Kings (Stable Compounders / Income-Payers)",
              content: "Established leaders offering ballast. Reaffirming Broadcom (AVGO), Taiwan Semi (TSM), and Eaton (ETN)."
            },
            {
              title: "Queens (Emerging Leaders)",
              content: "Higher-risk positions with significant upside. Palantir (PLTR) and Vertiv (VRT) show strong momentum."
            }
          ].map((item, index) => (
            <Box key={index} w="full">
              <HStack align="start" mb={2}>
                <Icon as={FiCheckSquare} color="green.500" boxSize={6} mt={1} />
                <Text fontWeight="600" fontSize={bodySize}>{item.title}:</Text>
              </HStack>
              <Text pl={10} fontSize={bodySize}>{item.content}</Text>
            </Box>
          ))}
        </VStack>
      </section>

      <Divider my={8} borderColor="black" />

      <VStack spacing={2} pb={10}>
        <Text fontSize="xs" fontStyle="italic" color="gray.600">
          🤫 Confidential Investment Thesis 🤐
        </Text>
        <Text fontSize="2xs" color="gray.400">
          Ref: MS-2025-05-29-746PM
        </Text>
      </VStack>
    </Container>
  );
};

export default AIInfrastructureThesis;