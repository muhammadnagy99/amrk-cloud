import { ArrowRightOnRectangleIcon, ClipboardListIcon, InformationCircleIcon, PencilIcon, UserIcon } from './icons';
import Link from 'next/link';
import CloseBtn from './close-btn';

const ProfileMenu = () => {
    const menuItems = [
        { label: 'معلومات الملف الشخصي الأساسية', icon: <UserIcon />, action: 'pick-up/profile' },
        { label: 'إعدادات حساسية الأطعمة', icon: <PencilIcon />, action: 'pick-up/food-settings' },
        { label: 'الطلبات السابقة', icon: <ClipboardListIcon />, action: 'pick-up/orders' },
    ];

    return (
        <div className="flex flex-col gap-4 rounded-t-2xl py-2 px-3 w-full">
            <div className='flex flex-col gap-24'>

                <div className='flex flex-col gap-4 w-full'>
                    {menuItems.map((item, index) => (
                        <Link
                            href={item.action}
                            key={index}
                            className="w-full flex items-center justify-start gap-4 px-4 h-12 border rounded-lg shadow-sm hover:bg-gray-100 transition text-sm font-normal"
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>

                <div className='flex flex-col gap-4 w-full'>
                    <hr className="border-[#00000080]" />

                    <Link
                        href={`pick-up/about`}
                        className="w-full flex items-center justify-start gap-4 px-4 h-12 border rounded-lg shadow-sm hover:bg-gray-100 transition text-sm font-normal"

                    >
                        <InformationCircleIcon />
                        <span>حول الخدمة</span>
                    </Link>
                    <Link
                        href={`pick-up/logout`}
                        className="w-full flex items-center justify-start gap-4 px-4 h-12 border rounded-lg shadow-sm text-red-600 hover:bg-red-100 transition text-sm font-normal"

                    >
                        <ArrowRightOnRectangleIcon />
                        <span>تسجيل خروج</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfileMenu;