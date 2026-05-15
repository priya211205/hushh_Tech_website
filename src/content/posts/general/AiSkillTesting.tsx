import {
  Box,
  Text,
  Image,
  Heading,
  Divider,
  VStack,
  OrderedList,
  UnorderedList,
  ListItem
} from '@chakra-ui/react';
// Verify this path matches your latest '../../../' depth discovery
import SkillTesting from '../../../components/images/2_Manifesto.jpg';

const AISkillsTesting = () => {
  const sectionHeadingSize = "lg";
  const bodyTextSize = "md";

  return (
    <Box as="article" p={0} color="black">
      <Image
        src={SkillTesting}
        alt="AI Skills Manifesto Visual"
        mb={6}
        borderRadius="md"
        fallbackSrc="https://via.placeholder.com/800x400?text=AI+Skills+Testing"
      />

      <Heading as="h2" fontSize="2xl" mb={4}>
        <span role="img" aria-label="rocket">🚀</span> AI Skills and Testing
      </Heading>

      <VStack align="start" spacing={4} mb={6}>
        <Text fontSize="lg" fontWeight="500">
          We live in an age of miracles. But a pre-requisite for any company to harness these miracles is that employees should be excited — and proactive — about learning how to use them.
        </Text>

        <Text fontSize={bodyTextSize}>
          To test this, I’d suggest a new 2-part interview question for every candidate, whether CFO or CSR (customer service rep):
        </Text>

        <OrderedList spacing={3} pl={5} fontWeight="600">
          <ListItem>How will you use AI to make your job more effective?</ListItem>
          <ListItem>What steps have you already taken to learn about AI tools in your field?</ListItem>
        </OrderedList>
      </VStack>

      <Divider my={6} borderColor="gray.300" />

      <Heading as="h3" fontSize={sectionHeadingSize} mb={3}>
        Strong Candidate Responses:
      </Heading>
      <UnorderedList spacing={2} mb={6} pl={5}>
        <ListItem>Specific examples of AI tools experimented with and lessons learned.</ListItem>
        <ListItem>Realistic applications for their role, not generic AI use cases.</ListItem>
        <ListItem>A balance between enthusiasm and pragmatism.</ListItem>
      </UnorderedList>

      <Heading as="h3" fontSize={sectionHeadingSize} color="red.600" mb={3}>
        Weak Responses (Red Flags):
      </Heading>
      <UnorderedList spacing={2} mb={6} pl={5}>
        <ListItem>Vague statements about AI being "the future" without specifics.</ListItem>
        <ListItem>Only mentioning surface-level tools like ChatGPT.</ListItem>
        <ListItem>No evidence of self-directed learning.</ListItem>
      </UnorderedList>

      <Box bg="gray.50" p={6} borderRadius="lg" borderLeft="4px solid" borderColor="black">
        <Heading as="h3" fontSize={sectionHeadingSize} mb={2}>
          <span role="img" aria-label="briefcase">💼</span> AI Fitness Reviews for Current Teams
        </Heading>
        <UnorderedList spacing={3} variant="unstyled">
          <ListItem>
            <strong>Quarterly AI Skill-Review:</strong> "What AI skill did you learn last quarter? How did it impact your work?"
          </ListItem>
          <ListItem>
            <strong>Peer-Driven Spotlights:</strong> Employees demo tools they’ve integrated into their workflows.
          </ListItem>
          <ListItem>
            <strong>Reward Experiments:</strong> Celebrate the learning process, even for failed tests.
          </ListItem>
        </UnorderedList>
      </Box>
    </Box>
  );
};

export default AISkillsTesting;