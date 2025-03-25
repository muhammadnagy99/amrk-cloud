import { addCart, OfferData, OrderAgain } from "./static-data";

interface Props {
    type: string;
    lang: string;
}

const contentMap: Record<string, Record<string, any>> = {
    offers: {
        en: OfferData.en,
        ar: OfferData.ar
    },
    order_again: {
        en: OrderAgain.en,
        ar: OrderAgain.ar
    },
    add_cart: {
        en: addCart.en,
        ar: addCart.ar
    }
};

export default function ContentProvider({ type, lang }: Props) {
    return contentMap[type]?.[lang] || contentMap[type]?.en || null;
}
