"use client";

interface UserDiscountProps {
  lang: string;
  points: number;
  onToggle: (checked: boolean, value: number) => void;
}

const TEXTS: Record<string, { title: string; messageBefore: string; messageAfter: string }> = {
  ar: {
    title: "خصم إضافي 💰",
    messageBefore: "يا هلا! لديك",
    messageAfter: "نقطة، تريد الاستبدال؟",
  },
  en: {
    title: "Extra Discount 💰",
    messageBefore: "Ahlan! You have",
    messageAfter: "points. Redeem them?",
  },
};

export default function UserDiscount({ lang, points, onToggle }: UserDiscountProps) {
  const t = TEXTS[lang];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(e.target.checked, points);
  };

  return (
    <div className="flex flex-col gap-4 py-3 border-b border-gray-300">
      <h3 className="text-base text-black font-medium">{t.title}</h3>
      <label className="flex flex-row justify-between items-center">
        <p className="text-black text-sm font-normal">
          {t.messageBefore}{" "}
          <span className="text-green-600 font-semibold">
            ({points.toLocaleString(lang === "ar" ? "ar-EG" : "en-US")})
          </span>{" "}
          {t.messageAfter}
        </p>
        <input type="checkbox" name="discount" value={points} onChange={handleChange} />
      </label>
    </div>
  );
}
