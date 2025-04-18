'use client';

import { useEffect, useState } from "react";
import NavBar from "@/src/components/pickup/navigation-bar/navigation-bar";
import InputField from "@/src/components/pickup/profile/input-field";
import { GIcon } from "@/src/components/pickup/user-overlay/icons";
import { PhoneIcon } from "@/src/components/pickup/order-placed/icons";
import { User, EmailIcon, DeleteIcon } from "@/src/components/pickup/profile/icons";
import { Locale } from "@/src/i18n-config";
import MobileWrapper from "../../../mobile-wrapper";

const TEXTS: Record<Locale, any> = {
  ar: {
    title: "معلومات الملف الشخصي الأساسية",
    name: "الاسم",
    phone: "رقم الجوال",
    email: "البريد الإلكتروني",
    updateBtn: "تحديث البيانات",
    connectedToGoogle: "متصل بـ Google",
    deleteAccount: "حذف حساب المستخدم",
    emptyMessage: "يرجى تسجيل الدخول لعرض بياناتك الشخصية",
    goBack: "العودة"
  },
  en: {
    title: "Basic Profile Information",
    name: "Name",
    phone: "Phone Number",
    email: "Email",
    updateBtn: "Update Info",
    connectedToGoogle: "Connected with Google",
    deleteAccount: "Delete User Account",
    emptyMessage: "Please sign in to view your profile information",
    goBack: "Go Back"
  }
};

type Props = {
  params: {
    lang: Locale;
  };
};

export default function InfoPageClient({ params }: Props) {
  const lang = params.lang || 'en';
  const t = TEXTS[lang];

  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [originalData, setOriginalData] = useState({ name: "", email: "", phone: "" });

  const [isLoading, setIsLoading] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // Get cookie values
  useEffect(() => {
    const cookies = document.cookie.split("; ").reduce((acc: Record<string, string>, cookie) => {
      const [name, value] = cookie.split("=");
      acc[name] = value;
      return acc;
    }, {});

    if (cookies["user_id"] && cookies["userToken"]) {
      setUserId(decodeURIComponent(cookies["user_id"]));
      setToken(decodeURIComponent(cookies["userToken"]));
    }
  }, []);

  // Fetch profile info
  useEffect(() => {
    if (!userId || !token) {
      setIsLoading(false);
      return;
    }

    fetch("https://api.dev.amrk.app/amrkCloudWeb/profileInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ userId }),
    })
      .then(res => res.json())
      .then(data => {
        setName(data.name || "");
        setEmail(data.email || "");
        setPhone(data.phone_number || "");
        setOriginalData({ name: data.name || "", email: data.email || "", phone: data.phone_number || "" });
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch profile:", err);
        setIsLoading(false);
      });
  }, [userId, token]);

  // Check for input changes
  useEffect(() => {
    if (
      name !== originalData.name ||
      email !== originalData.email
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [name, email, originalData]);

  const handleUpdate = () => {
    if (!userId || !token) return;

    fetch("https://api.dev.amrk.app/amrkCloudWeb/updateProfileInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ userId, name, email }),
    })
      .then(res => res.json())
      .then(result => {
        console.log("Update result:", result);
        setOriginalData({ name, email, phone }); // sync original
        setButtonDisabled(true);
      })
      .catch(error => {
        console.error("Update failed:", error);
      });
  };

  if (isLoading) {
    return null; // Or loading spinner
  }

  if (!userId || !token) {
    return (
      <MobileWrapper>
        <div className="flex flex-col items-center justify-center text-center gap-4 mt-20">
          <p className="text-gray-500 text-sm">{t.emptyMessage}</p>
          <a href="/pick-up" className="text-[#B0438A] underline text-sm font-medium">
            {t.goBack}
          </a>
        </div>
      </MobileWrapper>
    );
  }

  return (
    <MobileWrapper>
      <div className="flex flex-col gap-8 w-[88%] h-screen overflow-y-auto pb-28 pt-10">
        <NavBar text={t.title} lang={lang} />
        <div className="w-full flex flex-col justify-between h-full">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <InputField label={t.name} icon={User} value={name} onChange={e => setName(e.target.value)} />
              <InputField label={t.phone} icon={PhoneIcon} value={phone} disabled />
              <InputField label={t.email} icon={EmailIcon} value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <button
              className={`w-full text-white text-sm font-normal py-4 rounded-lg transition-all duration-300 ${buttonDisabled ? 'bg-[#cecece]' : 'bg-[#B0438A] hover:bg-[#9c3977]'}`}
              disabled={buttonDisabled}
              onClick={handleUpdate}
            >
              {t.updateBtn}
            </button>
          </div>

          <div className="flex flex-col gap-6">
            <div className="w-full flex h-12 items-center justify-center gap-4 px-5 rounded-lg bg-[#f8f8f8]">
              <GIcon />
              <span className="text-sm font-normal">{t.connectedToGoogle}</span>
            </div>
            <div className="w-full h-[1px] bg-[#00000080]"></div>
            <button className="w-full flex h-12 items-center justify-start gap-4 text-[#c10505] px-5 rounded-lg border border-[#c10505]">
              <DeleteIcon />
              <span className="text-sm font-normal">{t.deleteAccount}</span>
            </button>
          </div>
        </div>
      </div>
    </MobileWrapper>
  );
}
