// apple-pay.d.ts - Type definitions for Apple Pay JS API

interface ApplePayPaymentRequest {
    countryCode: string;
    currencyCode: string;
    supportedNetworks: string[];
    merchantCapabilities: string[];
    total: {
      label: string;
      amount: string;
    };
    lineItems?: Array<{
      label: string;
      amount: string;
    }>;
    requiredBillingContactFields?: string[];
    requiredShippingContactFields?: string[];
    shippingMethods?: Array<{
      label: string;
      detail: string;
      amount: string;
      identifier: string;
    }>;
    shippingType?: string;
    applicationData?: string;
  }
  
  interface ApplePayPayment {
    token: {
      paymentMethod: any;
      paymentData: any;
      transactionIdentifier: string;
    };
    billingContact?: any;
    shippingContact?: any;
  }
  
  interface ApplePayValidateMerchantEvent {
    validationURL: string;
  }
  
  interface ApplePayPaymentAuthorizedEvent {
    payment: ApplePayPayment;
  }
  
  interface ApplePayShippingContactSelectedEvent {
    shippingContact: any;
  }
  
  interface ApplePayShippingMethodSelectedEvent {
    shippingMethod: any;
  }
  
  declare class ApplePaySession {
    constructor(version: number, paymentRequest: ApplePayPaymentRequest);
    
    begin(): void;
    abort(): void;
    completeMerchantValidation(merchantSession: any): void;
    completePayment(status: number): void;
    completeShippingMethodSelection(status: number, newTotal: any, newLineItems: any, newShippingMethods?: any): void;
    completeShippingContactSelection(status: number, newShippingMethods: any, newTotal: any, newLineItems: any): void;
    
    onvalidatemerchant: ((event: ApplePayValidateMerchantEvent) => void) | null;
    onpaymentauthorized: ((event: ApplePayPaymentAuthorizedEvent) => void) | null;
    onshippingcontactselected: ((event: ApplePayShippingContactSelectedEvent) => void) | null;
    onshippingmethodselected: ((event: ApplePayShippingMethodSelectedEvent) => void) | null;
    oncancel: ((event: Event) => void) | null;
    
    static STATUS_SUCCESS: number;
    static STATUS_FAILURE: number;
    static STATUS_INVALID_BILLING_POSTAL_ADDRESS: number;
    static STATUS_INVALID_SHIPPING_POSTAL_ADDRESS: number;
    static STATUS_INVALID_SHIPPING_CONTACT: number;
    static STATUS_PIN_REQUIRED: number;
    static STATUS_PIN_INCORRECT: number;
    static STATUS_PIN_LOCKOUT: number;
    
    static canMakePayments(): boolean;
    static canMakePaymentsWithActiveCard(merchantIdentifier: string): Promise<boolean>;
    static supportsVersion(version: number): boolean;
  }
  
  // Include declaration for the custom element
  interface HTMLElementTagNameMap {
    'apple-pay-button': HTMLElement;
  }
  
  // Declare types globally
  declare global {
    interface Window {
      ApplePaySession: typeof ApplePaySession;
    }
  }
  
  export {};