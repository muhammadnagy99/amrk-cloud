export default function UserDiscount() {
  return (
    <div className="flex flex-col gap-4 py-3 border-b border-gray-300">
      <h3 className="text-base text-black font-medium">خصم إضافي 💰</h3>
      <label className="flex flex-row justify-between">
        <p className="text-black text-sm font-normal">
          يا هلا! لديك (1,203) نقطة، تريد الاستبدال؟
        </p>
        <p>
          <input type="checkbox" name="discount" value="1203" />
        </p>
      </label>
    </div>
  );
}
