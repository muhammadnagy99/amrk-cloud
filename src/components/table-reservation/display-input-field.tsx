export interface InputFieldProps {
    label: string;
    icon: React.FC;
    value: string;
    disabled?: boolean;
    lang: string;
}

export default function InputFieldDisplay({ label, icon: Icon, value, lang }: InputFieldProps) {
    return (
        <div className="flex items-center border border-[#00000033] rounded-lg h-12 px-4 justify-between">
            <div className="flex flex-row gap-4 w-[95%] justify-center items-center relative">
                {Icon && <Icon />}
                <div className="w-full">
                    <label className={`absolute text-[#00000099] text-[8px] font-light top-0 ${lang === 'en' ? 'left-5' : 'right-5'}`}>
                        {label}
                    </label>
                    <input
                        type="text"
                        value={value}
                        disabled={true}
                        className={`w-full bg-transparent outline-none mt-3 font-light text-sm placeholder-black`}
                    />
                </div>
            </div>
        </div>
    );
}
