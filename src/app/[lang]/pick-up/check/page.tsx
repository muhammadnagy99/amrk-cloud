// app/example/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useIframeListener } from '../../../../hooks/useFrame';

export default function ExamplePage() {
    const { status, isReceived } = useIframeListener();


    return (
        <div className='flex flex-col'>
            <div className='h-8'>
                <p>
                    this is the status:  {status}
                </p>
            </div>

            <div className="iframe-wrapper">
                <iframe
                    src={'/pick-up/try'}
                    className="embedded-iframe"
                />
            </div>
        </div>
    );
}
