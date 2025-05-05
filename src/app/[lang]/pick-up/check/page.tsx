// app/params/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface ParamObject {
  [key: string]: string;
}

interface MessagePayload {
  type: string;
  params: ParamObject;
}

export default function ParamsPage() {
  const searchParams = useSearchParams();
  const [params, setParams] = useState<ParamObject>({});
  const [messagesSent, setMessagesSent] = useState<number>(0);

  useEffect(() => {
    // Convert searchParams to a regular object
    const paramObject: ParamObject = {};
    searchParams.forEach((value, key) => {
      paramObject[key] = value;
    });
    
    setParams(paramObject);
    
    // Send message to parent with all query parameters
    if (window.parent && window.parent !== window) {
      try {
        const payload: MessagePayload = {
          type: 'IFRAME_PARAMS',
          params: paramObject
        };
        
        window.parent.postMessage(payload, '*');
        setMessagesSent(prev => prev + 1);
      } catch (error) {
        console.error('Error sending message to parent:', error);
      }
    }
  }, [searchParams]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <title>Parameter Receiver</title>
      
      <h1>URL Parameter Receiver</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Status:</h2>
        {messagesSent > 0 ? (
          <p style={{ color: 'green' }}>✓ Parameters sent to parent window</p>
        ) : (
          <p style={{ color: 'gray' }}>Waiting to send parameters...</p>
        )}
      </div>
      
      <div>
        <h2>Received Parameters:</h2>
        {Object.keys(params).length > 0 ? (
          <ul>
            {Object.entries(params).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {String(value)}
              </li>
            ))}
          </ul>
        ) : (
          <p>No parameters found in URL</p>
        )}
      </div>
    </div>
  );
}