// src/services/basketEventService.ts

// Custom event names
export const TOGGLE_BASKET_OVERLAY = 'toggleBasketOverlay';
export const CLOSE_BASKET_OVERLAY = 'closeBasketOverlay';

/**
 * Service to handle basket overlay events across components
 */
export const basketEventService = {
  /**
   * Trigger the basket overlay to toggle
   */
  toggleBasketOverlay: () => {
    // Create and dispatch custom event
    const event = new CustomEvent(TOGGLE_BASKET_OVERLAY);
    window.dispatchEvent(event);
  },

  /**
   * Trigger the basket overlay to close
   */
  closeBasketOverlay: () => {
    // Create and dispatch custom event
    const event = new CustomEvent(CLOSE_BASKET_OVERLAY);
    window.dispatchEvent(event);
  }
};