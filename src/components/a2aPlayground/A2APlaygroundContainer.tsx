'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  VStack
} from '@chakra-ui/react';
import A2AScenarioSetupScreen from './A2AScenarioSetupScreen';
import A2AConversationScreen from './A2AConversationScreen';
import A2AResultSummaryScreen from './A2AResultSummaryScreen';
import { generateA2AConversation } from './conversationGenerator';
import type {
  A2APlaygroundState,
  A2AScenarioConfig,
  ConversationMessage,
  A2APlaygroundContainerProps,
} from '../../types/a2aPlayground';

/**
 * A2APlaygroundContainer
 * * State machine managing the 3-screen A2A Playground flow:
 * 1. SETUP - Scenario configuration
 * 2. CONVERSATION - Real-time agent interaction
 * 3. RESULT - Final KYC decision and summary
 */
const A2APlaygroundContainer: React.FC<A2APlaygroundContainerProps> = () => {
  // Main State Object
  const [state, setState] = useState<A2APlaygroundState>({
    step: 'SETUP',
    config: null,
    messages: [],
    isRunning: false,
    result: null,
    error: null,
  });

  // Ref to handle cancellations and prevent memory leaks
  const abortRef = useRef<boolean>(false);

  // Cleanup: Ensure background processes stop if component unmounts
  useEffect(() => {
    return () => {
      abortRef.current = true;
    };
  }, []);

  /**
   * Handle Scenario Execution
   * Transitions from SETUP to CONVERSATION
   */
  const handleRunScenario = useCallback(async (config: A2AScenarioConfig) => {
    abortRef.current = false;

    setState({
      step: 'CONVERSATION',
      config,
      messages: [],
      isRunning: true,
      result: null,
      error: null,
    });

    try {
      // Execute the generator logic
      const { result } = await generateA2AConversation(
        config,
        (message: ConversationMessage) => {
          if (abortRef.current) return;
          // Use functional update to ensure message array integrity
          setState((prev) => ({
            ...prev,
            messages: [...prev.messages, message],
          }));
        },
        () => abortRef.current
      );

      // Finalize simulation state
      if (!abortRef.current) {
        setState((prev) => ({
          ...prev,
          isRunning: false,
          result,
        }));
      }
    } catch (error) {
      if (abortRef.current) return;

      console.error('A2A simulation error:', error);
      setState((prev) => ({
        ...prev,
        isRunning: false,
        error: error instanceof Error ? error.message : 'An unexpected simulation error occurred.',
      }));
    }
  }, []);

  /**
   * Navigation Handlers
   */
  const handleViewResult = useCallback(() => {
    setState((prev) => ({ ...prev, step: 'RESULT' }));
  }, []);

  const handleViewConversation = useCallback(() => {
    setState((prev) => ({ ...prev, step: 'CONVERSATION' }));
  }, []);

  const handleRunAnother = useCallback(() => {
    abortRef.current = true; // Stop any ongoing simulation
    setState({
      step: 'SETUP',
      config: null,
      messages: [],
      isRunning: false,
      result: null,
      error: null,
    });
  }, []);

  /**
   * Screen Selection Logic
   */
  const renderScreen = () => {
    // Priority 1: Error Display
    if (state.error) {
      return (
        <VStack h="100vh" justify="center" p={8}>
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            borderRadius="xl"
            maxW="md"
            py={10}
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Simulation Failed
            </AlertTitle>
            <AlertDescription fontSize="sm">
              {state.error}
            </AlertDescription>
            <Button
              mt={6}
              colorScheme="red"
              variant="solid"
              onClick={handleRunAnother}
            >
              Restart Simulation
            </Button>
          </Alert>
        </VStack>
      );
    }

    // Priority 2: State Machine Steps
    switch (state.step) {
      case 'SETUP':
        return (
          <A2AScenarioSetupScreen
            onRunScenario={handleRunScenario}
          />
        );

      case 'CONVERSATION':
        if (!state.config) return null;
        return (
          <A2AConversationScreen
            config={state.config}
            messages={state.messages}
            isRunning={state.isRunning}
            result={state.result}
            onViewResult={handleViewResult}
          />
        );

      case 'RESULT':
        if (!state.config || !state.result) return null;
        return (
          <A2AResultSummaryScreen
            config={state.config}
            result={state.result}
            messages={state.messages}
            onRunAnother={handleRunAnother}
            onViewConversation={handleViewConversation}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Box minH="100vh" bg="white">
      {renderScreen()}
    </Box>
  );
};

export default A2APlaygroundContainer;