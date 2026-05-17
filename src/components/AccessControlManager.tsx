// AccessControlManager.tsx
import React, { useEffect, useState, useCallback } from "react";
import { Spinner, Box, useToast, Center, Heading } from "@chakra-ui/react";
import NDARequestModal from "./NDARequestModal";
import NDADocumentModal from "./NDADocumentModal";
import {
  acceptNda,
  checkAccessStatus,
  getNdaMetadata,
} from "../services/access/accessControlApi";

// 1. Defined strict typings instead of using "any"
interface UserSession {
  access_token: string;
  user?: {
    id: string;
    email: string;
  };
}

interface NdaDocumentMetadata {
  documentId: string;
  title: string;
  version: string;
  [key: string]: unknown; // Gracefully handle additional metadata fields
}

type AccessStatus = 
  | "Not Applied" 
  | "Pending: Waiting for NDA Process" 
  | "Pending" 
  | "Approved" 
  | "Rejected";

const CommunityPage: React.FC = () => {
  return (
    <Box p={6}>
      <Heading as="h1" size="xl" mb={4}>Welcome to the Community</Heading>
    </Box>
  );
};

interface AccessControlManagerProps {
  session: UserSession;
}

const AccessControlManager: React.FC<AccessControlManagerProps> = ({ session }) => {
  const [accessStatus, setAccessStatus] = useState<AccessStatus | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState<boolean>(false);
  const [isNdaModalOpen, setIsNdaModalOpen] = useState<boolean>(false);
  const [ndaMetadata, setNdaMetadata] = useState<NdaDocumentMetadata | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  /**
   * 2. Isolated Reusable NDA Metadata Fetcher
   * Wrapped in useCallback to prevent infinite reference re-evaluation in useEffect deps
   */
  const handleFetchNdaMetadata = useCallback(async (token: string): Promise<boolean> => {
    try {
      const ndaResponse = await getNdaMetadata(token);
      if (ndaResponse.status === "success") {
        setNdaMetadata(ndaResponse.metadata);
        setIsNdaModalOpen(true);
        return true;
      }
      
      toast({
        title: "NDA Fetch Failed",
        description: ndaResponse.message || "Failed to retrieve configuration metadata.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return false;
    } catch (error: unknown) {
      console.error("[AccessControl] Error fetching NDA metadata:", error);
      toast({
        title: "Server Connection Error",
        description: "Could not load required documentation records.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return false;
    }
  }, [toast]);

  // 3. Centralized lifecycle state evaluation setup
  useEffect(() => {
    const evaluateGatewayAuthorization = async () => {
      if (!session?.access_token) return;

      setLoading(true);
      try {
        const res = await checkAccessStatus(session.access_token) as AccessStatus;
        console.log("[AccessControl] Gateway verified current status:", res);
        setAccessStatus(res);

        switch (res) {
          case "Not Applied":
            setIsRequestModalOpen(true);
            break;

          case "Pending: Waiting for NDA Process":
            await handleFetchNdaMetadata(session.access_token);
            break;

          case "Rejected":
            toast({
              title: "Verification Request Rejected",
              description: "Your access application was not approved. Please contact support or re-apply later.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
            break;

          case "Pending":
            toast({
              title: "Application Review Pending",
              description: "Your request is securely undergoing manual compliance validation by our team.",
              status: "info",
              duration: 5000,
              isClosable: true,
            });
            break;

          default:
            break;
        }
      } catch (error: unknown) {
        console.error("[AccessControl] Critical error checking validation status:", error);
        toast({
          title: "Authorization Failure",
          description: "An unexpected system error occurred during entry token verification.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    evaluateGatewayAuthorization();
  }, [session, toast, handleFetchNdaMetadata]);

  // Triggered when form submission shifts state parameters
  const handleRequestSubmit = async (result: string) => {
    const nextStatus = result as AccessStatus;
    setAccessStatus(nextStatus);
    setIsRequestModalOpen(false);

    if (nextStatus === "Pending: Waiting for NDA Process") {
      await handleFetchNdaMetadata(session.access_token);
    }
  };

  // Process legal document contract signature
  const handleNdaAccept = async () => {
    try {
      const response = await acceptNda(session.access_token);
      console.log("[AccessControl] Legal signature pipeline processing response:", response);
      
      if (response === "Approved") {
        toast({
          title: "NDA Executed Successfully",
          description: "Digital verification complete. Welcome to the Hushh workspace community network!",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        setAccessStatus("Approved");
        setIsNdaModalOpen(false);
      }
    } catch (error: unknown) {
      console.error("[AccessControl] Critical validation issue accepting document signature:", error);
      toast({
        title: "Signature Rejected",
        description: "Failed to cleanly commit signature packet token parameters to repository ledger.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
      </Center>
    );
  }

  if (accessStatus === "Approved") {
    return <CommunityPage />;
  }

  return (
    <>
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
    </>
  );
};

export default AccessControlManager;