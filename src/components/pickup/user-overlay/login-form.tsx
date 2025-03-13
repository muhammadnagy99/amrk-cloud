'use client'

import { FC, useState } from "react";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { AIcon, CloseIcon, GIcon } from "./icons";
import CloseBtn from "./close-btn";

const LoginForm: FC = () => {
    const [phone, setPhone] = useState("");

    return (
        <div className="flex flex-col gap-4 rounded-t-2xl py-2 px-3 w-full">

            <div className="flex flex-col gap-8">

                <h2 className="text-xl font-medium text-black leading-9 w-[90%]">
                    <span className="text-[#b0438a] p-0.5">أهلاً وسهلاً !</span>
                    سجل الدخول للوصول إلى مكافآتك
                </h2>

                <div className="flex flex-col gap-4">

                    <div className="w-full flex flex-col gap-2">
                        <label className="block text-right text-black text-base ">
                            ادخل رقم جوالك
                        </label>
                        <div className="w-full">
                            <PhoneInput
                                defaultCountry="sa"
                                value={phone}
                                onChange={(phone) => setPhone(phone)}
                            />
                        </div>
                    </div>


                    <button className="w-full bg-[#b0438a] text-base text-white font-medium py-3 rounded-lg">
                        تسجيل دخول
                    </button>

                    <div className="flex items-center">
                        <hr className="flex-grow border-[#00000080]" />
                        <span className="mx-2 text-black text-xs font-medium">أو</span>
                        <hr className="flex-grow border-[#00000080]" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <button className="w-full flex items-center justify-center border border-black py-3 rounded-lg mb-3 gap-3 text-sm">
                            <GIcon />
                            تسجيل دخول باستخدام Google
                        </button>
                        <button className="w-full flex items-center justify-center bg-black text-white py-3 rounded-lg gap-3 text-sm">
                            <AIcon />
                            تسجيل دخول باستخدام Apple
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
