// app/pick-up/params/[slug]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface MessagePayload {
  type: string;
  status: string;  
}

export default function ParamsPage() {
  const params = useParams();
  const [statusValue, setStatusValue] = useState<string>('');
  const [messagesSent, setMessagesSent] = useState<number>(0);

  useEffect(() => {
    if (!params || !params.slug) return;
    
    const status = params.slug as string;
    console.log('Status value from URL:', status);
    setStatusValue(status);
  
    if (window.parent && window.parent !== window) {
      try {
        const payload: MessagePayload = {
          type: 'IFRAME_PARAMS',
          status: status
        };
        
        window.parent.postMessage(payload, '*');
        setMessagesSent(prev => prev + 1);
      } catch (error) {
        console.error('Error sending message to parent:', error);
      }
    }
  }, [params]);

  return (
    <div>
    </div>
  );
}