import { useEffect } from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  UnorderedList,
  ListItem,
  Container,
  Divider
} from '@chakra-ui/react';

// 'import React' removed to satisfy the 'React is declared but never read' lint rule.

const FundAFaq = () => {
  // Update document title for professional UX
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Fund A FAQ | Hushh Technologies";
    return () => { document.title = originalTitle; };
  }, []);

  const faqData = [
    {
      q: "1. What Do We Hear Most from Our LPs?",
      a: [
        "“I want steady income and stable growth.” — That is 'Aloha Income'.",
        "“Don’t lose my money.” — We prioritize capital preservation over leverage.",
        "“Show me real numbers.” — Transparency in our put/call strategies.",
        "“Keep it simple.” — Buy fear, sell greed, reinvest steadily."
      ]
    },
    {
      q: "2. How Do We Generate Returns (A.K.A. “Aloha Income”)?",
      a: [
        "Selling Puts in Fear: Buying great businesses at a discount when the market panics.",
        "Selling Calls in Greed: Renting out our shares when markets go euphoric.",
        "Reinvesting Premium: Using the 'insurance float' to compound our core holdings."
      ]
    },
    // ... Additional items would be mapped here
  ];

  return (
    <Container as="article" maxW="4xl" p={0} color="black">
      <VStack spacing={6} align="stretch">
        <Heading as="h1" fontSize="2xl" mb={4}>
          <span role="img" aria-label="shush">🤫</span> Fund A: Frequently Asked Questions
        </Heading>

        <Text fontSize="lg" fontWeight="500" color="gray.600">
          Clarity and transparency for our Limited Partners.
        </Text>

        <Accordion allowMultiple defaultIndex={[0]}>
          {faqData.map((item, index) => (
            <AccordionItem key={index} border="none" mb={4}>
              <Heading as="h3">
                <AccordionButton
                  bg="gray.50"
                  _hover={{ bg: "gray.100" }}
                  borderRadius="md"
                  p={4}
                >
                  <Box flex="1" textAlign="left" fontWeight="600">
                    {item.q}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel pb={4}>
                <UnorderedList spacing={3} ml={5} fontSize="md">
                  {item.a.map((point, pIdx) => (
                    <ListItem key={pIdx}>{point}</ListItem>
                  ))}
                </UnorderedList>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>

        <Divider borderColor="gray.300" />

        <Box bg="red.50" p={6} borderRadius="lg" border="1px solid" borderColor="red.100">
          <Heading as="h4" fontSize="sm" color="red.800" mb={3} textTransform="uppercase">
            SEC-Compliant Risk Disclosures
          </Heading>
          <UnorderedList spacing={2} fontSize="xs" color="red.900">
            <ListItem><strong>Not an Offer:</strong> This FAQ is informational only.</ListItem>
            <ListItem><strong>Options Strategy:</strong> Selling puts/calls involves risk of significant loss.</ListItem>
            <ListItem><strong>No Guarantees:</strong> Past performance is not indicative of future results.</ListItem>
          </UnorderedList>
        </Box>

        <VStack spacing={1} align="start" pt={6} pb={10}>
          <Text fontWeight="bold">The Fund A Team</Text>
          <Text fontSize="sm" color="gray.500">On behalf of Manish Sainani, Founder</Text>
        </VStack>
      </VStack>
    </Container>
  );
};

export default FundAFaq;