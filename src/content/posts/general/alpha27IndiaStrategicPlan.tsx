import {
  Box,
  Heading,
  Text,
  Divider,
  UnorderedList,
  ListItem,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TableContainer,
  VStack,
  Container
} from '@chakra-ui/react';

// Removing React.FC to satisfy the 'React is declared but never read' linting rule
const Alpha27IndiaStrategicPlan = () => {
  const sectionHeadingSize = "lg";
  const bodySize = { md: 'md', base: 'sm' };

  return (
    <Container as="article" maxW="4xl" p={5} color="black">
      <VStack spacing={4} mb={8} textAlign="center">
        <Heading as="h1" fontSize={{ base: "xl", md: "2xl" }}>
          Strategic Investment Plan: Top 27 Alpha Bets in India’s AI-Driven Future
        </Heading>
        <Text fontWeight="600" fontSize="lg">Executive Summary</Text>
      </VStack>

      <Text mb={6} fontSize={bodySize} lineHeight="tall">
        We propose a concentrated portfolio of 27 top-tier (“aces, kings, and queens”) Indian investments
        designed to deliver superior free cash flow growth and capitalize on the AI revolution.
        Focusing on AI infrastructure providers and “AI-first” industries, this strategy targets
        companies with robust cash generation and credible AI-driven growth.
      </Text>

      <Divider my={6} borderColor="black" />

      <section>
        <Heading as="h3" fontSize={sectionHeadingSize} mb={4}>
          Qualified Universe – "India FCF Titans"
        </Heading>
        <TableContainer border="1px solid" borderColor="gray.100" borderRadius="md">
          <Table variant="simple" size="sm">
            <Thead bg="gray.50">
              <Tr>
                <Th>Rank</Th>
                <Th>Company</Th>
                <Th isNumeric>FCF (₹ bn)</Th>
                <Th>AI/Infra Angle</Th>
              </Tr>
            </Thead>
            <Tbody>
              {[
                { rank: 1, name: "Reliance Inds.", fcf: 480, angle: "Jio 5G + Nvidia DC" },
                { rank: 2, name: "TCS", fcf: 464, angle: "GenAI Factory" },
                { rank: 3, name: "Infosys", fcf: 345, angle: "Topaz Platform" },
                { rank: 4, name: "Bharti Airtel", fcf: 361, angle: "600 MW DC Pipeline" }
              ].map((row) => (
                <Tr key={row.rank}>
                  <Td>{row.rank}</Td>
                  <Td fontWeight="bold">{row.name}</Td>
                  <Td isNumeric>{row.fcf}</Td>
                  <Td fontSize="xs">{row.angle}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </section>

      <Box mt={10} bg="gray.50" p={6} borderRadius="lg">
        <Heading as="h4" fontSize="md" mb={3}>
          Investment Rationale & Criteria
        </Heading>
        <UnorderedList spacing={3} fontSize={bodySize}>
          <ListItem><strong>India Inflection:</strong> Accelerating digitization and Civilisational Shift AI point.</ListItem>
          <ListItem><strong>FCF Emphasis:</strong> Prioritizing absolute FCF growth (e.g., Infosys FY25 FCF up 42%).</ListItem>
          <ListItem><strong>Selectivity:</strong> Concentrated "Alpha 27" focus on market leaders with durable moats.</ListItem>
        </UnorderedList>
      </Box>

      <VStack spacing={2} py={10} textAlign="center">
        <Text fontSize="xs" fontStyle="italic" color="gray.500">
          🤫 Confidential — Aloha & Alpha Master Fund 🤐
        </Text>
        <Text fontSize="2xs" color="gray.400">Draft 2025‑02‑16 | v0.9 for IC/LP review</Text>
      </VStack>
    </Container>
  );
};

export default Alpha27IndiaStrategicPlan;