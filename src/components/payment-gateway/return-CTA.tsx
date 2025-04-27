interface props {
    lang: string;
  }
  
  const TEXTS: Record<string, { title: string }> = {
    ar: {
      title: "العودة إلى صفحة الدفع"
    },
    en: {
      title: "Return to Payment Page"
    }
  };
  
  export default function ReturnCTA({ lang }: props) {
    const t = TEXTS[lang] || TEXTS.en;
  
    return (
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.2)] p-4 flex justify-between items-center z-50 rounded-lg gap-3 h-24">
        <a href="/pick-up/checkout" className="flex items-center justify-between px-4 bg-[#b0438a] text-white w-full h-12 rounded-lg flex-1">
          <p className="flex flex-row items-center w-full">
            <span className="text-sm text-center w-full">{t.title}</span>
          </p>
        </a>
      </div>
    );
  }
  