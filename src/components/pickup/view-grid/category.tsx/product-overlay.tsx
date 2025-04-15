'use client';

import { useState, useEffect } from "react";
import { createContext, useContext } from "react";

// Product Overlay Context
interface ProductOverlayContextType {
  showProductOverlay: boolean;
  productId: string | null;
  openProductOverlay: (id: string) => void;
  closeProductOverlay: () => void;
}

const ProductOverlayContext = createContext<ProductOverlayContextType | undefined>(undefined);

// Provider component to wrap around your app
export function ProductOverlayProvider({ children, lang }: { children: React.ReactNode, lang: string }) {
  const [showProductOverlay, setShowProductOverlay] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);
  const [closingAnimation, setClosingAnimation] = useState(false);
  const [showClosingAnimation, setShowClosingAnimation] = useState(false);

  const openProductOverlay = (id: string) => {
    setProductId(id);
    setShowProductOverlay(true);
  };

  const closeProductOverlay = () => {
    if (showProductOverlay) {
      setClosingAnimation(true);
      setShowClosingAnimation(true);
      setTimeout(() => {
        setShowProductOverlay(false); 
      }, 300);
    }
  };

  // Clean up animation states when animation ends
  useEffect(() => {
    if (!showProductOverlay) {
      setTimeout(() => {
        setShowClosingAnimation(false);
      }, 300);
    }
  }, [showProductOverlay]);

  // Dynamically import the ProductPageClient component
  const [ProductPageClient, setProductPageClient] = useState<any>(null);

  useEffect(() => {
    import("../../../../app/[lang]/pick-up/product/[slug]/product-cleint-server").then((module) => {
      setProductPageClient(() => module.default);
    }).catch(error => {
      console.error("Failed to load ProductPageClient:", error);
    });
  }, []);

  return (
    <ProductOverlayContext.Provider value={{ showProductOverlay, productId, openProductOverlay, closeProductOverlay }}>
      {children}
      
      {/* Product Overlay */}
      {(showProductOverlay || showClosingAnimation) && productId && ProductPageClient && (
        <div className="fixed inset-0 bg-transparent z-50 flex flex-col justify-end">
          <div
            className="bg-white w-full shadow-lg overflow-hidden transition-transform duration-300 ease-out transform"
            style={{
              transform: closingAnimation ? 'translateY(100%)' : 'translateY(0)',
              height: '100vh',
              animation: showProductOverlay && !closingAnimation 
                ? 'slide-up 0.3s ease-out' 
                : closingAnimation 
                  ? 'slide-down 0.3s ease-out' 
                  : 'none'
            }}
            onAnimationEnd={() => {
              if (closingAnimation) {
                setShowClosingAnimation(false);
                setClosingAnimation(false);
              }
            }}
          >
            {/* Product Page Component */}
            <div className="h-full overflow-auto">
              <ProductPageClient 
                productId={productId} 
                lang={lang} 
                isOverlay={true} 
                onClose={closeProductOverlay} 
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Animation styles */}
      <style jsx global>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes slide-down {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(100%);
          }
        }
      `}</style>
    </ProductOverlayContext.Provider>
  );
}

// Hook to use the context
export function useProductOverlay() {
  const context = useContext(ProductOverlayContext);
  
  // Instead of throwing an error, return a dummy implementation
  if (context === undefined) {
    // Return dummy functions when used outside provider
    return {
      showProductOverlay: false,
      productId: null,
      openProductOverlay: (id: string) => {
        console.warn("ProductOverlayProvider not found. Navigating directly.");
        window.location.href = `/pick-up/product/${id}`;
      },
      closeProductOverlay: () => {
        console.warn("ProductOverlayProvider not found.");
      }
    };
  }
  
  return context;
}

// Helper HOC to make a component use the overlay system
export function withProductOverlay(Component: React.ComponentType<any>) {
  return function WithProductOverlayComponent(props: any) {
    const overlayContext = useProductOverlay();
    return <Component {...props} productOverlay={overlayContext} />;
  };
}