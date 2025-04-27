'use client'
import { useEffect, useState } from "react";
import ContentProvider from "@/src/content-provider";
import { BasketIcon, MinusIcon, PlusIcon } from "./icons";
import useBasket from "@/src/hooks/basket";
import { BasketItem } from "@/src/interfaces/interfaces";
import { RiyalCurrency } from "../basket-page/icons";
import Link from "next/link";
import { useProductOverlay } from "../view-grid/category.tsx/product-overlay";
import { basketEventService } from "@/src/lib/basket-event";

interface Props {
  lang: string;
  price: number;
  productId: string;
  requiredOptions: { label: string; value: string; extraPrice?: string }[];
  optionalOptions: { label: string; value: string; extraPrice?: string }[];
  selectedRequired: { name: string; value: string }[];
  selectedOptional: { name: string; value: string }[];
  type: number;
}

export default function AddCart({
  lang,
  price,
  productId,
  requiredOptions,
  optionalOptions,
  selectedRequired,
  selectedOptional,
  type
}: Props) {
  const TYPE = "add_cart";
  const TEXTS = ContentProvider({ type: TYPE, lang });
  const { addToBasket } = useBasket(type);

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const [showAdded, setShowAdded] = useState(false);
  const [showGoToBasket, setShowGoToBasket] = useState(false);
  const [hasStartedAddFlow, setHasStartedAddFlow] = useState(false);
  const [totalPrice, setTotalPrice] = useState(price);

  useEffect(() => {
    console.log(selectedRequired)
    setTotalPrice(calculateTotalPrice());
  }, [selectedRequired, selectedOptional, quantity, price]);

  const calculateTotalPrice = (): number => {
    const requiredExtras = selectedRequired.reduce((sum, opt) => {
      const matchingOption = requiredOptions.find(option => option.value === opt.value);
      if (matchingOption?.extraPrice) {
        return sum + parseFloat(matchingOption.extraPrice);
      }
      return sum;
    }, 0);
    console.log("this is required => " +requiredExtras)
    
    const optionalExtras = selectedOptional.reduce((sum, opt) => {
      const matchingOption = optionalOptions.find(option => option.value === opt.value);
      if (matchingOption?.extraPrice) {
        return sum + parseFloat(matchingOption.extraPrice);
      }
      return sum;
    }, 0);
    console.log("this is optional => " + optionalExtras)
    
    return (price + requiredExtras + optionalExtras) * quantity;
  };

  const getExtraPrice = (options: { label: string; value: string; extraPrice?: string }[], value: string): number => {
    const found = options.find((opt) => opt.value === value);
    return found?.extraPrice ? parseFloat(found.extraPrice) : 0;
  };


  const handleAddToCart = () => {
    setLoading(true);
    const hasRequired = requiredOptions.length > 0;
    const hasOptional = optionalOptions.length > 0;
    setHasStartedAddFlow(true);

    if (hasRequired && selectedRequired.length === 0) {
      alert("Please select required options.");
      setLoading(false);
      return;
    }

    const requiredWithPrices = selectedRequired.map((opt) => ({
      ...opt,
      extraPrice: getExtraPrice(requiredOptions, opt.value),
    }));

    const optionalWithPrices = selectedOptional.map((opt) => ({
      ...opt,
      extraPrice: getExtraPrice(optionalOptions, opt.value),
    }));

    const totalExtras =
      [...requiredWithPrices, ...optionalWithPrices].reduce(
        (sum, o) => sum + (o.extraPrice || 0),
        0
      );

    const total = (price + totalExtras) * quantity;

    const item: BasketItem = {
      id: productId,
      quantity,
      required: requiredWithPrices, // now an array
      optional: optionalWithPrices,
      totalPrice: total,
    };

    addToBasket(item);
    setTimeout(() => {
      setAdded(true);
      setLoading(false);
    }, 500);
    setTimeout(() => {
      setAdded(true);
      setShowAdded(true);
      setLoading(false);
      setTimeout(() => {
        setShowAdded(false);
        setShowGoToBasket(true);
      }, 1000);
    }, 500);
  };

  const showBasket = () => {
    basketEventService.toggleBasketOverlay();
  }

  // Function to increment quantity
  const incrementQuantity = () => {
    setQuantity(q => q + 1);
  };

  // Function to decrement quantity (with minimum value of 1)
  const decrementQuantity = () => {
    setQuantity(q => Math.max(1, q - 1));
  };

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.2)] p-4 flex justify-between items-center z-50 rounded-lg gap-3 h-24">
      {!added && !loading && (
        <div className="flex items-center bg-[#f9f9f9] px-4 py-2 rounded-lg gap-3 w-34">
          <button
            className="text-gray-600 text-lg"
            onClick={incrementQuantity}
          >
            <PlusIcon />
          </button>
          <span className="mx-4 text-lg font-medium w-8 text-center">{quantity}</span>
          <button
            className="text-[#b0438a] text-lg"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
          >
            <MinusIcon />
          </button>
        </div>
      )}

      <button
        className={`flex items-center justify-between bg-[#b0438a] text-white ${showGoToBasket || loading || showAdded ? "w-full" : "w-60"}
          h-12 rounded-lg transition-all duration-300`}
        disabled={loading}
        onClick={showGoToBasket ? showBasket : handleAddToCart}
      >
        {loading ? (
          <div className="w-full text-center">
            <span className="animate-pulse text-sm">{TEXTS.loading}</span>
          </div>
        ) : showGoToBasket ? (
          <span
            className="flex items-center justify-center gap-2 text-white text-sm font-semibold w-full"
          >
            <BasketIcon />
            {TEXTS.goToBasket}
          </span>
        ) : (
          <div className="flex justify-between items-center w-full px-4">
            {showAdded ? (
              <span className="text-sm font-semibold transition-opacity duration-500 text-center">
                {TEXTS.added}
              </span>
            ) : (
              <span className="flex items-center gap-1 justify-center h-full">
                <span className="h-full">
                  <BasketIcon />
                </span>
                <span className="h-full text-sm flex">
                  {TEXTS.text}
                </span>
              </span>
            )}
            {!hasStartedAddFlow && (
              <span className="flex flex-row gap-1 text-sm font-semibold items-center"><RiyalCurrency color="white" /> {totalPrice.toFixed(2)} </span>
            )}
          </div>
        )}
      </button>
    </div>
  );
}