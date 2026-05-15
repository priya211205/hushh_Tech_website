import {
  Box,
  Heading,
  Text,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  TableContainer,
  UnorderedList,
  ListItem,
  Container,
  Divider
} from '@chakra-ui/react';
import MarketUpdate from '../../../components/images/2_Daily Market Update.jpg';

/**
 * CompensationReport Component
 * Resolved: 'React' unused import warning.
 * Added: Mobile-responsive TableContainer.
 * Fixed: Semantic list structures.
 */
const CompensationReport = () => {
  const sectionHeadingSize = "lg";
  const bodySize = { md: 'md', base: 'sm' };

  return (
    <Container as="article" maxW="4xl" p={0} color="black">
      <Image
        src={MarketUpdate}
        alt="Pune Market Compensation Analysis"
        mb={6}
        borderRadius="md"
        fallbackSrc="https://via.placeholder.com/800x400?text=Pune+Compensation+Report"
      />

      <Heading as="h1" fontSize="2xl" mb={4}>
        Comprehensive Report on Compensation Patterns in Pune, Maharashtra
      </Heading>

      <VStack spacing={8} align="stretch">
        <Box>
          <Heading as="h2" fontSize={sectionHeadingSize} mb={2}>Overview</Heading>
          <Text fontSize={bodySize} lineHeight="tall">
            This report provides detailed insights into compensation patterns for young professionals in Pune,
            focusing on bachelor’s, master’s, and PhD graduates. It emphasizes candidates skilled in
            science, engineering, storytelling, and product development.
          </Text>
        </Box>

        <Box bg="gray.50" p={5} borderRadius="lg">
          <Heading as="h2" fontSize={sectionHeadingSize} mb={3}>Compensation Philosophy</Heading>
          <UnorderedList spacing={3} fontSize={bodySize} ml={5}>
            <ListItem>
              <strong>Low Base, High Variable Model:</strong> Modest base pay supplemented by performance bonuses and equity.
            </ListItem>
            <ListItem>
              <strong>Equity Ownership:</strong> Granted at par value (₹83 per share) to incentivize long-term commitment.
            </ListItem>
            <ListItem>
              <strong>Merit-Based Adjustments:</strong> Rapid movement through pay bands for exceptional contributors.
            </ListItem>
          </UnorderedList>
        </Box>

        <Box>
          <Heading as="h2" fontSize={sectionHeadingSize} mb={4}>Salary and Stipend Ranges (INR)</Heading>
          <TableContainer border="1px solid" borderColor="gray.100" borderRadius="md">
            <Table variant="simple" size="sm">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Role</Th>
                  <Th>Stipend/Salary</Th>
                  <Th>Equity</Th>
                </Tr>
              </Thead>
              <Tbody>
                {[
                  { role: "High School Interns", pay: "₹5k–₹10k/mo", equity: "None" },
                  { role: "Bachelor’s Interns", pay: "₹15k–₹30k/mo", equity: "5k–10k shares" },
                  { role: "Master’s Interns", pay: "₹25k–₹50k/mo", equity: "10k–15k shares" },
                  { role: "PhD Interns", pay: "₹50k–₹75k/mo", equity: "15k–20k shares" },
                  { role: "Entry-Level Full-Time", pay: "₹6L–₹12L/yr", equity: "15k–25k shares" },
                ].map((row, idx) => (
                  <Tr key={idx}>
                    <Td fontWeight="600">{row.role}</Td>
                    <Td>{row.pay}</Td>
                    <Td>{row.equity}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

        <Divider borderColor="gray.300" />

        <Box pb={10}>
          <Heading as="h2" fontSize={sectionHeadingSize} mb={3}>Implementation Plan</Heading>
          <UnorderedList spacing={2} fontSize={bodySize} ml={5}>
            <ListItem><strong>Data Updates:</strong> Regular market analysis for competitiveness.</ListItem>
            <ListItem><strong>Performance Reviews:</strong> Bi-annual compensation adjustments.</ListItem>
            <ListItem><strong>Equity Vesting:</strong> Four-year schedule for all grants.</ListItem>
          </UnorderedList>
        </Box>
      </VStack>
    </Container>
  );
};

export default CompensationReport;