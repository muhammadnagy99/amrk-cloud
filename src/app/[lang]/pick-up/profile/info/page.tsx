import NavBar from "@/src/components/pickup/navigation-bar/navigation-bar";
import { InputFieldProps } from "@/src/interfaces/interfaces";
import InputField from "@/src/components/pickup/profile/input-field";
import { GIcon } from "@/src/components/pickup/user-overlay/icons";
import { PhoneIcon } from "@/src/components/pickup/order-placed/icons";
import { User, EmailIcon, DeleteIcon } from "@/src/components/pickup/profile/icons";
import { Locale } from "@/src/i18n-config";
import MobileWrapper from "../../../mobile-wrapper";


type PageProps = {
    params: {
        lang: Locale;
    };
};

const TEXTS: Record<Locale, any> = {
    ar: {
        title: "معلومات الملف الشخصي الأساسية",
        name: "الاسم",
        phone: "رقم الجوال",
        email: "البريد الإلكتروني",
        updateBtn: "تحديث البيانات",
        connectedToGoogle: "متصل بـ Google",
        deleteAccount: "حذف حساب المستخدم"
    },
    en: {
        title: "Basic Profile Information",
        name: "Name",
        phone: "Phone Number",
        email: "Email",
        updateBtn: "Update Info",
        connectedToGoogle: "Connected with Google",
        deleteAccount: "Delete User Account"
    }
};

export default async function InfoPage(props: {
    params: Promise<{ lang: Locale }>;

}) {
    const params = await props.params;
    const lang = params.lang || 'ar';
    const t = TEXTS[lang];

    const inputFields: InputFieldProps[] = [
        { label: t.name, icon: User, value: "" },
        { label: t.phone, icon: PhoneIcon, value: "" },
        { label: t.email, icon: EmailIcon, value: "" }
    ];

    return (
        <MobileWrapper>
            <div className="flex flex-col gap-8 w-[88%] h-screen overflow-y-auto pb-28 pt-10">
                <NavBar text={t.title} />
                <div className="w-full flex flex-col justify-between h-full">
                    <div className="flex flex-col gap-12">
                        <div className="flex flex-col gap-4">
                            {inputFields.map((field, index) => (
                                <InputField key={index} {...field} />
                            ))}
                        </div>

                        <button className="w-full text-white text-sm font-normal bg-[#cecece] py-4 rounded-lg" disabled>
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
