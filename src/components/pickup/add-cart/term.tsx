import Link from "next/link";

export default function Terms() {
  return (
    <p className="font-normal text-sm absolute bottom-36">
      عند تنفيذ هذا الطلب عبر بطاقة الإتمان انت توافق على
      <br />
      <Link href="" className="text-sm font-medium underline">الشروط والأحكام</Link>
    </p>
  );
}
