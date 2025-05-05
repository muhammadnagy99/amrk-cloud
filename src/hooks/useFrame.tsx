// hooks/useIframeListener.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

// Types for the iframe message
interface IframeStatusMessage {
  type: 'IFRAME_PARAMS';
  status: string;
}

interface UseIframeListenerOptions {
  onStatusChange?: (status: string) => void;
}

interface UseIframeListenerResult {
  status: string | null;
  isReceived: boolean;
}

/**
 * Hook for parent components to listen to status messages from an iframe
 */
export function useIframeListener({
  onStatusChange
}: UseIframeListenerOptions = {}): UseIframeListenerResult {
  const [status, setStatus] = useState<string | null>(null);
  const [isReceived, setIsReceived] = useState<boolean>(false);

  // Type guard to verify the message format
  const isIframeStatusMessage = useCallback((data: any): data is IframeStatusMessage => {
    return (
      data &&
      typeof data === 'object' &&
      'type' in data &&
      data.type === 'IFRAME_PARAMS' &&
      'status' in data &&
      typeof data.status === 'string'
    );
  }, []);

  // Handle messages from the iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent): void => {
      console.log('Message received:', event.data);
      
      // Verify the message format
      if (isIframeStatusMessage(event.data)) {
        const receivedStatus = event.data.status;
        console.log('Valid status received:', receivedStatus);
        
        // Update internal state
        setStatus(receivedStatus);
        setIsReceived(true);
        
        // Call the callback if provided
        if (onStatusChange) {
          onStatusChange(receivedStatus);
        }
      }
    };

    // Add the event listener
    window.addEventListener('message', handleMessage);
    
    // Cleanup
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [isIframeStatusMessage, onStatusChange]);

  return {
    status,
    isReceived
  };
}