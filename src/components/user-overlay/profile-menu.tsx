import {
    ArrowRightOnRectangleIcon,
    ClipboardListIcon,
    InformationCircleIcon,
    PencilIcon,
    UserIcon
  } from './icons';
  import Link from 'next/link';
  
  type ProfileMenuProps = {
    lang: string;
    type: number;
  };
  
  const TEXTS: Record<string, any> = {
    ar: {
      basicInfo: 'معلومات الملف الشخصي الأساسية',
      foodSettings: 'إعدادات حساسية الأطعمة',
      pastOrders: 'الطلبات السابقة',
      about: 'حول الخدمة',
      logout: 'تسجيل خروج'
    },
    en: {
      basicInfo: 'Basic Profile Information',
      foodSettings: 'Food Sensitivity Settings',
      pastOrders: 'Previous Orders',
      about: 'About the Service',
      logout: 'Log Out'
    }
  };
  
const DIRS: Record<number, string> = {1: 'dine-in', 2: 'pick-up'}

  const ProfileMenu = ({ lang, type }: ProfileMenuProps) => {
    const t = TEXTS[lang] || TEXTS.en;
  
    const menuItems = [
      { label: t.basicInfo, icon: <UserIcon />, action: `${DIRS[type]}/profile/info` },
      { label: t.foodSettings, icon: <PencilIcon />, action: `${DIRS[type]}/profile/allergies` },
      { label: t.pastOrders, icon: <ClipboardListIcon />, action: `${DIRS[type]}/profile/previous-orders` }
    ];
  
    return (
      <div className="flex flex-col gap-4 rounded-t-2xl py-2 px-3 w-full">
        <div className="flex flex-col gap-24">
          <div className="flex flex-col gap-4 w-full">
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
  
          <div className="flex flex-col gap-4 w-full">
            <hr className="border-[#00000080]" />
  
            <Link
              href={`pick-up/about`}
              className="w-full flex items-center justify-start gap-4 px-4 h-12 border rounded-lg shadow-sm hover:bg-gray-100 transition text-sm font-normal"
            >
              <InformationCircleIcon />
              <span>{t.about}</span>
            </Link>
  
            <Link
              href={`pick-up/logout`}
              className="w-full flex items-center justify-start gap-4 px-4 h-12 border rounded-lg shadow-sm text-red-600 hover:bg-red-100 transition text-sm font-normal"
            >
              <ArrowRightOnRectangleIcon />
              <span>{t.logout}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProfileMenu;
  