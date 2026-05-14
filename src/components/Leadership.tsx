import React from "react";
import { Link } from "react-router-dom"; // Assuming React Router is used
import img from "../../files/img.png";
import img2 from "../../files/img (1).png";
import { Box, Container, Heading, Text, SimpleGrid, Flex, Image, Button } from "@chakra-ui/react";
import { Banknote, Building2, Zap, BrainCircuit, TrendingUp } from "lucide-react";

export default function Leadership() {
  return (
    <Box bg="white" className="font-sans antialiased">
      {/* Hero Section */}
      <Box pt={{ base: 16, md: 24 }} px={4} minH={{ md: "70vh", base: '60vh' }} textAlign="center">
        <Container maxW="container.lg" mt={{ md: 16, base: 8 }}>
          <Heading
            as="h1"
            fontSize={{ base: "3xl", md: "7xl" }}
            fontWeight="300"
            lineHeight="1.1"
            color="#1D1D1F"
            letterSpacing="tight"
            mb={6}
          >
            Empowering Wealth Creation with{" "}
            <Text as="span" fontWeight="500" bgGradient="linear(to-r, #00A9E0, #6DD3EF)" bgClip="text">
              Integrity and Innovation
            </Text>
          </Heading>

          <Text
            fontSize={{ base: "xl", md: "2xl" }}
            color="#6E6E73"
            fontWeight="300"
            lineHeight="relaxed"
            maxW="3xl"
            mx="auto"
            mb={12}
          >
            We blend quantitative expertise with ethical investment practices to deliver personalized financial solutions.
          </Text>
        </Container>
      </Box>

      {/* Our Mission Section */}
      <Box pb={{ base: 12, md: 16 }} pt={{ base: 5, md: 10 }} bg="gray.50" px={4}>
        <Container maxW="container.lg">
          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="300"
            color="#1D1D1F"
            letterSpacing="tight"
            textAlign="center"
            mb={8}
          >
            Our Mission
          </Heading>

          <Box
            bg="white"
            p={{ base: 6, md: 10 }}
            borderRadius="2xl"
            boxShadow="sm"
            border="1px solid"
            borderColor="gray.100"
            mb={{ base: 12, md: 24 }}
          >
            <Text fontSize={{ base: "md", md: "lg" }} color="#1D1D1F" fontWeight="300" lineHeight="tall" mb={6}>
              At Hushh Technologies LLC, our mission is to democratize access to sophisticated investment strategies by leveraging cutting-edge
              artificial intelligence and advanced mathematical models. We are committed to generating consistent, risk-adjusted returns while
              maintaining the highest standards of transparency and ethical conduct.
            </Text>

            <Text fontSize={{ base: "md", md: "lg" }} color="#1D1D1F" fontWeight="300" lineHeight="tall">
              We believe that through the power of data science and machine learning, we can unlock investment opportunities that were previously
              available only to institutional investors, making them accessible to individual investors and smaller institutions alike.
            </Text>
          </Box>

          {/* Unique Approach Section */}
          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="300"
            color="#1D1D1F"
            letterSpacing="tight"
            textAlign="center"
            mb={8}
          >
            Unique Approach to Investment Management
          </Heading>

          <Text fontSize={{ base: "md", md: "lg" }} mb={8} color="#1D1D1F" fontWeight="300">
            At <Text as="span" fontWeight="500">Hushh Technologies</Text>, we combine the art of investment with the science of technology:
          </Text>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={16}>
            {[
              { title: "Differentiation in Investment Approach", desc: "Unlike traditional funds that rely on speculative returns, Hushh combines high-frequency options income with disciplined, data-driven long-term growth. We prioritize stability, focusing on high-FCF SPX10 companies." },
              { title: "Math-Driven Decision Making", desc: "Every strategy is informed by rigorous quantitative analysis, ensuring precision and accuracy in our investment decisions." },
              { title: "AI-Powered Insights", desc: "Leveraging the latest advancements in machine learning, we identify market inefficiencies and capitalize on opportunities in real-time." },
              { title: "Transparency You Can Trust", desc: "Clear communication and a human-centric approach to wealth creation ensures you always understand our strategies and performance." }
            ].map((item, idx) => (
              <Box key={idx} bg="white" p={8} borderRadius="2xl" border="1px solid" borderColor="gray.100">
                <Heading as="h3" fontSize="xl" color="#1D1D1F" mb={4} fontWeight="500">
                  {item.title}
                </Heading>
                <Text color="#1D1D1F" fontWeight="300" lineHeight="relaxed">
                  {item.desc}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Leadership Team Section */}
      <Box py={{ base: 12, md: 20 }} px={4}>
        <Container maxW="container.lg">
          <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }} fontWeight="300" color="#1D1D1F" letterSpacing="tight" textAlign="center" mb={4}>
            Our Leadership Team
          </Heading>

          <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" maxW="3xl" mx="auto" textAlign="center" mb={16}>
            At Hushh Technologies LLC, our leadership team combines expertise in technology, finance, and strategy to redefine wealth creation.
          </Text>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            {/* Manish Sainani */}
            <Box bg="white" p={8} borderRadius="2xl" border="1px solid" borderColor="gray.100" textAlign="center" transition="transform 0.3s ease" _hover={{ transform: "translateY(-4px)", shadow: "md" }}>
              <Box w="140px" h="140px" borderRadius="full" overflow="hidden" mx="auto" mb={6} border="3px solid #0891B2">
                <Image src={img} alt="Manish Sainani" w="full" h="full" objectFit="cover" />
              </Box>
              <Heading as="h3" fontSize="2xl" mb={2} fontWeight="400">
                Manish <Text as="span" color="#0891B2" fontWeight="600">Sainani</Text>
              </Heading>
              <Text color="#0891B2" fontWeight="500" fontSize="sm" textTransform="uppercase" letterSpacing="wider" mb={4}>
                Founder & CEO
              </Text>
              <Text color="#1D1D1F" fontWeight="300" lineHeight="relaxed">
                With over a decade of leadership at Google, Microsoft, and Splunk, Manish brings unmatched expertise in AI, machine learning, and data-driven innovation. His vision drives Hushh's mission to empower investors with sustainable, technology-powered wealth strategies.
              </Text>
            </Box>

            {/* Justin Donaldson */}
            <Box bg="white" p={8} borderRadius="2xl" border="1px solid" borderColor="gray.100" textAlign="center" transition="transform 0.3s ease" _hover={{ transform: "translateY(-4px)", shadow: "md" }}>
              <Box w="140px" h="140px" borderRadius="full" overflow="hidden" mx="auto" mb={6} border="3px solid #0891B2">
                <Image src={img2} alt="Justin Donaldson" w="full" h="full" objectFit="cover" />
              </Box>
              <Heading as="h3" fontSize="2xl" mb={2} fontWeight="400">
                Justin <Text as="span" color="#0891B2" fontWeight="600">Donaldson</Text>
              </Heading>
              <Text color="#0891B2" fontWeight="500" fontSize="sm" textTransform="uppercase" letterSpacing="wider" mb={4}>
                Chief Scientist
              </Text>
              <Text color="#1D1D1F" fontWeight="300" lineHeight="relaxed">
                Justin leads Hushh's scientific and strategic investment approaches. As the architect behind proprietary options strategies like "Sell the Wall," he uses advanced quantitative models to deliver consistent, risk-optimized returns.
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Investment Philosophy Section */}
      <Box py={{ base: 12, md: 20 }} bg="gray.50" px={4}>
        <Container maxW="container.lg">
          <SimpleGrid columns={1} spacing={6}>
            {[
              { icon: Banknote, title: "Focus on Free Cash Flow", desc: "We prioritize companies with strong, predictable free cash flow generation and healthy fundamentals. These are the engines of sustainable returns and perpetual income." },
              { icon: Building2, title: "Long-Term Ownership", desc: `"We do not gamble on companies. We own the best businesses on the planet." Our approach is to take significant ownership stakes and hold them to compound value over decades.` },
              { icon: Zap, title: "AI-Driven Alpha & Systematic Risk Management", desc: "We leverage proprietary algorithms, advanced mathematics, and AI to continuously extract alpha across internal, value-maximizing strategies — every second, every day." },
              { icon: BrainCircuit, title: "Human Expertise x AI Synergy", desc: "We believe in the power of human brains and beings to work well together with machines and AI systems. AI provides speed and scale; human insight provides strategic oversight." },
              { icon: TrendingUp, title: "Modern Infrastructure, Enhanced Value", desc: "By building on cutting-edge automation and analytics from day one, we operate with efficiency, aiming to deliver superior risk-adjusted returns by moving beyond outdated models." }
            ].map((item, idx) => (
              <Box key={idx} bg="white" p={{ base: 8, md: 10 }} borderRadius="2xl" border="1px solid" borderColor="gray.100" transition="all 0.3s" _hover={{ shadow: "sm", borderColor: "gray.200" }}>
                <Flex alignItems="flex-start" gap={6} direction={{ base: "column", sm: "row" }}>
                  <Box p={3} bg="blue.50" borderRadius="xl" color="#0891B2">
                    <item.icon size={28} strokeWidth={1.5} />
                  </Box>
                  <Box flex="1">
                    <Heading as="h3" fontSize={{ base: "xl", md: "2xl" }} fontWeight="500" color="#1D1D1F" mb={4}>
                      {item.title}
                    </Heading>
                    <Text fontSize="lg" color="#6E6E73" fontWeight="300" lineHeight="relaxed">
                      {item.desc}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Join Us Section */}
      <Box bg="white" py={{ base: 16, md: 24 }} px={4} textAlign="center">
        <Container maxW="container.md">
          <Heading as="h2" fontSize={{ base: "3xl", md: "5xl" }} fontWeight="300" letterSpacing="tight" color="#1D1D1F" mb={6}>
            Join <Text as="span" color="#0891B2">Us</Text>
          </Heading>

          <Text fontSize={{ base: "lg", md: "xl" }} color="#6E6E73" fontWeight="300" lineHeight="relaxed" mb={10}>
            Whether you're an individual or an institution, Hushh Technologies LLC invites you to join us on our journey
            to transform investment strategies through innovative technology and ethical practices.
          </Text>

          <Flex justifyContent="center" gap={4} flexDirection={{ base: "column", sm: "row" }}>
            <Button
              as={Link}
              to="/contact"
              size="lg"
              bgGradient="linear(to-r, #00A9E0, #6DD3EF)"
              color="white"
              borderRadius="full"
              px={12}
              fontWeight="500"
              _hover={{ bgGradient: "linear(to-r, #0098C9, #5CC2DE)", transform: "scale(1.02)" }}
              _active={{ transform: "scale(0.98)" }}
            >
              Contact Us
            </Button>

            <Button
              as={Link}
              to="/signUp"
              size="lg"
              variant="outline"
              borderColor="#0891B2"
              color="#0891B2"
              borderRadius="full"
              px={12}
              fontWeight="500"
              _hover={{ bg: "blue.50", transform: "scale(1.02)" }}
              _active={{ transform: "scale(0.98)" }}
            >
              Sign Up Now
            </Button>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}