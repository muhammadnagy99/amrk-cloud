// applePayService.ts - Separate module for Apple Pay integration

/**
 * Configuration for Apple Pay
 */
export interface ApplePayConfig {
    merchantId?: string;
    merchantName: string;
    countryCode: string;
    currencyCode: string;
    supportedNetworks: string[];
    merchantCapabilities: string[];
    validateMerchantUrl: string;
    processPaymentUrl: string;
  }
  
  /**
   * Payment success result
   */
  export interface PaymentSuccessResult {
    orderId?: string;
    transactionId?: string;
    [key: string]: any;
  }
  
  /**
   * Payment callbacks
   */
  export interface PaymentCallbacks {
    onSuccess?: (result: PaymentSuccessResult) => void;
    onError?: (error: string) => void;
    onCancel?: () => void;
    onValidationStart?: () => void;
    onProcessingStart?: () => void;
  }
  
  /**
   * Apple Pay line item
   */
  export interface ApplePayLineItem {
    label: string;
    amount: string;
  }
  
  /**
   * Default configuration for Apple Pay
   */
  const DEFAULT_CONFIG: ApplePayConfig = {
    merchantName: 'Amrk',
    countryCode: 'US',
    currencyCode: 'USD',
    supportedNetworks: ['visa', 'masterCard', 'amex', 'discover', 'mada'],
    merchantCapabilities: ['supports3DS'],
    validateMerchantUrl: 'https://api.amrk.app/payments/paySessionTelrRequest',
    processPaymentUrl: 'https://api.amrk.app/payments/applePayTelr'
  };
  
  /**
   * Check if Apple Pay is available on the device
   * @returns {boolean} Whether Apple Pay is available
   */
  export function checkApplePayAvailability(): boolean {
    if (typeof window !== 'undefined' && window.ApplePaySession) {
      if (window.ApplePaySession.canMakePayments()) {
        return true;
      }
    }
    return false;
  }
  
  /**
   * Load Apple Pay SDK dynamically
   * @returns {Promise<void>}
   */
  export async function loadApplePaySDK(): Promise<void> {
    // Skip if window is not defined (for SSR)
    if (typeof window === 'undefined') return;
    
    // Skip if already loaded
    if (document.getElementById('apple-pay-sdk')) return;
    
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.id = 'apple-pay-sdk';
      script.crossOrigin = 'anonymous';
      script.src = 'https://applepay.cdn-apple.com/jsapi/1.latest/apple-pay-sdk.js';
      
      script.onload = () => resolve();
      script.onerror = (error) => reject(error);
      document.head.appendChild(script);
    });
  }
  
  /**
   * Initialize Apple Pay
   * @param {Partial<ApplePayConfig>} customConfig - Optional custom configuration
   * @returns {ApplePayConfig} The active configuration
   */
  export function initializeApplePay(customConfig: Partial<ApplePayConfig> = {}): ApplePayConfig {
    return { ...DEFAULT_CONFIG, ...customConfig };
  }
  
  /**
   * Create payment request object
   * @param {ApplePayConfig} config - Apple Pay configuration
   * @param {number} amount - Payment amount
   * @param {ApplePayLineItem[]} items - Line items (optional)
   * @returns {Object} Apple Pay payment request
   */
  function createPaymentRequest(config: ApplePayConfig, amount: number, items: ApplePayLineItem[] = []): any {
    // Default line item if none provided
    const lineItems = items.length ? items : [{
      label: 'Total',
      amount: amount.toString()
    }];
  
    return {
      countryCode: config.countryCode,
      currencyCode: config.currencyCode,
      supportedNetworks: config.supportedNetworks,
      merchantCapabilities: config.merchantCapabilities,
      total: {
        label: config.merchantName,
        amount: amount.toString()
      },
      lineItems: lineItems,
      requiredBillingContactFields: ['postalAddress', 'name', 'email']
    };
  }
  
  /**
   * Process Apple Pay payment
   * @param {number} amount - Payment amount
   * @param {string} authToken - Authentication token
   * @param {Partial<ApplePayConfig>} customConfig - Optional custom configuration
   * @param {PaymentCallbacks} callbacks - Payment callbacks
   * @param {ApplePayLineItem[]} items - Line items (optional)
   */
  export function processApplePayment(
    amount: number,
    authToken: string,
    customConfig: Partial<ApplePayConfig> = {},
    callbacks: PaymentCallbacks = {},
    items: ApplePayLineItem[] = []
  ): void {
    // Skip if Apple Pay is not available
    if (!checkApplePayAvailability()) {
      if (callbacks.onError) callbacks.onError('Apple Pay is not available on this device');
      return;
    }
  
    // Apply custom configuration
    const config = initializeApplePay(customConfig);
    
    // Create payment request
    const paymentRequest = createPaymentRequest(config, amount, items);
    
    // Create Apple Pay session
    const session = new window.ApplePaySession(3, paymentRequest);
  
    // Handle merchant validation
    session.onvalidatemerchant = (event: any) => {
      if (callbacks.onValidationStart) callbacks.onValidationStart();
      console.log('Validating merchant with URL:', event.validationURL);
      
      // Prepare API request
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
      
      // Call the merchant validation API
      fetch(config.validateMerchantUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          "initivContext": "web",
          "displayName": config.merchantName      
          })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Merchant validation failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then(response => {
        console.log('Merchant session received');
        session.completeMerchantValidation(response.merchantSessionIdentifier);
      })
      .catch(error => {
        console.error('Error validating merchant:', error);
        session.abort();
        if (callbacks.onError) callbacks.onError('Merchant validation failed');
      });
    };
  
    // Handle payment authorization
    session.onpaymentauthorized = (event: any) => {
      if (callbacks.onProcessingStart) callbacks.onProcessingStart();
      console.log('Payment authorized, processing payment data');
      
      const payment = event.payment;
      
      // Prepare API request
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
      
      // Extract payment token data
      const paymentData = payment.token.paymentData;
      const paymentMethod = payment.token.paymentMethod;
      
      // Process payment with backend API
      fetch(config.processPaymentUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          "appleData": paymentData.data,
          "appSig": paymentData.signature,
          "paySessId": sessionStorage.getItem('paySessId') || '',
          "appTransId": payment.token.transactionIdentifier,
          "appPubKey": paymentMethod.publicKeyHash,
          "appPubHash": paymentData.header.publicKeyHash,
          "appDisNam": paymentMethod.displayName,
          "appNet": paymentMethod.network,
          "appType": paymentMethod.type,
          "appEncVers": paymentData.version,
          "isMobile": /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Payment processing failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        if (result.status === 'success' || result.success === true) {
          session.completePayment(window.ApplePaySession.STATUS_SUCCESS);
          console.log('Payment completed successfully!');
          if (callbacks.onSuccess) callbacks.onSuccess(result);
        } else {
          session.completePayment(window.ApplePaySession.STATUS_FAILURE);
          console.error('Payment processing failed:', result.error || result.message);
          if (callbacks.onError) callbacks.onError(result.error || result.message || 'Payment failed');
        }
      })
      .catch(error => {
        console.error('Error processing payment:', error);
        session.completePayment(window.ApplePaySession.STATUS_FAILURE);
        if (callbacks.onError) callbacks.onError('Payment processing error');
      });
    };
  
    // Handle cancellation
    session.oncancel = () => {
      console.log('Apple Pay session was canceled');
      if (callbacks.onCancel) callbacks.onCancel();
    };
  
    // Begin the Apple Pay session
    session.begin();
  }
  
  /**
   * Create a React hook for Apple Pay integration
   */
  export function useApplePay() {
    return {
      isAvailable: checkApplePayAvailability(),
      loadSDK: loadApplePaySDK,
      processPayment: processApplePayment,
      initialize: initializeApplePay
    };
  }
  
  // Type definitions for Apple Pay in global scope
  declare global {
    interface Window {
      ApplePaySession?: any;
    }
  }
  
  export default {
    checkApplePayAvailability,
    loadApplePaySDK,
    initializeApplePay,
    processApplePayment,
    useApplePay
  };