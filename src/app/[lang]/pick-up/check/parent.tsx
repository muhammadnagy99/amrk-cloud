// components/ParentWithListener.tsx
'use client';

import React, { useRef, useState } from 'react';
import { useIframeListener } from '../../../../hooks/useFrame';

interface ParentWithListenerProps {
  iframeUrl: string;
  onStatusChange?: (status: string) => void;
  className?: string;
  iframeTitle?: string;
}

export default function ParentWithListener({
  iframeUrl,
  onStatusChange,
  className = '',
  iframeTitle = 'Parameter Receiver'
}: ParentWithListenerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  
  // Use the listener hook to receive messages from the iframe
  const { status, isReceived } = useIframeListener({
    onStatusChange
  });

  // Handle iframe load event
  const handleIframeLoad = () => {
    setIsIframeLoaded(true);
    console.log('Iframe loaded and ready to communicate');
  };

  return (
    <div className={`parent-container ${className}`}>
      {/* Iframe container */}
      <div className="iframe-wrapper">
        <iframe 
          ref={iframeRef}
          src={iframeUrl}
          title={iframeTitle}
          className="embedded-iframe"
          onLoad={handleIframeLoad}
        />
      </div>
      
      {/* Status indicator (you can make this hidden in production) */}
      <div className="status-indicator">
        <div className="indicator-dot" data-status={status || 'none'}>
          {isReceived ? '●' : '○'}
        </div>
        <div className="status-text">
          {isReceived 
            ? `Status received: ${status}` 
            : (isIframeLoaded ? 'Waiting for status...' : 'Loading iframe...')}
        </div>
      </div>
      
      <style jsx>{`
        .parent-container {
          position: relative;
        }
        .iframe-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
        }
        .embedded-iframe {
          width: 100%;
          height: 500px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
        }
        .status-indicator {
          position: absolute;
          top: 10px;
          right: 10px;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.9);
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 12px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .indicator-dot {
          margin-right: 5px;
          font-size: 16px;
        }
        .indicator-dot[data-status="true"] {
          color: #4caf50;
        }
        .indicator-dot[data-status="false"] {
          color: #f44336;
        }
        .indicator-dot[data-status="pending"] {
          color: #ff9800;
        }
        .indicator-dot[data-status="none"] {
          color: #9e9e9e;
        }
        .status-text {
          color: #333;
        }
      `}</style>
    </div>
  );
}