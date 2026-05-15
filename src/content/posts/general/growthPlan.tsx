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
  ListItem,
  ListIcon
} from '@chakra-ui/react';
import { FiTrendingUp, FiShield, FiGlobe } from 'react-icons/fi';
import AlphaAlohaImg from '../../../components/images/blog2o.png';

export const frontmatter = {
  title: "A Realistic Growth Plan for Hushh Alpha Fund",
  date: "2025-02-14",
  description: 'A comprehensive growth plan for scaling the Hushh Alpha Fund to $1B AUM.',
  author: "Internal Team",
  tags: ["growth plan", "investment strategy", "AUM"],
  category: "investment strategy"
};

const HushhAlphaFundGrowthPlan = () => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Growth Plan | Hushh Alpha Fund";
    return () => { document.title = originalTitle; };
  }, []);

  const sectionHeadingSize = "lg";

  return (
    <Container as="article" maxW="4xl" p={0} color="black">
      <Image src={AlphaAlohaImg} alt="Hushh Alpha Fund Growth Roadmap" mb={6} borderRadius="md" />

      <VStack align="start" spacing={2} mb={8}>
        <Badge colorScheme="blue">Strategy Document</Badge>
        <Heading as="h1" fontSize="2xl">A Realistic Growth Plan for Hushh Alpha Fund</Heading>
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
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
            <Text fontSize="sm"><strong>AUM Target:</strong> $7.5M → $50M</Text>
            <Text fontSize="sm"><strong>Min Ticket Size:</strong> $5M</Text>
          </SimpleGrid>
          <List spacing={2} fontSize="md">
            <ListItem><ListIcon as={FiTrendingUp} /> Validate ‘Sell the Wall’ as a sustainable income machine</ListItem>
            <ListItem><ListIcon as={FiShield} /> Target Sharpe Ratio: 1.8+</ListItem>
          </List>
        </Box>

        {/* Phase 2 */}
        <Box borderLeft="4px solid" borderColor="purple.500" pl={6}>
          <Heading as="h2" fontSize={sectionHeadingSize} mb={2}>
            Phase 2: Expansion to $250M AUM (12-36 Months)
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
            <Text fontSize="sm"><strong>AUM Target:</strong> $50M → $250M</Text>
            <Text fontSize="sm"><strong>Target Net Return:</strong> 12-15%</Text>
          </SimpleGrid>
          <Text fontSize="md" mb={2}>Focusing on institutional fund registration and structured products for HNWIs.</Text>
        </Box>

        {/* Phase 3 */}
        <Box borderLeft="4px solid" borderColor="black" pl={6}>
          <Heading as="h2" fontSize={sectionHeadingSize} mb={2}>
            Phase 3: $1B Institutional Fund (36-60 Months)
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
            <Text fontSize="sm"><strong>AUM Target:</strong> $250M → $1B</Text>
            <Text fontSize="sm"><strong>Annualized Cash Flow:</strong> $120M+</Text>
          </SimpleGrid>
          <List spacing={2} fontSize="md">
            <ListItem><ListIcon as={FiGlobe} /> Structured vehicles for Pension & Sovereign Wealth Funds</ListItem>
          </List>
        </Box>

        <Box bg="gray.50" p={8} borderRadius="xl" textAlign="center">
          <Text fontStyle="italic" fontSize="lg">
            “If Berkshire Hathaway and Renaissance Technologies had a baby, Hushh would be it.”
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default HushhAlphaFundGrowthPlan;