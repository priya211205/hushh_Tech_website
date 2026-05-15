import { useEffect } from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  UnorderedList,
  ListItem,
  Container,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Badge,
  HStack,
  SimpleGrid // FIX 1: Added missing import
} from '@chakra-ui/react';

/**
 * HushhEmployeeChampionHandbook
 * Note: Removed 'import React' to satisfy modern JSX transform linting rules.
 */
const HushhEmployeeChampionHandbook = () => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Employee & Champion Handbook | hushhTech";
    return () => {
      document.title = originalTitle;
    };
  }, []);

  // FIX 2: This is now used in the Heading tags below
  const sectionHeadingSize = "lg";

  return (
    <Container as="article" maxW="4xl" p={5} color="black">
      <VStack align="start" spacing={2} mb={6}>
        <HStack>
          <Badge colorScheme="blue">v0.9.5</Badge>
          <Badge colorScheme="purple">Confidential</Badge>
        </HStack>
        <Heading as="h1" fontSize="3xl">
          Hushh: Employee & Champion Handbook
        </Heading>
        <Text fontSize="xs" color="gray.500">
          For An AI-First World • Last Updated: Feb 21 2025 6:10pm PT
        </Text>
      </VStack>

      <Box bg="gray.50" p={6} borderRadius="lg" mb={8} border="1px solid" borderColor="gray.100">
        <Heading as="h2" fontSize="md" mb={3} textTransform="uppercase" letterSpacing="wider">
          TL;DR Memo: The Hushh Core
        </Heading>
        <Text fontSize="sm" lineHeight="tall">
          HushhTech is an AI-first firm turning high-quality FCF ownership into “rental-like” income.
          We pursue <strong>Alpha</strong> (market-beating returns) through <strong>Aloha</strong>
          (steady, human-centered cash flow).
        </Text>
      </Box>

      <Accordion allowMultiple defaultIndex={[0]}>
        {/* Section 1 */}
        <AccordionItem border="none" mb={4}>
          <Heading as="h3">
            <AccordionButton bg="white" _hover={{ bg: "gray.50" }} borderBottom="1px solid" borderColor="gray.200" py={4}>
              {/* FIX 3: Applied the variable here */}
              <Box flex="1" textAlign="left" fontWeight="bold" fontSize={sectionHeadingSize}>
                1. Culture, Purpose & "The Why"
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Heading>
          <AccordionPanel pb={4} pt={4}>
            <VStack align="start" spacing={4}>
              <Text fontWeight="600">Our Why: Maximize Alpha & Aloha</Text>
              <UnorderedList spacing={2} ml={5} fontSize="sm">
                <ListItem>Data is a personal asset; users should control and profit from it.</ListItem>
                <ListItem>AI augments human creativity; it does not replace it.</ListItem>
                <ListItem>Community & Belonging are the bedrock of our growth.</ListItem>
              </UnorderedList>
            </VStack>
          </AccordionPanel>
        </AccordionItem>

        {/* Section 2 */}
        <AccordionItem border="none" mb={4}>
          <Heading as="h3">
            <AccordionButton bg="white" _hover={{ bg: "gray.50" }} borderBottom="1px solid" borderColor="gray.200" py={4}>
              <Box flex="1" textAlign="left" fontWeight="bold" fontSize={sectionHeadingSize}>
                2. Roles: Employees vs. Champions
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Heading>
          <AccordionPanel pb={4} pt={4}>
            {/* SimpleGrid is now correctly imported and used */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Box>
                <Badge colorScheme="blue" mb={2}>Internal</Badge>
                <Text fontWeight="bold" mb={2}>Employees</Text>
                <Text fontSize="sm">Internal engineers, quants, and ops specialists focused on building the core "Sell the Wall" infrastructure.</Text>
              </Box>
              <Box>
                <Badge colorScheme="purple" mb={2}>External</Badge>
                <Text fontWeight="bold" mb={2}>Champions</Text>
                <Text fontSize="sm">Community ambassadors who spread our approach and earn commissions on closed deals.</Text>
              </Box>
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Divider my={10} borderColor="gray.300" />

      <Box textAlign="center" pb={10}>
        <Text fontWeight="bold" mb={2}>Need More Info?</Text>
        <Text fontSize="sm">Employee HR: hr@hush1one.com</Text>
        <Text fontSize="sm">Champion/IR: ir@hushh.ai</Text>
        <Text mt={6} fontWeight="bold" fontSize="lg">
          — The Hushh Leadership Team
        </Text>
      </Box>
    </Container>
  );
};

export default HushhEmployeeChampionHandbook;