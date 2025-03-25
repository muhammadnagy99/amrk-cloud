import MobileWrapper from "@/src/app/mobile-wrapper";
import NavBar from "@/src/components/pickup/navigation-bar/navigation-bar";
import { DeleteIcon, EditIcon, EmailIcon, PhoneIcon, User } from "../../../../components/pickup/profile/icons";
import { InputFieldProps } from "@/src/interfaces/interfaces";
import InputField from "@/src/components/pickup/profile/input-field";
import { GIcon } from "@/src/components/pickup/user-overlay/icons";

const inputFields: InputFieldProps[] = [
    { label: "الاسم", icon: User, value: "اسم المستخدم" },
    { label: "رقم الجوال", icon: PhoneIcon, value: "+996 000 000 0000" },
    { label: "البريد الإلكتروني", icon: EmailIcon, value: "example@gmail.com" }
];

export default function InfoPAge() {
    return (
        <MobileWrapper>
            <div className="flex flex-col gap-8 w-[88%] h-screen overflow-y-auto pb-28 pt-10">
                <NavBar text="معلومات الملف الشخصي الأساسية" />
                <div className="w-full flex flex-col justify-between h-full">

                    <div className="flex flex-col gap-12">
                        <div className="flex flex-col gap-4">
                            {inputFields.map((field, index) => (
                                <InputField key={index} {...field} />
                            ))}
                        </div>

                        <button className="w-full text-white text-sm font-normal bg-[#cecece] py-4 rounded-lg" disabled>
                            تحديث البيانات
                        </button>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="w-full flex h-12 items-center justify-center gap-4 px-5 rounded-lg bg-[#f8f8f8]">
                           <GIcon />
                            <span className="text-sm font-normal">متصل بـ Google</span>
                        </div>
                        <div className="w-full h-[1px] bg-[#00000080]">
                        </div>
                        <button className="w-full flex h-12 items-center justify-start gap-4 text-[#c10505] px-5 rounded-lg border border-[#c10505]">
                            <DeleteIcon />
                            <span className="text-sm font-normal">
                                حذف حساب المستخدم
                            </span>
                        </button>
                    </div>
                </div>

            </div>
        </MobileWrapper>
    );
}
