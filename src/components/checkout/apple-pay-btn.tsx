'use client'
import React, { useEffect, useRef } from 'react';

type ApplePayButtonProps = {
  buttonStyle?: 'black' | 'white' | 'white-outline';
  buttonType?: 'pay' | 'buy' | 'donate' | 'checkout' | 'book' | 'subscribe';
  locale?: string;
  onClick?: () => void;
  className?: string;
};

/**
 * ApplePayButton component that handles TypeScript correctly
 * by using a ref and directly creating the element
 */
export const ApplePayButton: React.FC<ApplePayButtonProps> = ({
  buttonStyle = 'black',
  buttonType = 'pay',
  locale = 'en-US',
  onClick,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear any existing content
    containerRef.current.innerHTML = '';
    
    try {
      // Check if Apple Pay is supported
      if (1) {
        // Method 1: Create the element using -webkit-appearance
        const applePayBtn = document.createElement('apple-pay-button');
        applePayBtn.className = `apple-pay-button ${className}`;
        applePayBtn.setAttribute('style', `
          -webkit-appearance: -apple-pay-button;
          -apple-pay-button-type: ${buttonType};
          -apple-pay-button-style: ${buttonStyle};
          width: 100%;
          height: 100%;
          cursor: pointer;
        `);
        
        // Add click handler
        if (onClick) {
          applePayBtn.addEventListener('click', onClick);
        }
        
        // Append to container
        containerRef.current.appendChild(applePayBtn);
      } 
      // Fallback if native Apple Pay button not supported or available
      else {
        console.log('Apple Pay is not available');
        // You can render a fallback button here if needed
      }
    } catch (error) {
      console.error('Error creating Apple Pay button:', error);
    }
    
    // Cleanup function
    return () => {
      const btn = containerRef.current?.querySelector('.apple-pay-button');
      if (btn && onClick) {
        btn.removeEventListener('click', onClick);
      }
    };
  }, [buttonStyle, buttonType, locale, onClick, className]);

  return (
    <div 
      ref={containerRef} 
      className={`apple-pay-container ${className}`}
      style={{ minHeight: '48px', width: '100%' }}
    />
  );
};
