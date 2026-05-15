import { useEffect } from 'react';
import {
  Box,
  Heading,
  Image,
  Text,
  VStack,
  Divider,
  Container,
  Badge,
  SimpleGrid,
  List,
  ListIcon
} from '@chakra-ui/react';
import { FiShield, FiGlobe, FiTarget } from 'react-icons/fi';
import AlphaAlohaImg from '../../../components/images/blog2o.png';

export const frontmatter = {
  title: "A Realistic Growth Plan for Hushh Alpha Fund",
  date: "2025-02-14",
  description: 'A comprehensive growth plan for scaling the Hushh Alpha Fund to $1B AUM with sustainable, cash flow-driven alpha.',
  author: "Internal Team",
  tags: ["growth plan", "investment strategy", "AUM", "institutional credibility"],
  category: "investment strategy"
};

const HushhAlphaFundGrowthPlan = () => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Growth Plan | Hushh Alpha Fund";
    return () => {
      document.title = originalTitle;
    };
  }, []);

  const sectionHeadingSize = "lg";

  return (
    <Container as="article" maxW="4xl" p={5} color="black">
      <Image
        src={AlphaAlohaImg}
        alt="Hushh Alpha Fund Growth Roadmap"
        mb={6}
        borderRadius="md"
        fallbackSrc="https://via.placeholder.com/800x400?text=Hushh+Alpha+Growth+Plan"
      />

      <VStack align="start" spacing={2} mb={8}>
        <Badge colorScheme="blue">Strategic Roadmap</Badge>
        <Heading as="h1" fontSize="2xl">
          A Realistic Growth Plan for Hushh Alpha Fund
        </Heading>
        <Text fontSize="lg" color="gray.600">
          <strong>Starting AUM:</strong> $7.5M (GP Risk Capital)
        </Text>
      </VStack>

      <Divider my={6} borderColor="black" />

      <VStack spacing={10} align="stretch">
        {/* Phase 1 */}
        <Box borderLeft="4px solid" borderColor="blue.500" pl={6}>
          <Heading as="h2" fontSize={sectionHeadingSize} mb={2}>
            Phase 1: Proof of Concept & LP Trust (0-12 Months)
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2} mb={4}>
            <Text fontSize="sm"><strong>AUM Target:</strong> $7.5M → $50M</Text>
            <Text fontSize="sm"><strong>Min Ticket Size:</strong> $5M</Text>
          </SimpleGrid>
          <List spacing={2} fontSize="md">
            <Box as="li" display="flex" alignItems="center">
              <ListIcon as={FiTarget} color="blue.500" />
              Validate ‘Sell the Wall’ as a Sustainable Income Machine
            </Box>
            <Box as="li" display="flex" alignItems="center">
              <ListIcon as={FiShield} color="green.500" />
              Target Sharpe Ratio: 1.8+ & Max Drawdown Control
            </Box>
          </List>
        </Box>

        {/* Phase 2 */}
        <Box borderLeft="4px solid" borderColor="purple.500" pl={6}>
          <Heading as="h2" fontSize={sectionHeadingSize} mb={2}>
            Phase 2: Expansion to $250M AUM (12-36 Months)
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2} mb={4}>
            <Text fontSize="sm"><strong>AUM Target:</strong> $50M → $250M</Text>
            <Text fontSize="sm"><strong>Annualized Cash Flow Target:</strong> $30M+</Text>
          </SimpleGrid>
          <Text fontSize="md">
            Scaling ‘Sell the Wall’ across market cycles and launching structured
            investment products for institutional access.
          </Text>
        </Box>

        {/* Phase 3 */}
        <Box borderLeft="4px solid" borderColor="black" pl={6}>
          <Heading as="h2" fontSize={sectionHeadingSize} mb={2}>
            Phase 3: $1B Institutional Fund (36-60 Months)
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2} mb={4}>
            <Text fontSize="sm"><strong>AUM Target:</strong> $250M → $1B</Text>
            <Text fontSize="sm"><strong>Min Ticket Size:</strong> $25M+</Text>
          </SimpleGrid>
          <List spacing={2} fontSize="md">
            <Box as="li" display="flex" alignItems="center">
              <ListIcon as={FiGlobe} color="purple.500" />
              Sovereign Wealth Fund & Pension Fund Onboarding
            </Box>
          </List>
        </Box>

        <Box bg="gray.50" p={8} borderRadius="xl" textAlign="center" border="1px solid" borderColor="gray.100">
          <Text fontStyle="italic" fontSize="lg" fontWeight="500">
            “If Berkshire Hathaway and Renaissance Technologies had a baby, Hushh would be it.”
          </Text>
        </Box>

        <VStack spacing={1} align="center" pt={6} pb={10}>
          <Text fontSize="xs" fontWeight="bold">Confidential Strategy Document</Text>
          <Text fontSize="2xs" color="gray.500">Hushh Technologies — Internal Distribution Only</Text>
        </VStack>
      </VStack>
    </Container>
  );
};

export default HushhAlphaFundGrowthPlan;