import { useEffect, useState, useCallback } from "react";
import { Spinner, Box, Text, Button, useToast, Center } from "@chakra-ui/react";
import NDARequestModal from "./NDARequestModal";
import NDADocumentModal from "./NDADocumentModal";
import {
  acceptNda,
  checkAccessStatus,
  getNdaMetadata,
} from "../services/access/accessControlApi";

// Placeholder for the community page component
const CommunityPage: React.FC = () => {
  return (
    <Box p={4}>
      <h1>Welcome to the Community</h1>
    </Box>
  );
};

interface AccessControlManagerProps {
  session: any;
}

const AccessControlManager: React.FC<AccessControlManagerProps> = ({ session }) => {
  const [accessStatus, setAccessStatus] = useState<string | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isNdaModalOpen, setIsNdaModalOpen] = useState(false);
  const [ndaMetadata, setNdaMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // DRY: Extracted NDA fetch logic since it's used in two places
  const fetchAndOpenNdaModal = useCallback(async () => {
    try {
      const ndaResponse = await getNdaMetadata(session.access_token);
      if (ndaResponse.status === "success") {
        setNdaMetadata(ndaResponse.metadata);
        setIsNdaModalOpen(true);
      } else {
        toast({
          title: "Error",
          description: ndaResponse.message || "Error fetching NDA metadata.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      console.error("Error fetching NDA metadata:", error);
      toast({
        title: "Error",
        description: error.response?.data || "Error fetching NDA metadata.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }, [session.access_token, toast]);

  useEffect(() => {
    const loadAccessStatus = async () => {
      setLoading(true);
      try {
        const res = await checkAccessStatus(session.access_token);
        console.log("Access Status:", res);
        setAccessStatus(res);

        if (res === "Not Applied") {
          setIsRequestModalOpen(true);
        } else if (res === "Pending: Waiting for NDA Process") {
          await fetchAndOpenNdaModal();
        } else if (res === "Rejected") {
          toast({
            title: "Request Rejected",
            description: "Your request was rejected. Please re-apply after 2-3 days.",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        } else if (res === "Pending") {
          toast({
            title: "Request Pending",
            description: "Your request is under review.",
            status: "info",
            duration: 4000,
            isClosable: true,
          });
        }
      } catch (error: any) {
        console.error("Error checking access status:", error);
        toast({
          title: "Error",
          description: error.response?.data || "Error checking access status.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } finally {
        setLoading(false); // Use finally to ensure loading always stops
      }
    };

    loadAccessStatus();
  }, [session, toast, fetchAndOpenNdaModal]);

  const handleRequestSubmit = async (result: string) => {
    setAccessStatus(result);
    setIsRequestModalOpen(false); // Fix: Ensure the first modal closes

    if (result === "Pending: Waiting for NDA Process") {
      await fetchAndOpenNdaModal();
    }
  };

  const handleNdaAccept = async () => {
    try {
      const response = await acceptNda(session.access_token);
      console.log("Accept NDA Response:", response);
      if (response === "Approved") {
        toast({
          title: "NDA Accepted",
          description: "Your NDA has been accepted. Welcome to the community!",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        setAccessStatus("Approved");
        setIsNdaModalOpen(false);
      }
    } catch (error: any) {
      console.error("Error accepting NDA:", error);
      // Fix: Uncommented error handling so API failures don't fail silently
      toast({
        title: "Error",
        description: error.response?.data || "Could not accept NDA.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (accessStatus === "Approved") {
    return <CommunityPage />;
  }

  // Fix: Provide a fallback UI so the screen is never completely blank
  // if modals are closed or the user is in a pending/rejected state.
  return (
    <Box p={8} textAlign="center">
      {accessStatus === "Not Applied" && !isRequestModalOpen && (
        <Button colorScheme="blue" onClick={() => setIsRequestModalOpen(true)}>
          Request Community Access
        </Button>
      )}

      {accessStatus === "Pending: Waiting for NDA Process" && !isNdaModalOpen && (
        <Button colorScheme="blue" onClick={() => setIsNdaModalOpen(true)}>
          Review & Sign NDA
        </Button>
      )}

      {accessStatus === "Pending" && (
        <Text fontSize="lg" fontWeight="medium">
          Your access request is currently under review by our team.
        </Text>
      )}

      {accessStatus === "Rejected" && (
        <Text fontSize="lg" color="red.500" fontWeight="medium">
          Your request was rejected. Please try re-applying in a few days.
        </Text>
      )}

      {/* Modals */}
      <NDARequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        session={session}
        onSubmit={handleRequestSubmit}
      />

      <NDADocumentModal
        session={session}
        isOpen={isNdaModalOpen}
        onClose={() => setIsNdaModalOpen(false)}
        ndaMetadata={ndaMetadata}
        onAccept={handleNdaAccept}
      />
    </Box>
  );
};

export default AccessControlManager;